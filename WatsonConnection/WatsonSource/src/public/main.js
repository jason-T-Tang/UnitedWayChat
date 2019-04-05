const form = document.querySelector('.url-form'); //gets eyes on the entry textbox
const result = document.querySelector('.result-section');//idk
form.addEventListener('submit', event => {//sets the button's event listener to the following code
  event.preventDefault();//idk

  const input = document.querySelector('.url-input'); //finds the input field
  fetch('/new', { //calls a fetch, idk what that really means
    method: 'POST', //this fetch is a post, so the server.js can react to the Post
    headers: { //idk
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
	//body of the fetch and makse a json from the input text
    body: JSON.stringify({
      text: input.value,
    })
	
  })
	//after receiving a response, runs a "promomise" which is the then statement
    .then(response => {
		//error catching idk
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
	//with the data sent back through res.send
    .then(data => {
		//for loop through the output text
		for(var i=0;i<data.output.generic.length;i++){
			//add all output to the textarea
		document.getElementById('responsearea').value +="\n"+data.output.generic[i].text;
	}
 
    })
    .catch(console.error)//not mine
});