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
          memes: "Memes",
          about: "About",
          noSaved: "There are no saved memes currently",
          keywordToSearch: "Type a keyword to search:",
          all: "All",
          funny: "Funny",
          animal: "Animal",
          akward: "Awkward",
          happy: "Happy",
          angry: "Angry",
          imgUpload: "Click to upload",
          footerTitle: "Thanks for using my meme generator",
          footerContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla voluptatum sunt commodi quo asperiores porro ex, nam itaque at.",

          aboutUs: "About Us",
          welcome: "Welcome to our website! We are a team of passionate individuals dedicated to providing valuable information and services to our users.",
          ourMission: "Our Mission",
          positioveExperience: "Our mission is to make a positive impact by delivering high-quality content and creating a user-friendly experience. We strive to meet the needs and expectations of our audience.",
          meet: "Meet the Team",
          johnDoe: "John Doe - Founder and CEO",
          janeSmith: "Jane Smith - Chief Editor",
          bobJohnson: "Bob Johnson - Web Developer",
          contactUs: "Contact Us",
          questions: "If you have any questions or feedback, feel free to contact us at",




        }
      },
      he: {
        translation: {
          gallery: "גלריה",
          memes: "ממים",
          about: "אודות",
          noSaved: "אין ממים שמורים כרגע",
          keywordToSearch: "הקלד מילת מפתח",
          all: "הכל",
          funny: "מצחיק",
          animal: "חיות",
          akward: "מביך",
          happy: "שמח",
          angry: "כועס",
          imgUpload: "העלה תמונה",
          footerTitle: "תודה שהשתמשתם ביוצר הממים שלי",
          footerContent: "תודה רבה שביקרתם בעמוד היה היה היה נעים מאוד להכיר",


          // about us section
          aboutUs: "אודותינו",
          welcome: "ברוך הבא לאתר שלנו! אנחנו צוות של אנשים נלהבים המוקדשים לספק מידע ושירותים בעלי ערך למשתמשים שלנו.",
          ourMission: "המשימה שלנו",
          positioveExperience: "המשימה שלנוהמשימה שלנו היא להשפיע לטובה על ידי אספקת תוכן באיכות גבוהה ויצירת חוויה ידידותית למשתמש. אנו שואפים לענות על הצרכים והציפיות של הקהל שלנו.",
          meet: "הכירו את הצוות שלנו",
          johnDoe: `ג'ון דו - מייסד ומנכ"ל`,
          janeSmith: `ג'יין סמית' - עורכת ראשית`,
          bobJohnson: `בוב ג'ונסון - מפתח אתרים`,
          contactUs: "צור קשר",
          questions: "אם יש לך שאלות או משוב, אל תהסס לפנות אלינו בכתובת ",

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
