
import express from 'express';
import path from 'path';
import ejs from 'ejs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import ImportExportRouter from './routes/ImportExportRouter';


let app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
console.log(port);

// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');


// Host static files on URL path
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/importexport', ImportExportRouter);  


var dbURI='mongodb://maxbrown:pathways1@ds153851.mlab.com:53851/upenn_history_pathways'
mongoose.connect(process.env.DB_URI || dbURI,function(err){    
    if(err){
    console.log('Some problem with the connection ' +err)   
    } 
    else {
      console.log('The Mongoose connection is ready');
    }
});

global.mongoose = mongoose;


app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(app.get('port'), () => {
  console.log(`Express game server listening on port ${port}`);
});
