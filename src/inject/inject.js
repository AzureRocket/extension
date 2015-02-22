chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  if(message.user_cert) {
    var user_cert = message.user_cert;
    localStorage.user_cert = user_cert;
    console.log('frontend has user_cert: ' + user_cert);
  }

  if(message.socket_data) {
    sendResponse('got socket data');
    var msg = '<li>';
    msg += message.socket_data.message;
    if(message.socket_data.command != null) {
      msg += '<span class="command">' +  message.socket_data.command + '</span>';
    } else if (message.socket_data.link) {
      $('#spinner').toggle();
      console.log(message.socket_data.link);
      window.setTimeout(function() {
        window.open(message.socket_data.link, '_blank');
      }, 5000)
    }
    msg += '</li>';
    $('#broadcasts').append(msg);

  }
});

$(document).ready(function(){

  if(isNode) {
    $(".only-with-full-nav").append('<a href="#" class="minibutton sidebar-button" id="append"><span class="octicon octicon-rocket rocket"></span> Deploy to Azure</a>');
    var projName = $('meta[name="octolytics-dimension-user_login"]').attr('content');
    $('body').append('<div id="toggle" style="display: none;"><div class="modal"></div><div id="content"><h1><img src="http://i.imgur.com/VsFDAwy.gif" style="display: none" id="spinner">Deploying ' + projName + '</h1><ul id="broadcasts"></ul></div>');
    var relPath = $('meta[name="octolytics-dimension-repository_network_root_nwo"]').attr('content');
    var git = "https://github.com/" + relPath + ".git";
    var name = $('.js-current-repository').text();
    var cert = localStorage.user_cert; //file
    $('#append').click(function() {
      $('#toggle').toggle();
      $('#spinner').toggle();
      console.log('sending message');
      chrome.runtime.sendMessage({git: git, cert: cert }, function(res) {
        console.log(res);
      })
    });
    $('.modal').click(function() {
      $('#toggle').fadeOut(400);
    });
  }
});

function isNode() {
  return $('a[title="package.json"]').length > 0;
}
