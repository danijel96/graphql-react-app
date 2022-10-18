const express = require('express');
const colors = require('colors');
require('dotenv').config();
const cors = require('cors');
const schema = require('./schema/schema.js');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const path = require('path');

const { graphqlHTTP } = require('express-graphql');

const app = express();

connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, console.log('Server listening on port ' + port));