/*!
 * smooth-scroll.js - smooth scrolling script of popoway.me (https://popoway.me/)
 * Copyright 2017 popoway. Licensed under the MIT license.
 * (https://github.com/popoway/popoway-me/blob/master/LICENSE)
 */
$(document).ready(function(){
  // Force page scroll position to top at page refresh in HTML
  $(this).scrollTop(0);
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== ""){
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

$(window).scroll(function() {
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slide");
    }
  });
});

// Initialize Bootstrap tooltip
$(document).ready(function(){
  $(".img-circle").attr( "src", "assets/avatar_350px.png" );
  $(".img-circle").attr( "srcset", "assets/avatar_350px.png 1x, assets/avatar_700px.png 2x, assets/avatar_1050px.png 3x" );
});

// ajax load avatar
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Initialize i18next module
function readyi18n( jQuery ) {
  // Code to run when the document is ready.
  //import i18next from 'i18next';
  i18next
    //import Backend from 'i18next-xhr-backend';
    //import LngDetector from 'i18next-browser-languagedetector';
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
      fallbackLng: 'en',
      debug: true,
      backend: {
        // for all available options read the backend's repository readme file
        loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
        crossDomain: true
      },
      ns: ['common', 'portfolio'],
      defaultNS: 'portfolio'
    }, function(err, t) {
      // init set content
      jqueryI18next
        .init(i18next, $, {
          tName: 't', // --> appends $.t = i18next.t
          i18nName: 'i18n', // --> appends $.i18n = i18next
          handleName: 'localize', // --> appends $(selector).localize(opts);
          selectorAttr: 'data-i18n', // selector for translating elements
          targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
          optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
          useOptionsAttr: false, // see optionsAttr
          parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
        });
      // start localizing, details:
      // https://github.com/i18next/jquery-i18next#usage-of-selector-function
      updateContent();
      function updateContent() {
        $('#cookiebanner').localize();
        $('.ctrl').localize();
        $('.nav').localize();
        $('.container-fluid').localize();
        $('#WeChatQRPopup').localize();
      }
      $('.lang-select').click(function() {
        i18next.changeLanguage(this.id, function() {
           updateContent();
        });
      })
    });
}
$(document).ready( readyi18n );
