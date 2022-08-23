const os = require('os');

exports.getCpus = async function () {

    return await os.cpus();
}

exports.getFreemem = async function () {

    return await os.freemem();
}
