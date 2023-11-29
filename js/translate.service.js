'use strict'

window.i18next = i18next || {}

function init() {

  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {

        }
      },
      he: {
        translation: {
         
        }
      },

    }
  })
}


init()

function setLang(lang) {
  i18next.changeLanguage(lang)
  translate()
}

function translate() {
  const els = document.querySelectorAll('[data-trans]')
  els.forEach(el => {
    const transKey = el.dataset.trans
    const trans = i18next.t(transKey)
    el.innerText = trans
  })
}
