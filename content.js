let hide = true

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.action === 'icon_click') {
      hide = !hide
      parsePage()
    }
  }
)

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
}

function unredactElement(element, replacementRule) {
  if (replacementRule.type === 'text') {
    element.textContent = element.getAttribute('data-linkedincognito-textcontent')
    element.removeAttribute('data-linkedincognito-textcontent')
  } else if (replacementRule.type === 'attribute') {
    const attributeKey = `data-linkedincognito-${replacementRule.attribute}`
    element.setAttribute(replacementRule.attribute, element.getAttribute(attributeKey))
    element.removeAttribute(attributeKey)
  } else {
    throw new Error(`Unrecognized replacment rule type ${replacementRule.type}`)
  }
}

function redactElement(element, replacementRule) {
  if (replacementRule.type === 'text') {
    const redactedTextContent = element.getAttribute('data-linkedincognito-textcontent')

    if ([null, 'null', replacementRule.value].includes(redactedTextContent)) {
      element.setAttribute('data-linkedincognito-textcontent', element.textContent)
    }

    if (element.textContent !== replacementRule.value) {
      element.textContent = replacementRule.value
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
}

function observe() {
  // select the target node
  var [target] = document.getElementsByTagName('body')

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
