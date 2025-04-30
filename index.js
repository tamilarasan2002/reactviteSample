const express = require('express');
const { DBConnection } = require('./config/DBconfigure');
const app = express();
const authRouter = require('./Router/Auth.Router');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bookRouter = require('./Router/Book.Router');

DBConnection();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',  
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use(helmet());            
app.use(cookieParser());      
app.use(express.urlencoded({ extended: true }));3

app.use('/user/auth', authRouter);
app.use('/user/auth', bookRouter);

app.get('/', (req, res) => {
  console.log('data');
  res.send('Hello Otha!');
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});



