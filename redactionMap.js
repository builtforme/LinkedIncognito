const redactionMap = {
  'www.linkedin.com': [
    {
      type: 'class',
      selector: 'pv-top-card-section__name Sans-26px-black-85%',
      replacement: {
        type: 'text',
        value: '[Name]'
      }
    },
    {
      type: 'class',
      selector: 'pv-top-card-section__image',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: '/favicon.ico'
      }
    },
    {
      description: 'People Also Viewed...',
      type: 'class',
      selector: 'pv-browsemap-section__member-container mt4',
      replacement: {
        type: 'childElement-attribute',
        childElementTag: 'img',
        childElementAttribute: 'src',
        value: '/favicon.ico'
      }
    },
    {
      description: 'own profile avatar',
      type: 'class',
      selector: 'profile-photo-edit__preview',
      replacement: {
        type: 'attribute',
        attribute: 'src',
        value: '/favicon.ico'
      }
    },
    {
      description: 'Names in Search Results on https://www.linkedin.com/search/results/index/',
      type: 'class',
      selector: 'name actor-name',
      replacement: {
        type: 'text',
        value: '[Name]'
      }
    },
    {
      description: 'Photos in Search Results on https://www.linkedin.com/search/results/index/',
      type: 'class',
      selector: 'search-result__image',
      replacement: {
        type: 'childElement-attribute',
        childElementTag: 'img',
        childElementAttribute: 'src',
        value: '/favicon.ico'
      }
    }
  ],
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
      },
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
      },
    },
  ],
};
