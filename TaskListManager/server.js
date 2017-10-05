const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor (client) {
        super();
        
        this.tasks = {};
        this.next_task_id = 1;
        
        process.nextTick(() => this.help());
        
        client.on('command', (command, args) => {
            switch (command) {
                case 'help':
                case 'ls':
                case 'add':
                case 'delete':
                case 'exit':
                    this[command](args);
                    break;
                default:
                    this.emit('response', 'unknown command...');
            }
        });
    }
    
    help () {
        let resp = "Valid commands:\n";
        resp += "\t\t" + " help" + "\n";
        resp += "\t\t" + " ls" + "\n";
        resp += "\t\t" + " add <task>" + "\n";
        resp += "\t\t" + " delete <task_id>" + "\n";
        resp += "\t\t" + " exit";
        
        this.emit('response', resp);
    }
    
    ls () {
        let task_strs = Object.keys(this.tasks).map((task_id) => {
            return `${task_id}: ${this.tasks[task_id]}`;
        });
        
        this.emit('response', task_strs.join('\n'));
    }
    
    add (args) {
        let task = args.join(' ');
        this.tasks[this.next_task_id++] = task;
        this.emit('response', `Added task: ${task}`);
    }
    
    delete (args) {
        let task_id = args[0],
            task = this.tasks[task_id],
            resp = task ? `Task ${task} deleted` : 'Error - no such task';
        
        delete this.tasks[task_id];
        
        this.emit('response', resp);
    }
    
    exit () {
        this.emit('response', 'EXIT');
    }
}

module.exports = (client) => new Server(client);
