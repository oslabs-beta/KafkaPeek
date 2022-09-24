const axios = require('axios')

const fetchQuery = async (query, timeFrame) => {
    //send a fetch request to prometheus using axios
    console.log(`sending cluster query on params: ${query}, ${timeFrame}`)
    try {
        const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}${timeFrame}`)
        // console.log(data.data.data.result[0].values);
        switch(query) {
            case ('kafka_server_broker_topic_metrics_bytesinpersec_rate'):
                return data.data.data.result[0].values;
            default:
                return data;
        }
    } catch (err) {
        console.log(`Error in ${query}, err: ${err}`)
    }

}



module.exports = { fetchQuery }