import express from 'express';

import {
	quotes,
	meetings,
	tasks,
	opportunities
} from './services';

let app = express();
let port = 1337;

app.use(express.static('build'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index.ejs', {
		resources: [
			{name: 'quotes', filter: 'expiration_date'},
			{name: 'meetings', filter: 'start_date'},
			{name: 'tasks', filter: 'due_date'},
			{name: 'opportunities', filter: 'expected_close'},
		]
	});
});

app.get('/quotes', function(req, res){
	res.json(quotes);
});

app.get('/meetings', function(req, res){
	res.json(meetings);
});

app.get('/tasks', function(req, res){
	res.json(tasks);
});

app.get('/opportunities', function(req, res){
	res.json(opportunities);
});

app.listen(port, function(){
});
