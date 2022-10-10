const axios = require('axios')

const timeConvert = (arr) => {
    const newArr = []
    arr.forEach(data => {
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

const fetchQuery = async (query, timeFrame) => {

    if (counter < 4) {
        console.log(`sending PAST 10m of cluster query on params: ${query}`)
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
                    let output = timeConvert(preConvert)
                    console.log(`${query}`, output)
                    return output
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    } else {
        try {
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
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                    let convertedVal = await multiGraphConvert(data.data.data.result)
                    console.log('logging convertedVal2 ->', convertedVal);
                    return convertedVal;
                default:
                    let preConvert = [data.data.data.result[0].value]
                    let output = timeConvert(preConvert)
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