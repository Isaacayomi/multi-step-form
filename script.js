"use strict";
// Pages
// const pages = document.querySelectorAll("page");
const pages = document.querySelectorAll(".page");
const page1 = document.querySelector(".personal__info");
const page2 = document.querySelector(".plan");
const page3 = document.querySelector(".adds__on");
const page4 = document.querySelector(".summary");
const page5 = document.querySelector(".summary__thanks");

//Bills
let arcadeBill = document.querySelector(".arcade__bill");
let advancedBill = document.querySelector(".advanced__bill");
let proBill = document.querySelector(".pro__bill");

// Buttons
const buttons = document.querySelectorAll(".step__buttons");
const btn1 = document.querySelector(".btn__1");
const btn2 = document.querySelector(".btn__2");
const btn3 = document.querySelector(".btn__3");
const btn4 = document.querySelector(".btn__4");

const toggleBtn = document.querySelector(".toggle");

// Pages
const pageArray = [page1, page2, page3, page4, page5];

const hideAllPages = () => {
  pageArray.forEach((page) => (page.style.display = "none"));
};

buttons.forEach(function (btn, i) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPages();
    pageArray[i].style.display = "block";

    // Remove the active class from all buttons
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });

    // Add the active class to only clicked buttons
    btn.classList.add("active");
  });
});

toggleBtn.addEventListener("click", function () {
  if (!toggleBtn.classList.contains("move__toggle")) {
    toggleBtn.classList.add("move__toggle");
    arcadeBill.textContent = "$90/yr";
    advancedBill.textContent = "$120/yr";
    proBill.textContent = "$150/yr";
  } else {
    toggleBtn.classList.remove("move__toggle");
    arcadeBill.textContent = "$9/mo";
    advancedBill.textContent = "$12/mo";
    proBill.textContent = "$15/mo";
  }
});
