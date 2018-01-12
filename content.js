let hide = true

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.action === 'icon_click') {
      hide = !hide
      redact()
    }
  }
)

const redactors = Object.create(null)
redactors['class'] = function(redaction) {
  const elements = document.getElementsByClassName(redaction.selector)
  for (const e of elements) {
    if (hide) {
      redactElement(e, redaction.replacement)
    } else {
      unredactElement(e, redaction.replacement)
    }
  }
}

function redact() {
  const redactions = redactionMap[document.domain]
  redactions.forEach(r => {
    if (!(r.type in redactors)) {
      throw new Error(`Unrecognized selector type: ${r.type}`)
    }
    redactors[r.type](r)
  })
}

function unredactElement(element, replacementRule) {
  // Don't touch re-redact elements we processed previously
  if (element.getAttribute('data-processed') === hide) {
    return
  }

  // Mark this element as having been processed.
  element.setAttribute('data-processed', hide)

  // Save the original value to allow for un-redaction
  element.setAttribute('data-original-replacement-rule', replacementRule.type)
  if (replacementRule.type === 'text') {
    element.textContent = element.getAttribute('data-original-value')
  } else if (replacementRule.type === 'attribute') {
    element.setAttribute(replacementRule.attribute, element.getAttribute('data-original-value'))
  } else if (replacementRule.type === 'childElement-text') {
    let innerElements = element.getElementsByTagName(replacementRule.childElementTag)
    innerElements[0].textContent = innerElements[0].getAttribute('data-original-value')
  } else if (replacementRule.type === 'childElement-attribute') {
    let innerElements = element.getElementsByTagName(replacementRule.childElementTag)
    innerElements[0].setAttribute(replacementRule.childElementAttribute, innerElements[0].getAttribute('data-original-value'))
  } else {
    throw new Error(`Unrecognized replacment rule type ${replacementRule.type}`)
  }
}

function redactElement(element, replacementRule) {
  // Don't touch re-redact elements we processed previously
  // Note that hide is a boolean while getAttribute returns a string.
  // if (element.getAttribute('data-processed') === ('' + hide)) {
  //   return;
  // }

  // Mark this element as having been processed.
  // element.setAttribute('data-processed', hide);

  // Save the original value to allow for un-redaction
  element.setAttribute('data-original-replacement-rule', replacementRule.type)
  if (replacementRule.type === 'text') {
    if (element.getAttribute('data-original-value') === null) {
      element.setAttribute('data-original-value', element.textContent)
    }
    element.textContent = replacementRule.value
  } else if (replacementRule.type === 'attribute') {
    if (element.getAttribute('data-original-value') === null) {
      element.setAttribute('data-original-value', element.getAttribute(replacementRule.attribute))
    }
    element.setAttribute(replacementRule.attribute, replacementRule.value)
  } else if (replacementRule.type === 'childElement-text') {
    let innerElements = element.getElementsByTagName(replacementRule.childElementTag)
    if (innerElements[0].getAttribute('data-original-value') === null) {
      innerElements[0].setAttribute('data-original-value', innerElements[0].textContent)
    }
    innerElements[0].textContent = replacementRule.value
  } else if (replacementRule.type === 'childElement-attribute') {
    let innerElements = element.getElementsByTagName(replacementRule.childElementTag)
    if (innerElements[0].getAttribute('data-original-value') === null
      || innerElements[0].getAttribute('data-original-value') === 'null'
      || innerElements[0].getAttribute('data-original-value') === replacementRule.value) {
      innerElements[0].setAttribute('data-original-value', innerElements[0].getAttribute(replacementRule.childElementAttribute))
      innerElements[0].setAttribute('data-original-attribute', replacementRule.childElementAttribute)
    }
    innerElements[0].setAttribute(replacementRule.childElementAttribute, replacementRule.value)
  } else {
    throw new Error(`Unrecognized replacment rule type ${replacementRule.type}`)
  }
}

function observe() {
  // select the target node
  var target = document.getElementsByTagName('body')[0]

  // create an observer instance
  var observer = new MutationObserver(() => {
    redact()
  })
  observer.observe(target, { childList: true, subtree: true })
}

redact()
observe()
