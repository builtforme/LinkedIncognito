let hide = true
let timeoutReference = null

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.action === 'toggle') {
      hide = !hide
      clearTimeout(timeoutReference)
      timeoutReference = null
      parsePage()
    } else if (request.action === 'requestState') {
      publishState()
    } else if (request.action === 'pause') {
      pauseRedaction()
    }
  }
)

const pauseRedaction = () => {
  if (!timeoutReference) {
    hide = false
    parsePage()
    timeoutReference = setTimeout(() => {
      hide = true
      parsePage()
      clearTimeout(timeoutReference)
      timeoutReference = null
    }, 10 * 60 * 1000) // pause for 10 minutes
  }
}

const publishState = () => {
  const count = document.querySelectorAll('[data-linkedincognito-element-is-redacted]').length
  chrome.runtime.sendMessage({
    action: 'state',
    count,
    hide,
    paused : timeoutReference ? true : false,
  })
}

const parsePage = () => {
  const redactions = redactionMap[document.domain]
  redactions.forEach(r => {
    const elements = document.querySelectorAll(r.selector)
    for (const e of elements) {
      if (hide) {
        redactElement(e, r.replacement)
      } else {
        unredactElement(e, r.replacement)
      }
    }
  })

  publishState()
}

const unredactElement = (element, replacementRule) => {
  if (replacementRule.type === 'text') {
    const [textNode] = element.childNodes
    textNode.nodeValue = element.getAttribute('data-linkedincognito-textcontent')
    element.removeAttribute('data-linkedincognito-textcontent')
  } else if (replacementRule.type === 'attribute') {
    const attributeKey = `data-linkedincognito-${replacementRule.attribute}`
    element.setAttribute(replacementRule.attribute, element.getAttribute(attributeKey))
    element.removeAttribute(attributeKey)
  } else {
    throw new Error(`Unrecognized replacment rule type ${replacementRule.type}`)
  }

  element.removeAttribute('data-linkedincognito-element-is-redacted')
}

const redactElement = (element, replacementRule) => {
  if (replacementRule.type === 'text') {
    const redactedTextContent = element.getAttribute('data-linkedincognito-textcontent')

    if ([null, 'null', replacementRule.value].includes(redactedTextContent)) {
      element.setAttribute('data-linkedincognito-textcontent', element.textContent)
    }

    const [textNode] = element.childNodes

    if (textNode.nodeValue !== replacementRule.value) {
      textNode.nodeValue = replacementRule.value
    }
  } else if (replacementRule.type === 'attribute') {
    const attributeKey = `data-linkedincognito-${replacementRule.attribute}`
    const redactedAttributeValue = element.getAttribute(attributeKey)

    if ([null, 'null', replacementRule.value].includes(redactedAttributeValue)) {
      element.setAttribute(attributeKey, element.getAttribute(replacementRule.attribute))
    }

    // don't unnecessarily set the attribute, as to not set off a MutationObserver death spiral
    if (element.getAttribute(replacementRule.attribute) !== replacementRule.value) {
      element.setAttribute(replacementRule.attribute, replacementRule.value)
    }
  } else {
    throw new Error(`Unrecognized replacment rule type ${replacementRule.type}`)
  }

  element.setAttribute('data-linkedincognito-element-is-redacted', true)
}

const observe = () => {
  // listen for changes on the entire document. at `document_start` time, only the root node (html) is available
  var [target] = document.getElementsByTagName('html')

  // create an observer instance
  var observer = new MutationObserver(() => {
    if (hide) {
      parsePage()
    }
  })

  observer.observe(target, {
    childList: true,
    subtree: true,
    // if an img's src is lazy-loaded we won't always catch the change with a childList update, so we have to listen for an attribute change
    // currently limited to `src` but may need to include attributes like `style` (for background-image) going forward
    attributes: true,
    attributeFilter: ['src']
  })
}

parsePage()
observe()
