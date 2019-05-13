
import { seedDB } from './seeds';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    app = express(),
    methodOverride = require('method-override'),
    port = process.env.PORT || 5010,

    //keys
    keys = require('./config/keys'),

    //test controllers functions
    dayCreator = require('./functions/dayCreator'),

    //routers
    auth = require('./routers/auth'),
    recipes = require('./routers/recipes'),
    search = require('./routers/search');


seedDB();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


const mongoDB = keys.MONGODB_URI;

/*====================== Mongoose connections ========================*/
//Map global promises to get rid of warning
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect(mongoDB,{ useNewUrlParser:true })
    .then(()=> console.log('MongoDB connected!'))
    .catch(err => console.log('error connecting to MongoDB\n',err));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next) => {
    res.send('got server up and running')
})

app.use('/auth',auth);
app.use('/recipes',recipes);
app.use('/search',search);

app.listen(port, function () {
    console.log('server up and running on port', port)

})