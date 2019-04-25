const db = require('../db');

const fromNow = (days=0, hours=0) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours, 0, 0, 0);
    return date;
}

db.connect('mongodb://localhost/pooltime', async () => {
    await db.collection('events').deleteMany({});

    let events = [
        {title: 'bowling at Pinz', date: fromNow(1, 10), owner: 'Cyrus', going: ['Cyrus', 'Tristan', 'Lianna', 'Jen']},
        {title: 'comedy show', date: fromNow(3, 15), owner: 'Zack', going: ['Zack', 'Andy']},
        {title: 'anime night', date: fromNow(3, 20), owner: 'Andy', going: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Jimmy', 'Kelsey']},
        {title: 'hike Mt Tom', date: fromNow(6, 14), owner: 'Cyrus', going: ['Cyrus', 'Tristan', 'Lianna']},
        {title: 'murder mystery party', date: fromNow(10, 17), owner: 'Zack', going: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Phill', 'Jack', 'Erena', 'Jimmy', 'Kelsey', 'Kate', 'Jen']},
        {title: 'farmer\'s market', date: fromNow(11, 14), owner: 'Phill', going: ['Phill', 'Kate']},
        {title: 'concert in Northampton', date: fromNow(13, 16), owner: 'Jack', going: ['Jack', 'Erena']},
        {title: 'game night', date: fromNow(14, 20), owner: 'Zack', going: ['Cyrus', 'Zack', 'Andy', 'Erena']},
    ];

    await db.collection('events').insertMany(events);

    db.close();
});