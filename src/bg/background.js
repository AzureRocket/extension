chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'github.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

var socket = io.connect('http://rocketazure.cloudapp.net/');
socket.on('message', function (data) {
  console.log(data.message);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {socket_data: data}, function(response) {
      console.log(response);
    });
  });
});
//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
  
  if(message.user_cert) {
    var user_cert = message.user_cert;
    sendResponse('got it');
    console.log('sent response, have ' + user_cert);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {user_cert: user_cert}, function(response) {
        console.log(response);
      });
    });
  }

  if(message.git) {
    console.log('got the user cert');
    sendResponse('background recieved the message');
    if (message.cert && message.git) {
      socket.emit('send', {certificate: message.cert, github: message.git});
    } else {
      console.log("Error: need a cet and github");
    }

  }
});

