const billInput = document.getElementById("bill-input");
const customTip_input = document.getElementById("customTip-input");
const peopleNumber_input = document.getElementById("peopleNum-input");
const tipAmount_text = document.getElementById("tip-amount");
const tipTotal_text = document.getElementById("tip-total");
const resetBtn = document.getElementById("reset-btn");
const tipPercentage_input = document.querySelectorAll(".tipPercentage-input");
const customTipInput = document.getElementById("customTip-input");
const bill_Container = document.querySelector(".bill-container");
const peopleNum_Container = document.querySelector(".peopleNum-container");
const percentage_btn_container = document.querySelectorAll(
  ".percentage-btn-container"
);

// UNCHECK TIP PERCENTAGE BTN IF THE USER CLICKS ON THE TIP CUSTOM INPUT

customTipInput.addEventListener("click", function () {
  tipPercentage_input.forEach((element) => {
    element.checked = false;
  });
});

// PROCCESS VARIABLES
// 1
let billValue;
//2
let newTipPercentageValue;
//2
let tipPercentage;
//3
let peopleNumber;
//4
let tipAmount;
//5
let total;


                         // MAIN FUNCTIONS AND LOGIC


// GET THE BILL VALUE & UPDATE THE 'billValue' VARIABLE

billInput.addEventListener("input", function updateBillValue() {
  billValue = billInput.value;

  if (peopleNumber == undefined) {
    total == "";
  } else {
    updateTotalMoney();
  }
  updateTipAmount();
  inputValidation(billValue, 1, bill_Container);
});

// GET THE CUSTOM TIP PERCENTAGE FROM THE INPUT & UPDATE THE 'newtippercentagevalue' VARIABLE

customTipInput.addEventListener("input", function () {
  newTipPercentageValue = customTipInput.value;
  if (isNaN(newTipPercentageValue)) {
    newTipPercentageValue == "";
  } else if (newTipPercentageValue.length > 2) {
    customTipInput.value = newTipPercentageValue.slice(0, 2);
  } else {
    newtipPercentage();
  }
  inputValidation(newTipPercentageValue, 2, customTip_input);
  clearTipBtnValidation();
});

// GET THE TIP PERCENTAGE FROM 'BUTTONS %'  & UPDATE THE 'newtippercentagevalue' VARIABLE

tipPercentage_input.forEach((element) => {
  element.addEventListener("click", function () {
    const selected = document.querySelector(
      'input[name="tipPercentage"]:checked'
    );
    newTipPercentageValue = selected.value;
    newtipPercentage();

    // clear text, message, borderColor of customTipinput when the user clicks on a btn percentage
    cleatInputValidation(customTip_input, customTipMessage);
    
    // clear red border when checked
    clearTipBtnValidation(); 
  });
});

// UPDATE THE 'tipPercentage' VARIABLE

function newtipPercentage() {
  tipPercentage = newTipPercentageValue;

  if (billValue == undefined) {
    console.log("billValue not available");
    // setErrorMessage(1,"Cant't be Zero")
  } else {
    updateTipAmount();
  }
  if (peopleNumber !== undefined) {
    updateTotalMoney(); 
  } else {
    console.log("people number is required");
  }
}

// PRINT THE TIP AMOUNT VALUE IN THE CARD

function updateTipAmount() {
  if (isNaN(billValue) || isNaN(tipPercentage)) {
    tipAmount == undefined;
  } else if (billValue !== undefined && tipPercentage !== undefined) {
    tipAmount = billValue * (tipPercentage * 0.01);
    tipAmount_text.innerText = tipAmount.toFixed(1); // toFixed method to get one decimal number after the dot
  } else {
    console.log("bill or tip percentage error");
  }
}

// GET PEOPLE NUMBER FROM THE INPUT & UPDATE THE 'peopleNumber' VARIABLE

