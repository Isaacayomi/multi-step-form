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

// Input Fields
const inputs = document.querySelectorAll("input");
const inputName = document.querySelector(".name__field");
const inputEmail = document.querySelector(".email__field");
const inputNumber = document.querySelector(".phone__field");

// Error message
const errMsg = document.querySelectorAll(".error__msg");
const nameErr = document.querySelector(".name__err");
const emailErr = document.querySelector(".email__err");
const phoneErr = document.querySelector(".phone__err");

// Buttons
const nextBtn = document.querySelector(".next__btn");
const prevBtn = document.querySelector(".previous__btn");

const hideAllPages = () => {
  pageArray.forEach((page) => (page.style.display = "none"));
};

buttons.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllPages();
    pageArray[i].style.display = "block";

    // Remove the active class from all buttons
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add the active class to only clicked buttons
    btn.classList.add("active");
  });
});

const validateInputFields = () => {
  let hasError = false; // Tracks if there is any error on either of the input fields

  inputs.forEach(function (input, i) {
    if (input.value.trim().length === 0) {
      if (errMsg[i]) {
        errMsg[i].style.display = "block";
        input.style.border = "1px solid red";
        hasError = true;
      }
    } else {
      if (errMsg[i]) {
        errMsg[i].style.display = "none";
        input.style.border = "1px solid #d6d9e6";
        hasError = false;
      }
    }
  });

  //Validate mail
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!inputEmail.value.match(mailformat)) {
    emailErr.style.display = "block";
    hasError = true;
  } else {
    emailErr.style.display = "none";
    hasError = false;
  }

  // If there are no errors, proceed
  if (!hasError) {
    page1.style.display = "none";
    page2.style.display = "block";
    btn1.classList.remove("active");
    btn2.classList.add("active");
  } else {
    console.log("There are some errors in the form.");
  }

  return;
};

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  validateInputFields();
});

toggleBtn.addEventListener("click", () => {
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
