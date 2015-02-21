chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  var user_cert = message.user_cert;
  console.log('frontend has user_cert: ' + user_cert);
}); 

$(document).ready(function(){

  if(isNode) {
    $(".only-with-full-nav").append('<a href="#" class="minibutton sidebar-button"><span class="octicon octicon-rocket rocket"></span> Deploy to Azure</a>');

    var zip = $('a[aria-label^=Download]').attr('href');
    var name = $('.js-current-repository').text();
    var cert = null; //file

    $(".rocket").click(function(e) {
      e.preventDefault();
      $.post("http://arocket.cloudapp.net/exec.php", { 
        fileToUpload: cert, 
        giturl: zip, 
        repo: name 
      }, function(data) {
        console.log("post reponse: " + data);
      });
      return false;
    });
  }



});


function isNode() {
  return $('a[title="package.json"]').length > 0;
}
