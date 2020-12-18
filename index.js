const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
let haik = 'haik'

const PORT = 3000;
const URI = "mongodb://127.0.0.1:27017/names";

// Database schema
let User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true,
        unique: true
    }
});

const user = mongoose.model('people', User);

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/armenia', (req, res, next) => {
    res.json({
        city: 'Karvachar'
    })
})

app.get('/people-names', async (req, res, next) => {
    await user.find((err,obj) => {
        if (err) {
            console.log(err)
            return res.send('Database error')
        }
        return res.send(obj)
    })
})

app.get('/person-names/:id', async (req, res, next) => {
    await user.findById(req.params.id, (err,obj) => {
        if (err) {
            console.log(err)
            return res.send('Database error')
        }
        return res.send(obj)
    })
})

app.post('/login', async (req, res, next) => {

    var newUser = new user({
        name: req.body.name,
        surname: req.body.surname
    })

    await newUser.save((err, obj) => {
        if (err) {
            return res.send('Database error')
        }

        return res.send(obj)
    })
})

app.delete('/delete-name/:id', async (req, res, next) => {
    await user.findByIdAndDelete(req.params.id, (err, obj) => {
        if (err) {
            console.log(err)
            return res.send('Database error')
        }

        return res.sendStatus(200)
    })
})

app.put('/update-name/:id', async (req, res, next) => {
    await user.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true }, (err, obj) => {
        if (err) {
            console.log(err)
            return res.send('Database error')
        }
        return res.send(obj)
    })
})


// Database and server connection
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        return console.log(err)
    }
    app.listen(PORT, () => {
        console.log(`Server running ==> ${PORT}`)
    })
})



