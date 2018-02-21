'use strict';



var APP_ID = 'amzn1.ask.skill.71e22844-f112-4405-a6f2-20804ca02249';

process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

var Handlers = require('./Handlers');

var handlers = Handlers.handlers;
var Alexa = require('alexa-sdk');

console.log(Handlers.sharedObj);

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    console.log('Begining for skill with APP_ID=alexa.APP_ID');
    alexa.execute();
    console.log('Ending execution with APP_ID=alexa.APP_ID');
};