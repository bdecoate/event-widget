var _ = require('lodash');
var randomWord = require('random-word');
var moment = require('moment');
var fs = require('fs');

var proper_noun = function(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
};

var gen_data = function(name, date_key, amount){
	return _.map(_.range(1, amount + 1), function(id){
		return {
			id: id,
			name: proper_noun(randomWord()) + ' ' + name,
			[date_key]: moment().add(Math.random() * 37, 'days').format('MM/DD/YYYY')
		}
	});

};

var quotes = gen_data('Quote', 'expiration_date', 200);
var meetings = gen_data('Meeting', 'start_date', 200);
var tasks = gen_data('Task', 'due_date', 200);
var opportunities = gen_data('Opportunity', 'expected_close', 200);
var output = `export const quotes = ${JSON.stringify(quotes)};\n` +
	`export const meetings = ${JSON.stringify(meetings)};\n` +
	`export const tasks = ${JSON.stringify(tasks)};\n` +
	`export const opportunities = ${JSON.stringify(opportunities)};\n`;


fs.writeFile('./src/server/services.js', output, function(err){
	if(err){
		throw err;
	}
	console.log('generated test data into ./src/server/services.js');
});
