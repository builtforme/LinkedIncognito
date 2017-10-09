# LinkedIncognito

This chrome extension anonymizes candidate profiles to reduce unconscious bias. It currently works on:

* `https://angel.co/<company>/track/candidate/<candidate_id>/<candidate_name>`
* `https://angel.co/<company>/track`
* `https://www.linkedin.com/in/<profile>`
* `https://www.linkedin.com/search/results/index/?keywords=<keywords>&origin=GLOBAL_SEARCH_HEADER`
* `https://www.linkedin.com/in/<yourself>`

On the AngelList candidate tracker, it turns

![candidate](https://user-images.githubusercontent.com/1891931/31203600-b0dd9320-a91c-11e7-8ca1-5e18161911cb.png)

into

![anonymized candidate](https://user-images.githubusercontent.com/1891931/31203603-b3170b1c-a91c-11e7-9ab4-340040f3f196.png)

On LinkedIn profile pages, it turns

![person](https://user-images.githubusercontent.com/1891931/31356825-48e4a502-acf4-11e7-96fb-abf310bb3f9b.png)

into

![anonymized person](https://user-images.githubusercontent.com/1891931/31356820-4681f6fc-acf4-11e7-983b-6403937c9eff.png)

## Installation
Install from the [Chrome Web Store](https://chrome.google.com/webstore/detail/linkedincognito/apbdolccmcggapjblmblmmkldklpdbbg).

## Development
Install from a local checkout by performing these steps:

1. Clone this repo locally <br /> `git clone https://github.com/builtforme/LinkedIncognito.git`
1. In Chrome, go to `chrome://extensions`
1. Check "Developer mode"
1. Click "Load unpacked extension..."
1. Find and select the LinkedIncognito directory created from step 1

### Deployment
Only BuiltForMe can deploy to the Chrome Web Store.

1. Appropriately update the version number in `manifest.json`.
1. Generate a zip file by running `zip li.zip *.png *.js *.json`
1. Upload to Chrome Web Store
