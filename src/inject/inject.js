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
      console.log(message.socket_data.link);
      window.open(message.socket_data.link, '_blank');
    }
    msg += '</li>';
    $('#broadcasts').append(msg);
    $('#broadcasts').find("li:last").slideDown("fast");

  }
});

$(document).ready(function(){

  if(isNode) {
    $(".only-with-full-nav").append('<a href="#" class="minibutton sidebar-button" id="append"><span class="octicon octicon-rocket rocket"></span> Deploy to Azure</a>');
    var projName = $('meta[name="octolytics-dimension-user_login"]').attr('content');
    $('body').append('<section class="modal" style="display: none;"><div id="content"><h1>Deploying ' + projName + '</h1><ul id="broadcasts"></ul></div></section>');
    var relPath = $('meta[name="octolytics-dimension-repository_network_root_nwo"]').attr('content');
    var git = "https://github.com/" + relPath + ".git";
    var name = $('.js-current-repository').text();
    var cert = localStorage.user_cert; //file
    $('#append').click(function() {
      $('.modal').toggle();
      console.log('sending message');
      chrome.runtime.sendMessage({git: git, cert: cert }, function(res) {
        console.log(res);
      })
    });
  }
});

function isNode() {
  return $('a[title="package.json"]').length > 0;
}
