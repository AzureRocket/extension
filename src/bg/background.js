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
});

