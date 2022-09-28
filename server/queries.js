const axios = require('axios')

const fetchQuery = async (query, timeFrame) => {
    //send a fetch request to prometheus using axios
    console.log(`sending cluster query on params: ${query}, ${timeFrame}`)
    try {
        const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}${timeFrame}`)
        // console.log(data.data.data.result[0].values);
        switch(query) {
            case ('kafka_server_broker_topic_metrics_bytesinpersec_rate'):
                return data.data.data.result[0];
            case ('kafka_server_broker_topic_metrics_bytesoutpersec_rate'):
                return data.data.data.result[0];
            case ('kafka_server_broker_topic_metrics_messagesinpersec_rate'):
                return data.data.data.result[0];
            case ('sum(kafka_controller_activecontrollercount)'):
                return data.data.data.result[0];
            case ('kafka_jvm_heap_usage{env="cluster-demo'):
                return data.data.data.result[0];
            default:
                return data.data.data.result[0];
        }
    } catch (err) {
        console.log(`Error in ${query}, err: ${err}`)
    }

}



module.exports = { fetchQuery }