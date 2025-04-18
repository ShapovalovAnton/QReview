const express = require('express');
const bodyParser = require('body-parser')
const PORT = 5000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static("."));

app.get('/', (req, res)=>{
    res.status(200).json('Сервер працює!');
})

const ClientRoutes = require('./router/client.router')
app.use('/api/client', ClientRoutes)

const SurveyRoutes = require('./router/survey.router')
app.use('/api/survey', SurveyRoutes)

const OpQRoutes = require('./router/openendedquestion.router')
app.use('/api/openq', OpQRoutes)

const ClQRoutes = require('./router/closedendedquestion.router')
app.use('/api/closedq', ClQRoutes)

const Option = require('./router/answeroption.router')
app.use('/api/option', Option)

app.listen(PORT, ()=>console.log('Server start!'));



