import React from 'react';

const date2timestr = (date) => {
    return date.toLocaleTimeString().replace(/:\d\d /g, ' ');
}
const fromNow = (days=0, hours=0) => {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    return date;
}

let viewer = "Cyrus";
let members = ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Phill', 'Jack', 'Erena', 'Jimmy', 'Kelsey', 'Kate', 'Jen'];
let upcoming = [
    {_id: 0, title: 'bowling at Pinz', date: fromNow(1, 10), owner: 'Cyrus', going: ['Cyrus', 'Tristan', 'Lianna', 'Jen']},
    {_id: 1, title: 'comedy show', date: fromNow(3, 15), owner: 'Zack', going: ['Zack', 'Andy']},
    {_id: 2, title: 'anime night', date: fromNow(3, 20), owner: 'Andy', going: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Jimmy', 'Kelsey']},
    {_id: 3, title: 'hike Mt Tom', date: fromNow(6, 14), owner: 'Cyrus', going: ['Cyrus', 'Tristan', 'Lianna']},
    {_id: 4, title: 'murder mystery party', date: fromNow(10, 17), owner: 'Zack', going: ['Cyrus', 'Zack', 'Andy', 'Tristan', 'Lianna', 'Phill', 'Jack', 'Erena', 'Jimmy', 'Kelsey', 'Kate', 'Jen']},
    {_id: 5, title: 'farmer\'s market', date: fromNow(11, 14), owner: 'Phill', going: ['Phill', 'Kate']},
    {_id: 6, title: 'concert in Northampton', date: fromNow(13, 16), owner: 'Jack', going: ['Jack', 'Erena']},
    {_id: 7, title: 'game night', date: fromNow(14, 20), owner: 'Zack', going: ['Cyrus', 'Zack', 'Andy', 'Erena']},
]

const Item = (props) => {
    return (
        <div className="item">
            <div className="date">{props.item.date.getMonth()+1}/{props.item.date.getDate()}</div>
            <div className="content">
                <div className="title">{props.item.title}</div>
                <div className="info">
                    <span className="time">{date2timestr(props.item.date)}</span> • <span className="owner">{props.item.owner}</span> • <span className="going">{props.item.going.length} going</span>
                </div>
            </div>
            
            <div className="controls">
                { (props.item.owner === viewer)
                    ? <button className="button">edit</button>
                    : (props.item.going.includes(viewer))
                        ? <button className="button muted">leave</button>
                        : <button className="button">join</button>
                }
            </div>
        </div>
    )
}

const List = (props) => {
    let itemRows = props.upcoming
        .sort((a, b) => a.date - b.date)
        .map(item => <Item key={item._id} item={item} />);

    return (
        <div className="list">
            {itemRows}
        </div>
    );
}

const AddItem = (props) => {
    const datetime = new Date();

    return (
        <div className="item edit-item">
            <div className="date">{datetime.getMonth()+1}/{datetime.getDate()}</div>
            <div className="content">
                <div className="title">
                    <input type="text" name="title" placeholder="new event"></input>
                </div>
                <div className="info">
                    <span className="time"><input type="datetime-local" name="datetime" defaultValue={datetime.toISOString().slice(0, 16)}></input></span>
                </div>
            </div>
            
            <div className="controls">
                <button className="button muted">cancel</button>
                <button className="button">create</button>
            </div>
        </div>
    )
}

const Header = (props) => {
    return (
        <div className="header">
            <div className="title">Upcoming</div>
            <button className="button alone">add new</button>
        </div>
    )
}

const Upcoming = (props) => {
    return (
        <div className="Upcoming">
        <Header />
        <AddItem />
        <List upcoming={upcoming}/>
        </div>
    );
};
export default Upcoming;
