$(window).on('beforeunload', function(){
    postRequest();
    location.reload();
});

$(window).on('unload', function(){
    postRequest();
    location.reload();
});
function postRequest() {
    axios.get(`/login123/signup`)      
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });;
}