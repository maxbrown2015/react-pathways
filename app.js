
import express from 'express';
import path from 'path';
import ejs from 'ejs'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import webpack from 'webpack';
import config from "./webpack.config.js"
import middleware from 'webpack-dev-middleware';
import ImportRouter from './routes/ImportData';
import ExportRouter from './routes/ExportData'
import history from 'connect-history-api-fallback'; 

const app = express();
const port = process.env.PORT || 3000;


app.use(history());
const compiler = webpack(config); 
app.use(middleware(compiler, {
  publicPath: '/'
}));

app.set('port', port);
console.log(port);

// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// Host static files on URL path
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(ImportRouter);  

const dbURI='mongodb://maxbrown:pathways1@ds153851.mlab.com:53851/upenn_history_pathways'
mongoose.connect(process.env.DB_URI || dbURI, function(err){    
    if(err){
    console.log('Some problem with the connection ' +err)   
    } 
    else {
      console.log('The Mongoose connection is ready');
    }
});

app.get('/', (req, res) => {
  res.render('./dist/index');
});

// Start server
app.listen(app.get('port'), () => {
  console.log(`Express game server listening on port ${port}`);
});


