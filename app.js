const EventEmitter = require('events');
const Logger = require('./logger');
const logger = new Logger();

// register listener
logger.on('dataIsHere',(args) => {
    console.log(args);
});

// Raise an event
logger.getData('hello');