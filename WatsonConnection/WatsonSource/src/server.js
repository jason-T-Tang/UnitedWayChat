
//Requiring Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//Initializing Scanner and Watson
var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var service = new AssistantV1({
  iam_apikey: 'baYeqgR1fdDkXIEvYtiBNQ9fsEho5GKafGCntXycGBPG',
  version: '2018-09-20'
});

//Variables to reuse
var workspace_id = '380f9f30-5b51-481b-98f8-088936a16972';
var setContext;
var bool=false;
var bool1=false;

//Dependencies
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());

//Gets html
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(htmlPath);
});

//Port Setup
app.set('port', process.env.PORT || 4100);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.post('/new', (req, res) => {

 if(!bool){
 //Initial Message
 service.message({
  workspace_id: workspace_id,
  input:{text:"hello"},
  }, processResponse);
 }
 else if(bool){
	  service.message({
  workspace_id: workspace_id,
  input:{text:req.body.text},
  context:setContext,
  }, processResponse);
 }
  //Recursive dialogue
  function processResponse(err, response) {
	setContext=response.context;
	//console.log(setContext);
  bool=true;
  if (err) {
    console.error(err); // Catch Errors
    return;
  }
  // Display the output from dialog, if any. Assumes a single text response.
  if (response.output.generic.length != 0) {
	  for(var i=0;i<response.output.generic.length;i++){
	  //console.log(response.output.generic[i].text);
	  }
	  console.log(response);
	  res.send(response);

  }
  
	        
  }
  

})
