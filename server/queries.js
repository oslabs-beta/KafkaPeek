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

let counter = 0;

const fetchQuery = async (query, timeFrame) => {
    //send a fetch request to prometheus using axios

    if(counter < 4) {
        // console.log(`sending PAST 5m of cluster query on params: ${query}`)
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}${timeFrame}`)
            counter++
            switch(query) {
                // case ('kafka_server_broker_topic_metrics_bytesinpersec_rate'):
                //     let preConvert = data.data.data.result[0].values
                //     // console.log(preConvert)
                //     // console.log(timeConvert(preConvert))
                //     return timeConvert(preConvert);
                // case ('kafka_server_broker_topic_metrics_bytesoutpersec_rate'):
                //     return data.data.data.result[0];
                // case ('kafka_server_broker_topic_metrics_messagesinpersec_rate'):
                //     return data.data.data.result[0];
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
                default:
                    let preConvert = data.data.data.result[0].values
                    console.log(timeConvert(preConvert))
                    return timeConvert(preConvert);
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    } else {
        
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`)
            // console.log(`sending CURRENT ONLY cluster query on params: ${query}`)
            switch(query) {
                // case ('kafka_server_broker_topic_metrics_bytesinpersec_rate'):
                //     // let preConvert = [data.data.data.result[0].value]
                //     // // console.log([data.data.data.result[0].value])
                //     // // console.log(timeConvert(preConvert))
                //     // return timeConvert(preConvert);
                // case ('kafka_server_broker_topic_metrics_bytesoutpersec_rate'):
                //     return data.data.data.result[0];
                // case ('kafka_server_broker_topic_metrics_messagesinpersec_rate'):
                //     return data.data.data.result[0];
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
                default:
                    let preConvert = [data.data.data.result[0].value]
                    return timeConvert(preConvert);
            }
        } catch (err) {
            console.log(`Error in ${query}, err: ${err}`)
        }
    }



}



module.exports = { fetchQuery }