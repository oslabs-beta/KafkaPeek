const axios = require('axios')
const metricsObject = require('./controllers/utils.js')

const slackPostFunc = (label, currentThreshold, currentValue) => {
    axios.post('https://hooks.slack.com/services/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', {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `:Warning: ${label} has gone over the threshold: ${currentThreshold}, please check your kafka cluster for more details.\nCurrent value: ${currentValue}`,
                    "emoji": true
                }
            }
        ]
    })
        .then(() => {
            console.log('Alert Sent Succesfully!')
        })
        .catch((error) => {
            console.log(error)
        });
    return
};

const timeConvert = (arr, label) => {
    const newArr = []
    arr.forEach(data => {
        if (metricsObject[label]) {
            const thresholdNumber = Number(metricsObject[label])
            if (data[1] > thresholdNumber) {
                slackPostFunc(label, metricsObject[label], parseInt(data[1]))
                metricsObject[label] = null
            }
        }

        newArr.push([((data[0] - 14400) * 1000), data[1]]);
    });
    return newArr
}

const jvmConvert = (arr) => {
    const newArr = []
    arr.forEach(data => {
        newArr.push([((data[0] - 14400) * 1000), parseInt(data[1]) / 1000000]);
    });
    return newArr
}
const reqTTConvert = (arr) => {
    const newArr = [];
    arr.forEach(data => {
        newArr.push([((data[0] - 14400) * 1000), parseInt(data[1]) / 1000])
    })
    return newArr;
}

const multiGraphConvert = (arr) => {
    const newArr = [];

    arr.forEach(mainObj => {
        console.log('Metric Name', mainObj.metric.__name__)
        if (mainObj.metric.__name__ === 'kafka_network_request_metrics_time_ms') {
            if (mainObj.values) {
                newArr.push(reqTTConvert(mainObj.values));
            }
            if (mainObj.value) {
                newArr.push(reqTTConvert([mainObj.value]));
            }
        } else {
            if (mainObj.values) {
                newArr.push(timeConvert(mainObj.values));
            }
            if (mainObj.value) {
                newArr.push(timeConvert([mainObj.value]));
            }
        }

    })
    return newArr;
}

let counter = 0;

const fetchQuery = async (query, timeFrame, label) => {
    // sending a fetch request to prometheus using axios
    if (counter < 4) {
        console.log(`sending PAST 10m of cluster query on params: ${query}, ${timeFrame}, ${label}`)
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}${timeFrame}`)
            counter++
            switch (query) {
                case ('kafka_jvm_heap_usage{env="cluster-demo", type="used"}'):
                    let jvmPre = data.data.data.result[0].values
                    return jvmConvert(jvmPre);
                case ('kafka_server_replica_manager_underreplicatedpartitions'):
                    return data.data.data.result[0].value[1];
                case ('kafka_controller_offlinepartitionscount'):
                    return data.data.data.result[0].value[1];
                case ('sum(kafka_controller_activecontrollercount)'):
                    return data.data.data.result[0].value[1];
                case ('count(kafka_server_brokerstate)'):
                    return data.data.data.result[0].value[1];
                case ('kafka_network_request_per_sec{aggregate=~"OneMinuteRate",request="Produce"}'):
                    return data.data.data.result[0].value[1];
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                    let convertedVal = await multiGraphConvert(data.data.data.result)
                    console.log('logging convertedVal 10min ->', convertedVal);
                    return convertedVal;
                default:
                    let preConvert = data.data.data.result[0].values
                    let output = timeConvert(preConvert, label)
                    return output
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    } else {
        try {
            console.log(`sending CURRENT DATA of cluster query on params: ${query}, ${label}`)
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`)
            switch (query) {
                case ('kafka_jvm_heap_usage{env="cluster-demo", type="used"}'):
                    let jvmPre = [data.data.data.result[0].value]
                    return jvmConvert(jvmPre);
                case ('kafka_server_replica_manager_underreplicatedpartitions'):
                    return data.data.data.result[0].value[1];
                case ('kafka_controller_offlinepartitionscount'):
                    return data.data.data.result[0].value[1];
                case ('sum(kafka_controller_activecontrollercount)'):
                    return data.data.data.result[0].value[1];
                case ('count(kafka_server_brokerstate)'):
                    return data.data.data.result[0].value[1];
                case ('kafka_network_request_per_sec{aggregate=~"OneMinuteRate",request="Produce"}'):
                    return data.data.data.result[0].value[1];
                case ('kafka_network_processor_idle_percent'):
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                    let convertedVal = await multiGraphConvert(data.data.data.result)
                    return convertedVal;
                default:
                    let preConvert = [data.data.data.result[0].value]
                    let output = timeConvert(preConvert, label)
                    return output
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    }
}

const resetCounter = () => {
    counter = 0;
}

module.exports = { fetchQuery, resetCounter }