const axios = require('axios')
const metricsObject = require('./controllers/utils.js')

// sends confirmation message to slack when a metric has gone over a designated threshold 
const slackPostFunc = (label, currentThreshold, currentValue) => {
    axios.post('/* developer can place designated slack webhook here */', {
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

// parses time value in the back-end for readabilty in front-end
const timeConvert = (arr, label) => {
    const newArr = []
    arr.forEach(data => {

        // checking to see if any metric has received a designated threshold
        if (metricsObject[label]) {
            const thresholdNumber = Number(metricsObject[label])

            // checking to see if current metric value is over designated threshold
            if (data[1] > thresholdNumber) {

                // invokes slack notification function
                slackPostFunc(label, metricsObject[label], parseInt(data[1]))
                metricsObject[label] = null
            }
        }

        newArr.push([((data[0] - 14400) * 1000), data[1]]);
    });
    return newArr
}

// parses multiple time values for jvm mbean metrics
const jvmConvert = (arr) => {
    const newArr = []
    arr.forEach(data => {
        newArr.push([((data[0] - 14400) * 1000), parseInt(data[1]) / 1000000]);
    });
    return newArr
};

// parses multiple time time values for kafka_network_request_metrics_time_ms mbean metrics
const reqTTConvert = (arr) => {
    const newArr = [];
    arr.forEach(data => {
        newArr.push([((data[0] - 14400) * 1000), parseInt(data[1]) / 1000])
    })
    return newArr;
};


// used for prometheus data that includes in array of objects for multi-line graphs
const multiGraphConvert = (arr) => {

    // will store parsed data 
    const newArr = [];

    // iterates over each object found in argument and routes it to it's designated time conversion function
    arr.forEach(mainObj => {
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
    });

    // returns multigraph readable data
    return newArr;
};

// initilazed at every new socket.io connection, used to reference one second
let counter = 0;

const fetchQuery = async (query, timeFrame, label) => {
    
    // checks if counter has reached 4 seconds
    if (counter < 4) {
        console.log(`sending PAST 10m of cluster query on params: ${query}, ${timeFrame}, ${label}`)
        try {

            // retrieves ten minutes worth of data using both query and time arguments from prometheus
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}${timeFrame}`)
            counter++

            // filters appropriate path for current mbean metric
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
                    console.log(output)
                    return output
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }

    // if count is over 4 seconds, we send current live data
    } else {
        try {
            console.log(`sending CURRENT DATA of cluster query on params: ${query}, ${label}`)

            // retrieves lives data using only query argument from prometheus
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`)

            // filters appropriate path for current mbean metric
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
                    let preConvert = [data.data.data.result[0].value];
                    let output = timeConvert(preConvert, label);
                    console.log(output);
                    return output;
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    }
}

// used to reset counter when socket.io disconnects in server file
const resetCounter = () => {
    counter = 0;
}
let prevVal = 0;
let graphCounterUp = 0;
let graphCounterDown = 0;
let output = 100;
const fetchRandom = (query, timeFrame, label) => {
    const time = Date.now()
    console.log('query',query);
    switch (query) {
        case ('kafka_jvm_heap_usage{env="cluster-demo", type="used"}'):
            // const output = Math.floor(Math.random() * (1100 - 1000) + 1000);
            if(graphCounterUp < 5) {
                graphCounterUp++;
            } else if(graphCounterDown < 5) {
                graphCounterDown++
            } else if (graphCounterUp >= 5 && graphCounterUp <= 10) {
                output += 100;
                graphCounterUp++;
            } else if (graphCounterDown >= 5 && graphCounterDown <=6) {
                output = 100;
                graphCounterDown++;
            }
            else {
                graphCounterDown = 0;
                graphCounterUp = 0;
            }
            return [[time, output]]
        case ('kafka_server_replica_manager_underreplicatedpartitions'):
            return 0;
        case ('kafka_controller_offlinepartitionscount'):
            return 0;
        case ('sum(kafka_controller_activecontrollercount)'):
            return 1;
        case ('count(kafka_server_brokerstate)'):
            return 1;
        case ('kafka_network_request_per_sec{aggregate=~"OneMinuteRate",request="Produce"}'):
            const networkOutput = Math.floor(Math.random() * (650 - 550) + 550)
            return [[time, networkOutput]];
        case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
            const requestTT = Math.floor(Math.random() * (6 - 4) + 4)
            return ;
        case (`kafka_server_broker_topic_metrics_bytesinpersec_rate`):
           const bytesInOutput = Math.floor(Math.random() * (1500 - 1400) + 1400);
            return [[time, bytesInOutput]];
        case (`kafka_server_broker_topic_metrics_bytesoutpersec_rate`):
            const bytesOutOutput = Math.floor(Math.random() * (1100 - 900) + 900)
            return [[time, bytesOutOutput]];
        case (`kafka_server_broker_topic_metrics_messagesinpersec_rate`):
            const messagesInOutput = Math.floor(Math.random() * (250 - 210) + 210)
            return [[time, messagesInOutput]];
        case (`kafka_network_request_per_sec{aggregate=~'OneMinuteRate',request='Produce'} FetchRandom`):
            const reqTotalTime = Math.floor(Math.random() * (5 - 2) + 2);
            return [[time, reqTotalTime]];         
        default:
            const outputDefault = Math.floor(Math.random() * (5 - 2) + 2);
            return [[time, outputDefault]];
    }

};

// 'requestTotalTime': ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}", "[10m:10s]"],
// 'responseQueueTime': ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseQueue',env='cluster-demo', aggregate='99thPercentile'}", "[10m:10s]"],
// 'responseSendTime': ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseSend',env='cluster-demo', aggregate='Mean'}", "[10m:10s]"],
// export const params = {
//     'bytesInPerSec': ['kafka_server_broker_topic_metrics_bytesinpersec_rate', '[10m:10s]'],
//     'bytesOutPerSec': ['kafka_server_broker_topic_metrics_bytesoutpersec_rate', '[10m:10s]'],
//     'messagesInPerSec': ['kafka_server_broker_topic_metrics_messagesinpersec_rate', '[10m:10s]'],
//     'jvmHeapUsage': ['kafka_jvm_heap_usage{env="cluster-demo", type="used"}', '[10m:10s]'],
//     'activeControllerCount': ["sum(kafka_controller_activecontrollercount)", ""],
//     'underRepPartitions': ['kafka_server_replica_manager_underreplicatedpartitions', ''],
//     'offlinePartitions': ['kafka_controller_offlinepartitionscount', ''],
//     'brokersRunning': ['count(kafka_server_brokerstate)', '']
//   }

module.exports = { fetchQuery, resetCounter, fetchRandom }