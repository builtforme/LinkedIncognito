let hide = true;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'icon_click') {
      hide = !hide;
      console.log('New value of hide: ', hide);
      redact();
    }
  }
);

const redactionMap = {
  'angel.co': [
    {
      type: 'class',
      selector: 'title u-fontSize14 u-colorGray3',
      replacement: {
        type: 'text',
        value: '[Candidate Name]'
      }
    },
    {
      type: 'class',
      selector: 'photo s-vgRight0_5',
      replacement: {
        type: 'childElement-attribute',
        childElementTag: 'img',
        childElementAttribute: 'src',
        value: 'https://angel.co/images/shared/nopic.png'
      }
    },
    {
      type: 'class',
      selector: 's-grid-colSm24 u-colorGray3',
      replacement: {
        type: 'text',
        value: 'Intro Note'
      }
    },
    {
      type: 'class',
      selector: 'name u-fontSize24 u-fontWeight300 section-title',
      replacement: {
        type: 'childElement-text',
        childElementTag: 'a',
        value: '[Candidate Name]'
      }
    },
    {
      type: 'class',
      selector: 'field-row-val s-flexgrid-colSmW s-vgPadLeft1',
      replacement: {
        type: 'childElement-text',
        childElementTag: 'a',
        value: '[Candidate Email]'
      }
    },
    {
      type: 'class',
      selector: 'js-browse-table-row-name s-vgRight0_5 candidate-name u-floatLeft',
      replacement: {
        type: 'childElement-text',
        childElementTag: 'a',
        value: '[Candidate Name]'
      }
    },
    {
      type: 'class',
      selector: 'photo js-add-photo',
      replacement: {
        type: 'childElement-attribute',
        childElementTag: 'img',
        childElementAttribute: 'src',
        value: 'https://angel.co/images/shared/nopic.png'
      }
    },
  ],
};

const redactors = Object.create(null);
redactors["class"] = function(redaction) {
  const elements = document.getElementsByClassName(redaction.selector);
  for (const e of elements) {
    if (hide) {
      redactElement(e, redaction.replacement);
    } else {
      unredactElement(e, redaction.replacement);
    }
  }
};

function redact() {
  const redactions = redactionMap[document.domain];
  redactions.forEach(r => {
    if (!(r.type in redactors)) {
      throw new Error(`Unrecognized selector type: ${redactions[i].type}`);
    }
    redactors[r.type](r);
  });
}

function unredactElement(element, replacementRule) {
  console.log('Now unredacting element ', element);
  // Don't touch re-redact elements we processed previously
  if (element.getAttribute('data-processed') === hide) {
    return;
  }

  // Mark this element as having been processed.
  element.setAttribute('data-processed', hide);

  // Save the original value to allow for un-redaction
  element.setAttribute('data-original-replacement-rule', replacementRule.type);
  if (replacementRule.type === 'text') {
    element.textContent = element.getAttribute('data-original-value');
  } else if (replacementRule.type === 'childElement-text') {
    // var innerElements = element.getElementsByTagName(replacementRule.childElementTag);
    // innerElements[0].setAttribute('data-original-value', innerElements[0].textContent);
    // innerElements[0].textContent = replacementRule.value;
  } else if (replacementRule.type === 'childElement-attribute') {
    // var innerElements = element.getElementsByTagName(replacementRule.childElementTag);
    // innerElements[0].setAttribute('data-original-value', innerElements[0].getAttribute(replacementRule.childElementAttribute));
    // innerElements[0].setAttribute('data-original-attribute', replacementRule.childElementAttribute);
    // innerElements[0].setAttribute(replacementRule.childElementAttribute, replacementRule.value);
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
  element.setAttribute('data-original-replacement-rule', replacementRule.type);
  if (replacementRule.type === 'text') {
    if (element.getAttribute('data-original-value') === null) {
      element.setAttribute('data-original-value', element.textContent);
    }
    element.textContent = replacementRule.value;
  } else if (replacementRule.type === 'childElement-text') {
    var innerElements = element.getElementsByTagName(replacementRule.childElementTag);
    if (element.getAttribute('data-original-value') === null) {
      innerElements[0].setAttribute('data-original-value', innerElements[0].textContent);
    }
    innerElements[0].textContent = replacementRule.value;
  } else if (replacementRule.type === 'childElement-attribute') {
    var innerElements = element.getElementsByTagName(replacementRule.childElementTag);
    if (element.getAttribute('data-original-value') === null) {
      innerElements[0].setAttribute('data-original-value', innerElements[0].getAttribute(replacementRule.childElementAttribute));
      innerElements[0].setAttribute('data-original-attribute', replacementRule.childElementAttribute);
    }
    innerElements[0].setAttribute(replacementRule.childElementAttribute, replacementRule.value);
  } else {
    throw new Error(`Unrecognized replacment rule type ${replacementRule.type}`)
  }
}

function observe() {
  // select the target node
  var target = document.getElementsByTagName('body')[0];

  // create an observer instance
  var observer = new MutationObserver(mutations => {
    redact();
  });
  observer.observe(target, { childList: true, subtree: true });
}



redact();
observe();
