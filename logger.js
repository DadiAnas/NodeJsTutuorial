
const EventEmitter = require('events');

class Logger extends EventEmitter {
    getData(message){
        console.log(message);
        this.emit('dataIsHere',{name:'anaas'});
    }
}
module.exports = Logger;