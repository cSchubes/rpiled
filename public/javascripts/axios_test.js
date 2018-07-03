function performGetRequest1() {
    var temp = ';'
     
     axios.get('http://localhost:3000/api')
       .then(function (response) {
         temp = response;
         console.log(temp);
         alert("performing get request");
       })
       .catch(function (error) {
         alert("ERRORS");
         console.log(error);
         //resultElement.innerHTML = generateErrorHTMLOutput(error);
       });   
}

function performPostRequest(hexColor) {
    axios.post('http://localhost:3000/api/uniformColor/setColor', {
        color: hexColor,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
}