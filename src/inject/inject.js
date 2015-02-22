chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.user_cert) {
    var user_cert = message.user_cert;
    console.log('frontend has user_cert: ' + user_cert);
  }

  if(message.socket_data) {
    sendResponse('got socket data');
    $('#broadcasts').append('<li>' + message.socket_data.hello + '</li>')
  }
});

$(document).ready(function(){

  if(isNode) {
    $(".only-with-full-nav").append('<a href="#" class="minibutton sidebar-button" id="append"><span class="octicon octicon-rocket rocket"></span> Deploy to Azure</a>');
    $('body').append('<section class="modal" style="display: none;"><div id="content"><h1>Look at me!</h1><ul id="broadcasts"></ul></div></section>');
    var zip = $('a[aria-label^=Download]').attr('href');
    var name = $('.js-current-repository').text();
    var cert = null; //file
    $('#append').click(function() {
      $('.modal').toggle();
    });
  }
});

function isNode() {
  return $('a[title="package.json"]').length > 0;
}
