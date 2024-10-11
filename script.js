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
let arcadeBill = document.querySelector(".arcade__plan__price");
let advancedBill = document.querySelector(".advanced__plan__price");
let proBill = document.querySelector(".pro__plan__price");

// Plans
const planCards = document.querySelectorAll(".billings__plan");
const arcardePlan = document.querySelector(".arcarde");
const advancedPlan = document.querySelector(".advanced");
const proPlan = document.querySelector(".pro");

// Add on
const addOnPrice = document.querySelectorAll(".add__ons__selections");

// Buttons
const buttons = document.querySelectorAll(".step__buttons");
const btn1 = document.querySelector(".btn__1");
const btn2 = document.querySelector(".btn__2");
const btn3 = document.querySelector(".btn__3");
const btn4 = document.querySelector(".btn__4");

const toggleBtn = document.querySelector(".toggle");

// Arrays
const pageArray = [page1, page2, page3, page4, page5];
const plansArray = [arcardePlan, advancedPlan, proPlan];

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

// Checkbox
const checkBoxes = document.querySelectorAll(".checkbox");

// Tracks if there is any error on either of the input fields
let hasError = false;

// Current Page Index
let currentPageIndex = 0;

// Page pagination
const showPage = function (pageIndex) {
  // Hide all pages
  pageArray.forEach((page) => (page.style.display = "none"));

  // Show page at provided index
  pageArray[pageIndex].style.display = "block";

  // Update the current page index
  currentPageIndex = pageIndex;

  // Update Go Back button visibility based on the current page
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
  }
  return;
};

const togglePriceBtn = () => {
  toggleBtn.addEventListener("click", () => {
    planCards.forEach((card) => {
      card.style.border = "1px solid #d6d9e6";
    });
    if (!toggleBtn.classList.contains("move__toggle")) {
      toggleBtn.classList.add("move__toggle");
      arcadeBill.textContent = 90;
      advancedBill.textContent = 120;
      proBill.textContent = 150;

      addOnPrice.forEach((price, i) => {
        const addOnPriceEl = price.querySelector("p span.addon__price");
        // console.log(addOnPriceEl.innerText);
        if (i === 0) {
          addOnPriceEl.innerHTML = 10;
        } else {
          addOnPriceEl.innerHTML = 20;
        }
      });
    } else {
      toggleBtn.classList.remove("move__toggle");
      arcadeBill.textContent = 9;
      advancedBill.textContent = 12;
      proBill.textContent = 15;

      addOnPrice.forEach((price, i) => {
        const addOnPriceEl = price.querySelector("p span.addon__price");
        if (i === 0) addOnPriceEl.innerHTML = 1;
        else addOnPriceEl.innerHTML = 2;
      });
    }
  });
};

const billings = () => {
  planCards.forEach(function (bill) {
    bill.addEventListener("click", function (e) {
      // Reset the border of all plan cards first
      planCards.forEach((card) => {
        card.style.border = "1px solid #d6d9e6";
      });

      // Set border to desired color
      bill.style.border = "1px solid #483eff";

      const priceElement = bill.querySelector("p span.plan__price");
      if (priceElement) {
        console.log(priceElement.innerText.trim());
      }
    });
  });
};
billings();

const validatePlanBills = () => {
  let planSelected = false;

  planCards.forEach((card) => {
    const computedBorderColor = window.getComputedStyle(card).borderColor;
    if (
      computedBorderColor === "rgb(72, 62, 255)" ||
      computedBorderColor === "#483eff"
    ) {
      planSelected = true;
    }
  });

  if (planSelected) {
    currentPageIndex = 2; // Allow proceeding to next page
    showPage(currentPageIndex);
  } else {
    currentPageIndex = 1;
    showPage(currentPageIndex);
    console.log("No plan was selected");
  }
};

togglePriceBtn();

const validateCheckBox = () => {
  checkBoxes.forEach((checkBox, i) => {
    if (!checkBox.checked) {
      console.log("Please pick one");
    }
    checkBox.addEventListener("click", function () {
      // Gets the closest parent element of checkbox and the title
      const parentElement = checkBox.closest(".add__ons__selections");
      if (checkBox.checked) {
        const addsPicked = parentElement.querySelector(".add__on p.title").textContent;

        console.log(true, i, addsPicked);
        parentElement.style.border = `1px solid #483eff`;
      } else {
        parentElement.style.border = `1px solid #d6d9e6`;
      }
    });
  });
};

validateCheckBox();

showPage(0);

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentPageIndex === 0) {
    if (validateInputFields()) {
      showPage(1);
    }
  }

  if (currentPageIndex === 1) {
    if (validatePlanBills()) {
      showPage(2);
    }
  }
});

prevBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Show the previous page (e.g., move from page 2 to page 1)
  if (currentPageIndex > 0) {
    showPage(currentPageIndex - 1); // Move to the previous page
  }
});
