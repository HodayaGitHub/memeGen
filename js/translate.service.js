'use strict'

window.i18next = i18next || {}

function init() {

  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          gallery: "Gallery", 
          memes:"Memes",
          about:"About", 
          noSaved:"There are no saved memes currently", 
          keywordToSearch:"Type a keyword to search:",
          all:"All",
          funny:"Funny",
          animal:"Animal",
          akward:"Akward",
          happy:"Happy",
          angry:"Angry",
          imgUpload:"Click to upload",
          footerTitle:"Thanks for using my meme generator",
          footerContent:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla voluptatum sunt commodi quo asperiores porro ex, nam itaque at.",
        }
      },
      he: {
        translation: {
          gallery: "גלריה", 
          memes:"ממים",
          about:"אודות", 
          noSaved:"אין ממים שמורים כרגע", 
          keywordToSearch:"הקלד מילת מפתח",
          all:"הכל",
          funny:"מצחיק",
          animal:"חיות",
          akward:"מביך",
          happy:"שמח",
          angry:"כועס",
          imgUpload:"העלה תמונה",
          footerTitle:"תודה שהשתמשתם ביוצר הממים שלי",
          footerContent:"תודה רבה שביקרתם בעמוד היה היה היה נעים מאוד להכיר",
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
