
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ImportRouter = require('./routes/ImportExportRouter');

const app = express();
const port = process.env.PORT || 3000;

// Use the EJS rendering engine for HTML located in /views
app.engine('html', ejs.__express);
app.set('view engine', 'html');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(ImportRouter);

const dbURI = 'mongodb://maxbrown:pathways1@ds153851.mlab.com:53851/upenn_history_pathways';
mongoose.connect(process.env.DB_URI || dbURI, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`Some problem with the connection ${err}`);
  } else {
    console.log('The Mongoose connection is ready');
  }
});

app.use('/dist', express.static(path.join(__dirname, '/dist')));

// These are necessary for routing within react
app.get('/admin', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/admin.html`));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/client.html`));
});

// Start server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});