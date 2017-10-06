
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  alert('clicked');
  //chrome.browserAction.setBadgeText('ON');
  // console.log('Turning ' + tab.url + ' red!');
  // chrome.tabs.executeScript({
  //   code: 'document.body.style.backgroundColor="red"'
  //});
  alert('sending message hello');
  try{
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    alert(response.farewell);
  });
}catch(err) {
  alert(err);
}
});

chrome.tabs.executeScript({
  code: 'document.body.style.backgroundColor="green"'
});
