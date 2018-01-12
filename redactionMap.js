const redactionMap = {
  'www.linkedin.com': [
    {
      description: 'Main candidate profile name',
      selector: '.pv-top-card-section__name',
      replacement: {
        type: 'text',
        value: '[Name]'
      }
    },
    {
      selector: '.pv-top-card-section__image',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: '/favicon.ico'
      }
    },
    {
      description: 'People Also Viewed...',
      selector: '.pv-browsemap-section__member-container.mt4 img',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: '/favicon.ico'
      }
    },
    {
      description: 'own profile avatar',
      selector: '.profile-photo-edit__preview',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: '/favicon.ico'
      }
    },
    {
      description: 'Names in Search Results on https://www.linkedin.com/search/results/index/',
      selector: '.name.actor-name',
      replacement: {
        type: 'text',
        value: '[Name]'
      }
    },
    {
      description: 'Photos in Search Results on https://www.linkedin.com/search/results/index/',
      selector: '.search-result__image img',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: '/favicon.ico'
      }
    }
  ],
  'angel.co': [
    {
      selector: '.title.u-fontSize14.u-colorGray3', // shouldn't use a "styling" class to identify this element
      replacement: {
        type: 'text',
        value: '[Candidate Name]'
      }
    },
    {
      selector: '.photo.s-vgRight0_5 img',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: 'https://angel.co/images/shared/nopic.png'
      },
    },
    {
      selector: '.s-grid-colSm24.u-colorGray3', // shouldn't use a "styling" class to identify this element
      replacement: {
        type: 'text',
        value: 'Intro Note'
      }
    },
    {
      selector: '.name.u-fontSize24.u-fontWeight300.section-title a', // shouldn't use a "styling" class to identify this element
      replacement: {
        type: 'text',
        value: '[Candidate Name]'
      }
    },
    {
      selector: '.field-row-val.s-flexgrid-colSmW.s-vgPadLeft1 a',
      replacement: {
        type: 'text',
        value: '[Candidate Email]'
      }
    },
    {
      selector: '.js-browse-table-row-name.s-vgRight0_5.candidate-name.u-floatLeft a',
      replacement: {
        type: 'text',
        value: '[Candidate Name]'
      }
    },
    {
      selector: '.photo.js-add-photo img',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: 'https://angel.co/images/shared/nopic.png'
      },
    },
  ],
}
