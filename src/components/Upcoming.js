import React, { useState, useEffect } from 'react';

const date2timestr = (date) => {
    return date.toLocaleTimeString().replace(/:\d\d /g, ' ');
}
const noTZ = (date) => {
    let adjusted = new Date(date);
    adjusted.setMinutes(date.getMinutes() - new Date().getTimezoneOffset());
    return adjusted;
}
const addTZ = (date) => {
    let adjusted = new Date(date);
    adjusted.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
    return adjusted;
}

let mock = {
    viewer: 'Cyrus'
}

const Item = (props) => {
    const [editOpen, setEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(props.item.title);
    const [editDate, setEditDate] = useState(noTZ(props.item.date));

    const handleChange = {
        title: (e) => setEditTitle(e.target.value),
        date: (e) => !isNaN(Date.parse(e.target.value)) && setEditDate(new Date(e.target.value))
    };

    const handleClick = {
        join: () => {
            let item = Object.assign({}, props.item);
            item.going = props.item.going.concat([mock.viewer]);
            props.editItem(item);
        },
        leave: () => {
            let item = Object.assign({}, props.item);
            item.going = item.going.filter(x => x !== mock.viewer);
            props.editItem(item);
        },
        edit: () => {
            setEditOpen(!editOpen);
            setEditTitle(props.item.title);
            setEditDate(noTZ(props.item.date));
        },
        save: () => {
            let item = Object.assign({}, props.item);
            item.title = editTitle;
            item.date = addTZ(editDate);
            props.editItem(item);
            setEditOpen(!editOpen);
        },
        delete: () => {
            props.deleteItem(props.item._id);
        }
    }

    if (editOpen) {
        return (
            <div className={"item edit-item"}>
                <div className="date">{editDate.getUTCMonth()+1}/{editDate.getUTCDate()}</div>
                <div className="content">
                    <div className="title">
                        <input type="text" name="title" value={editTitle} onChange={handleChange.title} autoComplete="off"></input>
                    </div>
                    <div className="info">
                        <span className="time"><input type="datetime-local" name="datetime" defaultValue={editDate.toISOString().slice(0, 16)} onChange={handleChange.date}></input></span>
                    </div>
                </div>

                <div className="controls">
                    <button className="button" onClick={handleClick.delete}>delete</button>
                    <button className="button muted" onClick={handleClick.edit}>cancel</button>
                    <button className="button special" onClick={handleClick.save}>save</button>
                </div>
            </div>
        )
    } else {
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
                    { (props.item.owner === mock.viewer)
                        ? <button className="button special" onClick={handleClick.edit}>edit</button>
                        : (props.item.going.includes(mock.viewer))
                            ? <button className="button muted" onClick={handleClick.leave}>leave</button>
                            : <button className="button" onClick={handleClick.join}>join</button>
                    }
                </div>
            </div>
        )
    }
}

const List = (props) => {
    let now = new Date();
    let itemRows = props.upcoming
        .filter(x => x.date >= now)
        .sort((a, b) => a.date - b.date)
        .map(item => <Item key={item._id} item={item} {...props}/>);

    return (
        <div className="list">
            {itemRows}
        </div>
    );
}

const AddItem = (props) => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(tomorrow.getHours(), -tomorrow.getTimezoneOffset(), 0, 0);
    const [datetime, setDatetime] = useState(tomorrow);
    const [title, setTitle] = useState('');

    const handleChange = {
        title: (e) => setTitle(e.target.value),
        datetime: (e) => (e) => !isNaN(Date.parse(e.target.value)) && setDatetime(new Date(e.target.value))
    };

    const handleSubmit = () => {
        let adjusted = datetime;
        adjusted.setMinutes(adjusted.getMinutes() + tomorrow.getTimezoneOffset());
        props.addItem({
            title: title,
            date: adjusted,
            owner: mock.viewer,
            going: [mock.viewer]
        });
        setTitle('');
    };

    return (
        <div className={"item edit-item " + (props.addOpen ? '' : 'closed')}>
            <div className="date">{datetime.getMonth()+1}/{datetime.getDate()}</div>
            <div className="content">
                <div className="title">
                    <input type="text" name="title" placeholder="new event" value={title} onChange={handleChange.title} autoComplete="off"></input>
                </div>
                <div className="info">
                    <span className="time"><input type="datetime-local" name="datetime" defaultValue={datetime.toISOString().slice(0, 16)} onChange={handleChange.datetime}></input></span>
                </div>
            </div>

            <div className="controls">
                <button className="button muted" onClick={props.cancelAdd}>cancel</button>
                <button className="button special" onClick={handleSubmit}>create</button>
            </div>
        </div>
    )
}

const Header = (props) => {
    return (
        <div className="header">
            <div className="title">Upcoming</div>
            { !props.addOpen &&
                <button className="button alone special" onClick={props.toggleAdd}>add new</button>
            }
        </div>
    )
}

const Upcoming = (props) => {
    const [upcoming, setUpcoming] = useState([]);
    const [addOpen, setAddOpen] = useState(false);

    useEffect(() => {
        fetch('/api/events').then(res => res.json()).then(result => {
            result.data.forEach(e => {
                e.date = new Date(e.date);
            });
            setUpcoming(result.data);
        });
    }, []);

    const toggleAdd = () => {
        setAddOpen(!addOpen);
    }

    const addItem = (item) => {
        setAddOpen(false);
        fetch('/api/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        }).then(res => res.json()).then(result => {
            result.data.date = new Date(result.data.date);
            setUpcoming(upcoming.concat([result.data]));
        });
    }

    const deleteItem = (_id) => {
        fetch('/api/events/' + _id, {
            method: 'DELETE'
        }).then(res => res.json()).then(result => {
            setUpcoming(upcoming.filter(x => x._id !== result.data._id));
        });
    }

    const editItem = (item) => {
        setAddOpen(false);
        fetch('/api/events/' + item._id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        }).then(res => res.json()).then(result => {
            result.data.date = new Date(result.data.date);
            let i = upcoming.findIndex(x => x._id === result.data._id);
            if (i > -1) {
                let update = upcoming.slice()
                update[i] = result.data;
                setUpcoming(update);
            }
        });
    }

    return (
        <div className="Upcoming">
        <Header addOpen={addOpen} toggleAdd={toggleAdd} />
        <AddItem addOpen={addOpen} addItem={addItem} cancelAdd={toggleAdd} />
        <List upcoming={upcoming} editItem={editItem} deleteItem={deleteItem} />
        </div>
    );
};
export default Upcoming;
