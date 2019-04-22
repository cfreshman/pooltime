const fromNow = (days=0, hours=0) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours, 0, 0, 0);
    return date;
}
let mock = {
    viewer: 'Cyrus',
    members: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Phill', 'Jack', 'Erena', 'Jimmy', 'Kelsey', 'Kate', 'Jen'],
    upcoming: [
        {_id: 0, title: 'bowling at Pinz', date: fromNow(1, 10), owner: 'Cyrus', going: ['Cyrus', 'Tristan', 'Lianna', 'Jen']},
        {_id: 1, title: 'comedy show', date: fromNow(3, 15), owner: 'Zack', going: ['Zack', 'Andy']},
        {_id: 2, title: 'anime night', date: fromNow(3, 20), owner: 'Andy', going: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Jimmy', 'Kelsey']},
        {_id: 3, title: 'hike Mt Tom', date: fromNow(6, 14), owner: 'Cyrus', going: ['Cyrus', 'Tristan', 'Lianna']},
        {_id: 4, title: 'murder mystery party', date: fromNow(10, 17), owner: 'Zack', going: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Phill', 'Jack', 'Erena', 'Jimmy', 'Kelsey', 'Kate', 'Jen']},
        {_id: 5, title: 'farmer\'s market', date: fromNow(11, 14), owner: 'Phill', going: ['Phill', 'Kate']},
        {_id: 6, title: 'concert in Northampton', date: fromNow(13, 16), owner: 'Jack', going: ['Jack', 'Erena']},
        {_id: 7, title: 'game night', date: fromNow(14, 20), owner: 'Zack', going: ['Cyrus', 'Zack', 'Andy', 'Erena']},
    ],
    up_id: 7
}


const name = 'events';

async function getAll() {
    return mock.upcoming;
}

async function get(id) {
    return mock.upcoming.filter(event => event._id === Number(id));
}

async function create(object) {
    let event = {
        _id: ++mock.up_id,
        title: object.title,
        date: new Date(object.date),
        owner: mock.viewer,
        going: [mock.viewer]
    }
    mock.upcoming.push(event);
    return event;
}

async function update(id, object) {
    id = Number(id);
    if (id !== object._id) throw Error(`update /${id} does not match object _id ${object._id}`);

    mock.upcoming.splice(mock.upcoming.findIndex(e => e._id === id), 1, object);
    return object;
}

async function remove(id) {
    return mock.upcoming.splice(mock.upcoming.findIndex(e => e._id === Number(id)), 1)[0];
}

module.exports = {
    name,
    getAll,
    get,
    create,
    update,
    remove
}