peopleNumber_input.addEventListener("input", function () {
  peopleNumber = peopleNumber_input.value;
  if (isNaN(peopleNumber)) {
    peopleNumber = "";
  } else {
    updateTotalMoney();
  }
  if (billValue == undefined) {
    bill_Container.style.border = "1px solid red";
    setErrorMessage(1, "Cant't be blank");
  }
  if (newTipPercentageValue == undefined) {
    //INFORM THE USER TO FILL THE BILL INPUT AND SELECT OR WRITE A TIP PERCENTAGE BY A MESSAGE 1 & REDBORDERCOLOR
    setErrorMessage(2, "Select tip %");
    redBorder(customTip_input);
    redBorder(percentage_btn_container);
  }
  inputValidation(peopleNumber, 3, peopleNum_Container);
});

// PRINT  THE TOTAL MONEY VALUE IN THE CARD

function updateTotalMoney() {
  if (tipAmount !== undefined) {
    total = tipAmount * peopleNumber;
    tipTotal_text.innerText = total.toFixed(1);
  } else {
    console.log("there is no tipAmount");
  }
}

                       // VALIDATION FUNCTIONS


const billMessage = document.getElementById("billMessage");
const peopleNumberMessage = document.getElementById("pepleNum-message");
const customTipMessage = document.getElementById("selectTip-message");


// PRINT ERROR MESSAGE FOR SPECIFIC INPUT


function setErrorMessage(num, message) {
  switch (num) {
    case 1:
      billMessage.innerText = message;
      break;
    case 2:
      customTipMessage.innerText = message;
      break;
    case 3:
      peopleNumberMessage.innerText = message;
      break;
  }
}

//FOR THE INPUT RED BORDER COLOR INDICATING ERROR

function redBorder(input) {
  switch (true) {
    case input == bill_Container:
      bill_Container.style.border = "1px solid red";
      break;
    case input == customTip_input:
      customTip_input.style.border = "1px solid red";
      break;
    case input == peopleNum_Container:
      peopleNum_Container.style.border = "1px solid red";
      break;
    case input == percentage_btn_container:
      percentage_btn_container.forEach((element) => {
        element.style.border = "2px solid red";
      });
      break;
  }
}

//FOR THE INPUT green BORDER COLOR INDICATING success

function greenBorder(input) {
  switch (true) {
    case input == bill_Container:
      bill_Container.style.border = "1px solid green";
      billMessage.innerText = ""; // delete the ERROR message 
      break;
    case input == customTip_input:
      customTip_input.style.border = "1px solid green";
      customTipMessage.innerText = "";
      break;
    case input == peopleNum_Container:
      peopleNum_Container.style.border = "1px solid green";
      peopleNumberMessage.innerText = "";
      break;
  }
}

// CLEAR INPUT VALIDATION 

function cleatInputValidation(input, errorMessageContainer) {
  input.value = "";
  input.style.border = "none";
  customTipMessage.innerText = "";
}

// CLEAR THE SELECT TIP BOTTONS RED BORDER COLOR

function clearTipBtnValidation() {
  percentage_btn_container.forEach((element) => {
    element.style.border = "none";
  });
}


// INPUTS VALIDATION


function inputValidation(value, caseNum, input) {
  if (!value) {
    setErrorMessage(caseNum, "Cant't be blank");
    redBorder(input);
  } else if (value == 0) {
    setErrorMessage(caseNum, "Cant't be zero");
    redBorder(input);
  } else if (isNaN(value)) {
    setErrorMessage(caseNum, "Wrong format");
    redBorder(input);
  } else {
    greenBorder(input);
  }
}


                         // RESET FUNCTION

// RESET EVERY THING IN THE CARD

resetBtn.addEventListener("click", function () {
  tipTotal_text.innerText = 0;
  tipAmount_text.innerText = 0;
  billInput.value = "";
  customTipInput.value = "";
  peopleNumber_input.value = "";
  tipPercentage_input.forEach((element) => {
    element.checked = false;
  });
  billValue = undefined;
  tipPercentage = undefined;
  peopleNumber = undefined;
  tipAmount = undefined;
  total = undefined;
  newTipPercentageValue = undefined;
});
