const sendMessageToActiveTab = (message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
    chrome.tabs.sendMessage(id, message)
  })
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.toggle').addEventListener('click', () => {
    sendMessageToActiveTab({ action: 'toggle' })
  })
})
