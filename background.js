
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: 'icon_click'}, function() {})
  })
})
