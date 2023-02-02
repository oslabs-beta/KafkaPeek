<div style="text-align: center;">

![KafkaPeek Logo](./client/assets/images/zurau-logo.png "KafkaPeek Logo")

</div>

<h1 style="text-align: center" style="font-size: 10rem">Kafka</h1>

KafkaPeek is a developer tool that monitors key metrics in your local Kafka cluster. 

#### Key Health Metrics

- Bytes In Per Sec 
- Bytes Out Per Sec
- JVM Heap Usage (MB)
- Under Replicated Partitions
- Offline Partition Count
- Active Controller Count
- Brokers Running

#### Key Performance Metrics

- Requests Per Sec
- Request Total Time (s)
- Request Queue Time (ms)
- Response Send Time (ms)

## Tech Stack

**Client:** [React](https://reactjs.org/), [React Router](https://reactrouter.com/en/main), [ApexCharts](https://apexcharts.com), [Socket.io](https://socket.io)

**Server:** [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [Socket.io](https://socket.io) [KafkaJS](https://kafka.js.org)


**DevOps:** [Apache Kafka](https://kafka.apache.org/), [Prometheus](https://prometheus.io/), [JMX Exporter](https://github.com/prometheus/jmx_exporter), [Grafana](https://grafana.com), [Docker](https://www.docker.com), [Git](https://git-scm.com/), [Github](https://github.com/)


## Features

- Live monitoring of key health metrics of a Kafka Broker
- Secured login through Github OAuth
- Slack alerts if metrics go beyond user set specifications
- Customization of dashboard metrics based on the organizations needs
- Ability to save graphs in real time


## Installation

Install KafkaPeek with npm to install all dependencies

```bash
  npm install
```
    
## Deployment

To deploy this project run the following commands in the terminal:

1. Deploy your kafka cluster
```bash
  docker-compose up
```

2. In a new terminal window, deploy the producer:
```bash
  npm run start:producer
```

3. In a new terminal window, deploy the consumer:
```bash
  npm run start:consumer
```

4. In a new terminal window, deploy the application on:

Deploy application on dev server (localhost:8080)
```bash
  npm run dev
```

OR

Deploy application on production server (localhost:4000)
```bash
  npm run build
```
then
```bash
  npm start
```
Now you have a fully functioning Kafka broker with one demo producer and consumer.

## Demo

<h3>Main Dashboard</h3>


![Alt Text](https://media.giphy.com/media/kfKhKpAbezCIxwCW9D/giphy.gif)

<h3>Slack Notifications</h3>


![Alt Text](https://media.giphy.com/media/0ykVFzaLsVZao1XgGR/giphy.gif)


## Running Tests

To run tests, run the following command

```bash
  npm run test socketIOtest.js
```
```bash
  npm run test supertest.js
```

## Roadmap

- Web Based Application
- Customized Developer Options 
- Github OAuth Authentication
- User Account Information
- User Settings
- NoSql Database to store Error Logs/Accounts/Archived Metrics

## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## Authors

- Dipen Nagpal: [Github](https://github.com/dnagpal1) | [LinkedIn](www.linkedin.com/in/dipen-nagpal)
- Nicholas Echevarria: [Github](https://github.com/nick-echevarria) | [LinkedIn](https://www.linkedin.com/in/nicholasechevarria/)
- Luis Navarro: [Github](https://github.com/luis-e-navarro) | [LinkedIn](https://linkedin.com/in/luis-e-navarro)
- Juan Kang: [Github](https://github.com/juanpakang) | [LinkedIn](https://www.linkedin.com/in/juankang/)
