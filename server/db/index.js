const { MongoClient } = require('mongodb');

let client;

function connect(url, callback) {
    if (client) callback();

    MongoClient.connect(url, { useNewUrlParser: true }, (err, result) => {
        if (err) console.log(err);
        client = result;
        callback();
    });
}

function get() {
    return client.db();
}

function collection(name) {
    return client.db().collection(name);
}

function close(callback=()=>{}) {
    if (!client) callback();

    client.close(err => {
        if (err) console.log(err);
        client = null;
        callback();
    });
}

module.exports = {
    connect,
    get,
    collection,
    close
}