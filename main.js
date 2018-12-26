
var mqtt = require('mqtt');
var rpiDhtSensor = require('rpi-dht-sensor');
var dht = new rpiDhtSensor.DHT11(4);
var temperature;

var options = {
    port: 19116,
    host: 'mqtt://m21.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: '*****',
    password: '*****',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://m21.cloudmqtt.com', options);
client.on('connect', function() { 
    console.log('connected');
    read();
});

function read() {
    temperature = dht.read();
    client.publish('temperature', "" + temperature.temperature);
    client.publish('humidity', "" + temperature.humidity);
    setTimeout(read, 5000);
}
