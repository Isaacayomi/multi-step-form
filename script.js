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

// buttons.forEach((btn, i) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     // hideAllPages();
//   });
// });

// Page pagination
let currentPageIndex = 0;
const showPage = function (pageIndex) {
  // Hide all pages
  pageArray.forEach((page) => (page.style.display = "none"));

  // Show page at provided index
  pageArray[pageIndex].style.display = "block";

  // Update the current page index
  currentPageIndex = pageIndex;

  // Update 'Go Back' button visibility based on the current page
  if (currentPageIndex === 0) {
    prevBtn.innerHTML = ""; // Hide 'Go Back' on the first page
  } else {
    prevBtn.innerHTML = "Go Back"; // Show 'Go Back' on other pages
  }

  buttons.forEach((button, i) => {
    button.classList.toggle("active", i === currentPageIndex);
  });
};

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
    if (currentPageIndex < pageArray.length - 1) {
      showPage(currentPageIndex + 1); // Move to the next page
    }
  } else {
    console.log("There are some errors in the form.");
  }

  return;
};

showPage(0);

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

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  validateInputFields();
});

prevBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Show the previous page (e.g., move from page 2 to page 1)
  if (currentPageIndex > 0) {
    showPage(currentPageIndex - 1); // Move to the previous page
  }
});
