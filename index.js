const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000; // localhost:3000

let users = [
    {
        id: 1,
        name: 'Adam',
        surname: 'Kowalski'
    },
    {
        id: 2,
        name: 'Tomasz',
        surname: 'Ktosialski'
    },
    {
        id: 3,
        name: 'Tomasz',
        surname: 'Ktosialski2'
    }
]

app.get('/users', (request, result) => {
    console.log(request);
    result.status(200).send(users);
});

app.post('/users', (request, result) => {
    console.log(request);
    users.push(request.body);
    result.status(200).send(users);
});

app.delete('/users/:id', (request, result) => {
    const id = parseInt(request.params.id);
    const indexOfUser = users.findIndex(user => user.id === id);
    users.splice(indexOfUser, 1);
    result.status(204).send('Deleted!');
})

app.put('/users/:id', (request, result) => {
    const id = parseInt(request.params.id);
    const indexOfUser = users.findIndex(user => user.id === id);
    users[indexOfUser].name = request.body.name;
    users[indexOfUser].surname = request.body.surname;
    result.status(204).send('Updated!');
})

app.listen(port, () => {
    console.log(`Server started!! on port ${port}`);
});