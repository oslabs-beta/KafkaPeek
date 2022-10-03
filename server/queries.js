const axios = require('axios')

const timeConvert = (arr)=> {
    const newArr = []
    arr.forEach(data => {
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

// data.result[0].values --> 75thPercentile
// data.result[1].values --> 99thPercentile
// data.result[2].values --> Mean
const multiGraphConvert = (arr) => {
    const newArr = [];
    arr.forEach(mainObj => {
        const subArr = [];
        if(mainObj.values) {
            subArr.push(timeConvert(mainObj.values));
            newArr.push(subArr);
        }
        if(mainObj.value) {
            console.log('logging sinde of multiGraphConvert->',mainObj.value)
            subArr.push(timeConvert([mainObj.value]));
            newArr.push(subArr);
        }
    })
    return newArr;
}

let counter = 0;

const fetchQuery = async (query, timeFrame) => {
    //send a fetch request to prometheus using axios

    if(counter < 4) {
        console.log(`sending PAST 10m of cluster query on params: ${query}`)
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
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                // case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseQueue',env='cluster-demo', aggregate='99thPercentile'}`):
                    let convertedVal = multiGraphConvert(data.data.data.result)
                    return convertedVal;
                default:
                    let preConvert = data.data.data.result[0].values
                    return timeConvert(preConvert);
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    } else {
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`)
            console.log(`sending CURRENT ONLY cluster query on params: ${query}`)
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
                case (`kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}`):
                    let convertedVal = multiGraphConvert(data.data.data.result)
                    console.log('logging convertedVal2 ->', convertedVal);
                    return convertedVal;
                default:
                    let preConvert = [data.data.data.result[0].value]
                    return timeConvert(preConvert);
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