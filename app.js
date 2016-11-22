var express  = require("express"),
    bodyParser = require("body-parser"),
    http     = require("http"),
    OpenTok = require('opentok'),
    app,
    router,
    server;

var apiKey = '45722802';
var apiSecret = 'bbacb3fc023b091bfdfd77c34e4f6050cd974379' ;
var opentok = new OpenTok(apiKey, apiSecret);
var app = express();
var sessionId;
opentok.createSession({mediaMode:"routed"}, function(error, session) {
  if (error) {
    console.log("Error creating session:", error)
  } else {
    app.set('sessionId', session.sessionId);
    init();
  }
});
app.get('/', function(req, res) {
  var sessionId = app.get('sessionId'),
      token = opentok.generateToken(sessionId, { role: 'moderator' });  

res.json([
	{
		apiKey: apiKey,
    	sessionId: sessionId,
    	token: token
	}
	
	]);
 });

function init() {
  app.listen(3000, function() {
    console.log('http://localhost:3000/');
  });
}
