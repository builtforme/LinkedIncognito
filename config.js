const sendMessageToActiveTab = (message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
    chrome.tabs.sendMessage(id, message)
  })
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'state') {
    document.querySelector('.count').firstChild.nodeValue = message.count
    document.querySelector('.toggle').checked = message.hide
    document.querySelector('.pause').textContent = message.hide ? '||' : ''
  }
})

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.toggle').addEventListener('click', () => {
    sendMessageToActiveTab({ action: 'toggle' })
  })

  document.querySelector('.pause').addEventListener('click', () => {
    sendMessageToActiveTab({ action: 'pause' })
  })

  sendMessageToActiveTab({ action: 'requestState' })
})
