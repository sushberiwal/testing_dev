// npm install puppeteer
// pamico3332@nic58.com
// 12345678
const puppeteer = require("puppeteer");

let tab;

// puppeteer ke functions hme pending promise dete hhain hmesha
// browser
let pendingBrowser = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args : ["--start-maximized"]
});
pendingBrowser
  .then(function (browser) {
    // pending pages => all the tab open in the browser
    let pendingPages = browser.pages();
    return pendingPages;
  })
  .then(function (pages) {
    let page = pages[0];
    tab = page;
    let pageOpenedPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenedPromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-1" , "pamico3332@nic58.com");
    return idTypedPromise;
  })
  .then(function(){
      let pwTypedPromise = tab.type("#input-2","12345678");
      return pwTypedPromise;
  })
  .then(function(){
     let loginBtnClickedPromise =  tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
     return loginBtnClickedPromise;
  })
  .then(function(){
      console.log("logged in");
  })
