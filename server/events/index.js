const model = require('./model');
const routes = require('express').Router();

// get all events
routes.get('/', (req, res) => {
    model.getAll()
        .then(data => res.json({ data }))
        .catch(error => res.json({ error }));
});

// get event :id
routes.get('/:id', (req, res) => {
    model.get(req.params.id)
        .then(data => res.json({ data }))
        .catch(error => res.json({ error }));
});

// create event
routes.post('/', (req, res) => {
    model.create(req.body)
        .then(data => res.json({ data }))
        .catch(error => res.json({ error }));
});

// update event :id
routes.put('/:id', (req, res) => {
    model.update(req.params.id, req.body)
        .then(data => res.json({ data }))
        .catch(error => res.json({ error }));
});

// delete event :id
routes.delete('/:id', (req, res) => {
    model.remove(req.params.id)
        .then(data => res.json({ data }))
        .catch(error => res.json({ error }));
});

module.exports = {
    routes,
    model
}