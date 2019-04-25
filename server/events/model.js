const db = require('../db');
const { ObjectID } = require('mongodb');

let mock = {
    viewer: 'Cyrus',
    members: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Phill', 'Jack', 'Erena', 'Jimmy', 'Kelsey', 'Kate', 'Jen']
};


const name = 'events';

async function getAll() {
    return db.collection(name).find().toArray();
}

async function get(id) {
    return db.collection(name).findOne({ _id: ObjectID(id)});
}

async function create(object) {
    let result = await db.collection(name).insertOne({
        title: object.title,
        date: new Date(object.date),
        owner: mock.viewer,
        going: [mock.viewer]
    });
    return get(result.insertedId);
}

async function update(id, object) {
    object._id = ObjectID(object._id);
    object.date = new Date(object.date);

    let result = await db.collection(name).replaceOne(
        { _id: ObjectID(id) },
        { $set: object }
    );
    return get(id);
}

async function remove(id) {
    let object = await get(id);
    db.collection(name).deleteOne({ _id: ObjectID(id)})
    return object;
}

module.exports = {
    name,
    getAll,
    get,
    create,
    update,
    remove
}