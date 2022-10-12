// initializing notification object used as a reference
const metricsObject = {
    bytesInPerSec: null,
    bytesOutPerSec: null,
    messagesInPerSec: null,
    offlinePartitions: null,
    underRepPartitions: null
  }
  
  module.exports = metricsObject;

// health metrics references ------------------------------------------------------------------
// bytesInPerSec: ['kafka_server_broker_topic_metrics_bytesinpersec_rate','']
// bytesOutPerSec: ['kafka_server_broker_topic_metrics_bytesoutpersec_rate','']
// messagesInPerSec: ['kafka_server_broker_topic_metrics_messagesinpersec_rate','']
// jvmHeapUsage: ['kafka_jvm_heap_usage{env="cluster-demo", type="used"}','']
// activeControllerCount: ['sum(kafka_controller_activecontrollercount)','']
// underRepPartitions: ['kafka_server_replica_manager_underreplicatedpartitions','']
// offlinePartitions: ['kafka_controller_offlinepartitionscount','']
// brokersRunning: ['count(kafka_server_brokerstate)','']

// performance metrics references ------------------------------------------------------------------
// requestsPerSec: ["kafka_network_request_per_sec{aggregate=~"OneMinuteRate",request="Produce"}",""]
// requestTotalTime :["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}","[10m:10s]"]
// responseQueueTime : ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseQueue',env='cluster-demo', aggregate='99thPercentile'}","[10m:10s]"]
// responseSendTime : ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseSend',env='cluster-demo', aggregate='Mean'}","[10m:10s]"]
// processorIdlePercent : ["kafka_network_processor_idle_percent","[10m:10s]"]