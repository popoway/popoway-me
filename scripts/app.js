/*!
 * This file is part of popoway-me v2.0.0-alpha.2 (2196bba) (https://popoway.me/)
 * Copyright 2019 The popoway-me Authors (https://github.com/popoway/popoway-me/graphs/contributors)
 * Licensed under the MIT License. (https://github.com/popoway/popoway-me/blob/master/LICENSE)
 */
function readyi18n(t){i18next.use(i18nextXHRBackend).use(i18nextBrowserLanguageDetector).init({fallbackLng:"en",debug:!0,backend:{loadPath:"locales/{{lng}}/{{ns}}.json",crossDomain:!0},ns:["common","portfolio"],defaultNS:"portfolio"},function(t,a){function e(){$("#cookiebanner").localize(),$(".ctrl").localize(),$(".nav").localize(),$(".container-fluid").localize(),$("#WeChatQRPopup").localize()}jqueryI18next.init(i18next,$,{tName:"t",i18nName:"i18n",handleName:"localize",selectorAttr:"data-i18n",targetAttr:"i18n-target",optionsAttr:"i18n-options",useOptionsAttr:!1,parseDefaultValueFromContent:!0}),e(),$(".lang-select").click(function(){i18next.changeLanguage(this.id,function(){e()})})})}$(document).ready(function(){$(this).scrollTop(0),$(".navbar a, footer a[href='#myPage']").on("click",function(t){if(""!==this.hash){t.preventDefault();var a=this.hash;$("html, body").animate({scrollTop:$(a).offset().top},900,function(){window.location.hash=a})}})}),$(window).scroll(function(){$(".slideanim").each(function(){$(this).offset().top<$(window).scrollTop()+600&&$(this).addClass("slide")})}),$(document).ready(function(){$(".img-circle").attr("src","images/avatar_350px.png"),$(".img-circle").attr("srcset","images/avatar_350px.png 1x, images/avatar_700px.png 2x, images/avatar_1050px.png 3x"),$(".wechat-qr").attr("src","images/wechat_300px.png"),$(".wechat-qr").attr("srcset","images/wechat_300px.png 1x, images/wechat_500px.png 1.67x, images/wechat_1000px.png 3.33x")}),$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip()}),$(document).ready(readyi18n);