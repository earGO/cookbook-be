
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    app = express(),
    methodOverride = require('method-override'),
    port = process.env.PORT || 5010,

    //keys
    keys = require('./config/keys'),
    seedDB = require('./seeds');

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


app.get('/', (req, res) => {
    res.send('got server up and running')
})

app.listen(port, function () {
    console.log('server up and running on port', port)

})