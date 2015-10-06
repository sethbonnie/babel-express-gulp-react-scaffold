var express = require( 'express' );
var morgan = require( 'morgan' );
var app = express();

app.set( 'port', process.env.PORT || 7070 );

app.use( express.static(__dirname+'/public') );

app.listen( app.get('port'), function() {
	console.log( 'Docking on port', app.get('port') );
});