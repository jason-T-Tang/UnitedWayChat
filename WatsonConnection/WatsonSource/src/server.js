
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
 //Initial Message. Runs this if it is the first time to get the context
 service.message({ //service.message is how you send a request to the assistant
//(asistant_name).message has 2 arguments, parameters .json, and callback() (the function that does the thing)
  workspace_id: workspace_id, //parameters for the request as a json
  input:{text:"hello"},
  }, processResponse); //runs processResponse as the callback function
 }
 else if(bool){ //if it is the second message and there is a context to be set,
	  service.message({
  workspace_id: workspace_id,
  input:{text:req.body.text},
  context:setContext, //sets the context, saving the state from the last message
  }, processResponse);
 }
 //the callback function
  function processResponse(err, response) {
	setContext=response.context; //updates state
	//console.log(setContext);
  bool=true; //it is the second message
  
  //If statement is not mine, do not touch
  if (err) {
    console.error(err); // Catch Errors
    return;
  }
  // Display the output from dialog, if any. Assumes a single text response.
	  console.log(response); //logs it for developer use
	  res.send(response);//sends it back to the function which called for the Post

  }
  
	        
  }
  

)
