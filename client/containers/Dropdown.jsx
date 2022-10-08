import * as React from 'react';
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'



const Dropdown = props => {

    // useEffect(() => {
    //     console.log('hi')
    //     if (metric) {
    //         axios.post("http://localhost:4000/auth/form-submit", metric)
    //         .then(({ data }) => {
    //           // do something with data
    //           console.log('loggin data from frontend',data)
    //         })
    //         .catch(err => {
    //           console.error(err.toJSON());
    //         });
    //     }
    //   }, [metric]);

    const metrics = [
        { value: "bytesInPerSec", label: "BytesInPerSec" },
        { value: "bytesOutPerSec", label: "BytesOutPerSec" },
        { value: "offlinePartitions", label: "Offline Partitions" }
      ];
    const [metric, setMetric] = useState(metrics[0]);
  
    const onChange = async selectedOption => {
      await setMetric(selectedOption);
      await axios.post("http://localhost:4000/auth/form-submit", selectedOption)
      .then(({ data }) => {
        // do something with data
        console.log('loggin data from frontend',data)
      })
      .catch(err => {
        console.error(err.toJSON());
      });
      console.log(`Option selected:`, selectedOption);
    };
  
    return <Select options={metrics} onChange={onChange} value={metric} />;
  };
export default Dropdown;