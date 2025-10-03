const readline = require('readline-sync');
const config = require('../../config')
module.exports = {
    log(info, breakpoint) {
        console.log("<" + info + ">\n", breakpoint)
        if (config.debugger)
            readline.question("<" + info + ">\n")
        else console.log("<" + info + ">\n")
    }
}