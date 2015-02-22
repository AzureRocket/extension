chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.user_cert) {
    var user_cert = message.user_cert;
    console.log('frontend has user_cert: ' + user_cert);
  }

  if(message.socket_data) {
    sendResponse('got socket data');
    $('#broadcasts').append('<li>' + message.socket_data.hello + '</li>')
    console.log(message.socket_data.hello);
  }
}); 

$(document).ready(function(){

  if(isNode) {
    $(".only-with-full-nav").append('<a href="#" class="minibutton sidebar-button" id="append"><span class="octicon octicon-rocket rocket"></span> Deploy to Azure</a>');
    $('body').append('<div id="content"><h1>Look at me!</h1><ul id="broadcasts"></ul></div>');
    var zip = $('a[aria-label^=Download]').attr('href');
    var name = $('.js-current-repository').text();
    var cert = null; //file

    $(".rocket").click(function(e) {
      // e.preventDefault();
      // $.post("http://arocket.cloudapp.net/exec.php", { 
      //   fileToUpload: cert, 
      //   giturl: zip, 
      //   repo: name 
      // }, function(data) {
      //   console.log("post reponse: " + data);
      // });
      // return false;
    });

    window.setTimeout(function() {
      var myContent = document.getElementById('content');

      var myModal = new Modal({
        content: myContent
      });

      var triggerButton = document.getElementById('append');

      triggerButton.addEventListener('click', function() {
        myModal.open();
      });
    }, 3000);
  }



});





function isNode() {
  return $('a[title="package.json"]').length > 0;
}
