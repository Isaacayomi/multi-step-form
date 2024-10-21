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
let arcardePlanPriceDuration = document.querySelector(
  ".arcarde__plan__price__duration"
);
let proPlanPriceDuration = document.querySelector(
  ".pro__plan__price__duration"
);
let advancedPlanPriceDuration = document.querySelector(
  ".advanced__plan__price__duration"
);

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

const bonusPlan = document.querySelectorAll(".bonus__plan");

// console.log(bonusPlan)
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

// Summary field
const planSelected = document.querySelector(".selected__plan");
const durationSelected = document.querySelector(".selected__duration");
const addsOnDuration = document.querySelectorAll(".addons__duration");

const finalPriceDuration = document.querySelector(".final__price__duration");
const finalPrice = document.querySelector(".price");

let selectedServices = document.querySelector(".selected__services");

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

    const isYearly = !toggleBtn.classList.contains("move__toggle");

    if (isYearly) {
      toggleBtn.classList.add("move__toggle");

      arcadeBill.textContent = 90;
      advancedBill.textContent = 120;
      proBill.textContent = 150;

      arcardePlanPriceDuration.textContent = "yr";
      proPlanPriceDuration.textContent = "yr";
      advancedPlanPriceDuration.textContent = "yr";

      addsOnDuration.forEach((addsonduration) => {
        addsonduration.innerHTML = "yr";
      });

      bonusPlan.forEach((bonusplan) => {
        bonusplan.style.display = "block";
      });

      addOnPrice.forEach((price, i) => {
        const addOnPriceEl = price.querySelector("p span.addon__price");
        addOnPriceEl.innerHTML = i === 0 ? 10 : 20;
      });
    } else {
      toggleBtn.classList.remove("move__toggle");

      arcadeBill.textContent = 9;
      advancedBill.textContent = 12;
      proBill.textContent = 15;

      arcardePlanPriceDuration.textContent = "mo";
      proPlanPriceDuration.textContent = "mo";
      advancedPlanPriceDuration.textContent = "mo";

      addsOnDuration.forEach((addsonduration) => {
        addsonduration.innerHTML = "mo";
      });

      bonusPlan.forEach((bonusplan) => {
        bonusplan.style.display = "none"; // Hide yearly bonuses
      });

      addOnPrice.forEach((price, i) => {
        const addOnPriceEl = price.querySelector("p span.addon__price");
        addOnPriceEl.innerHTML = i === 0 ? 1 : 2;
      });
    }

    summary();
  });
};

const billings = () => {
  planCards.forEach(function (bill) {
    bill.addEventListener("click", function (e) {
      planCards.forEach((card) => {
        card.style.border = "1px solid #d6d9e6";
      });

      bill.style.border = "1px solid #483eff";

      const priceElement1 = bill.querySelector("p span.plan__price");
      const priceElement2 = bill.querySelector(".bill").innerText;
      console.log(planSelected.innerHTML);
      console.log(durationSelected.innerHTML);
      if (priceElement1) {
        planSelected.innerHTML = priceElement2;
        console.log(priceElement1.innerText.trim());
        if (priceElement1.innerText.trim().length > 2) {
          durationSelected.innerHTML = ` (Yearly)`;
          finalPriceDuration.innerHTML = "yr";
          finalPrice.innerHTML = `${priceElement1.innerText.trim()}/yr`;
        } else {
          durationSelected.innerHTML = ` (Monthly)`;
          finalPriceDuration.innerHTML = "mo";
          finalPrice.innerHTML = `${priceElement1.innerText.trim()}/mo`;
        }
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

const calculateTotal = () => {
  // Determine if the toggle is set to yearly or monthly
  const isYearly = toggleBtn.classList.contains("move__toggle");
  let duration = isYearly ? "yr" : "mo";

  // Initialize the total price
  let total = 0;

  // Loop through the selected add-ons to calculate the total price
  selectedAddOns.forEach(({ price }) => {
    total += parseInt(price, 10); // Ensure price is converted to a number
  });

  // Update the total price element
  const totalPriceElement = document.querySelector(".total__price__");
  totalPriceElement.textContent = `$${total}/${duration}`;
};

let addOnsPicked = false;
let addsPicked = "";
let addonPrice = "";

const summary = () => {
  selectedServices.innerHTML = ""; // Clear previous list

  const isYearly = toggleBtn.classList.contains("move__toggle");
  const duration = isYearly ? "yr" : "mo";

  selectedAddOns.forEach(({ title, price }) => {
    let html = `
      <div class="services__selected">
        <p class="service">${title}</p>
        <p class="service__price">+$${price}/<span class="addonprice">${duration}</span></p>
      </div>
    `;

    selectedServices.insertAdjacentHTML("beforeend", html);
  });

  // Calculate and display total price
  calculateTotal();
};

let selectedAddOns = [];
const validateCheckBox = () => {
  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", function () {
      const parentElement = checkBox.closest(".add__ons__selections");
      if (checkBox.checked) {
        const title =
          parentElement.querySelector(".add__on p.title").textContent;
        const price = parentElement.querySelector(".addon__price").textContent;

        // Add to the selected list
        selectedAddOns.push({ title, price });

        // Update addsPicked and addonPrice
        addsPicked = title;
        addonPrice = price;

        parentElement.style.border = `1px solid #483eff`;
        addOnsPicked = true;
      } else {
        // Remove from selected list
        const title =
          parentElement.querySelector(".add__on p.title").textContent;
        selectedAddOns = selectedAddOns.filter((item) => item.title !== title);

        parentElement.style.border = `1px solid #d6d9e6`;
        addOnsPicked = false;
      }

      // Call summary to update view
      summary();
    });
  });
};
validateCheckBox();

const isAnyCheckboxChecked = () => {
  return Array.from(checkBoxes).some((checkBox) => checkBox.checked);
};

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

  if (currentPageIndex === 2) {
    if (isAnyCheckboxChecked()) {
      currentPageIndex = 3;
      showPage(3);
      summary();
    } else {
      console.log("None was selected");
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
