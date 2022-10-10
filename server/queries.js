const axios = require('axios')
const  {metricsObject} = require('./server.js')

console.log("console log metricsObject in queries.js", metricsObject)

const slackPostFunc = (label, currentThreshold, currentValue) => {
    console.log('axios call')
    axios.post('https://hooks.slack.com/services/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',{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `${label}: ${currentValue}`,
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `:Warning: ${label} has gone over the threshold: ${currentThreshold}, please check your kafka cluster for more details`,
                    "emoji": true
                }
            }
        ]
    })
    .then(()=>{
        console.log('Message Sent Succesfully!')
    })
    .catch((error)=>{
        console.log(error)
    });
    return
};

const timeConvert = (arr, label, metricsObjectNested)=> {
    const newArr = []
    arr.forEach(data => {
        // console.log('insideTIMECONVERT--->',label, metricsObject[label], data[1])
        // if(metricsObjectNested[label] === 'number') {
        //     if(data[1] > metricsObjectNested[label]){
        //         slackPostFunc(label, metricsObjectNested[label], data[1])
        //         metricsObjectNested[label] = null  
        //     }
        // }
        // console.log('logginglabel inside TIMECONVERT', label)
        newArr.push([((data[0] - 14400) * 1000), data[1]]);
    });
    return newArr
}

const jvmConvert = (arr)=> {
    const newArr = []
    arr.forEach(data => {
        newArr.push([((data[0] - 14400) * 1000), parseInt(data[1])/1000000]);
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
// data.result[0].values --> 75thPercentile
// data.result[1].values --> 99thPercentile
// data.result[2].values --> Mean
const multiGraphConvert = (arr) => {
    const newArr = [];
    arr.forEach(mainObj => {
        // const subArr = [];
        console.log('Metric Name', mainObj.metric.__name__)
        if(mainObj.metric.__name__ === 'kafka_network_request_metrics_time_ms') {
            if(mainObj.values) {
                // console.log('logging multiGraphConvert->',mainObj.values)
                newArr.push(reqTTConvert(mainObj.values));
            }
            if(mainObj.value) {
                // console.log('logging multiGraphConvert->',mainObj.value)
                newArr.push(reqTTConvert([mainObj.value]));
            }
        } else {
            if(mainObj.values) {
                // console.log('logging multiGraphConvert->',mainObj.values)
                newArr.push(timeConvert(mainObj.values));
            }
            if(mainObj.value) {
                // console.log('logging multiGraphConvert->',mainObj.value)
                // subArr.push(...timeConvert([mainObj.value]));
                newArr.push(timeConvert([mainObj.value]));
            }
        }

    })
    return newArr;
}

let counter = 0;

const fetchQuery = async (query, timeFrame, label, metricsObject) => {
    //send a fetch request to prometheus using axios
    if(counter < 4) {
        // console.log(`sending PAST 10m of cluster query on params: ${query}, ${timeFrame}, ${label}`)
        // console.log(`${typeof label}`)
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}${timeFrame}`)
            counter++
            switch(query) {
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
                case ('kafka_network_processor_idle_percent'):
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                    let convertedVal = await multiGraphConvert(data.data.data.result)
                    console.log('logging convertedVal 10min ->', convertedVal);
                    return convertedVal;
                default:
                    let preConvert = data.data.data.result[0].values
                    let output = timeConvert(preConvert,label, metricsObject)
                    // console.log(`${query}`, output)
                    return output
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    } else {
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`)
            // console.log(`sending CURRENT ONLY cluster query on params: ${query}`)
            switch(query) {
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
                // case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                case ('kafka_network_processor_idle_percent'):
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                    let convertedVal = await multiGraphConvert(data.data.data.result)
                    console.log('logging convertedVal2 ->', convertedVal);
                    return convertedVal;
                default:
                    let preConvert = [data.data.data.result[0].value]
                    let output = timeConvert(preConvert,label, metricsObject)
                    // console.log(`${query}`, output)
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