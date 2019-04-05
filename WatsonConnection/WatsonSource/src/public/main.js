const form = document.querySelector('.url-form');
const result = document.querySelector('.result-section');
form.addEventListener('submit', event => {
  event.preventDefault();

  const input = document.querySelector('.url-input');
  fetch('/new', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: input.value,
    })
	
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
		for(var i=0;i<data.output.generic.length;i++){
		document.getElementById('responsearea').value +="\n"+data.output.generic[i].text;
	}		
	//document.getElementById('responsearea').value += responseValue;
	//document.getElementById('responsearea').value +=data.output.generic[0].text;
	
		
		
      
    })
    .catch(console.error)
});