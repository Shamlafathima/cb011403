


// Function display saved summary data


function displaySummaryData() {
    const summaryData = JSON.parse(localStorage.getItem("summaryData"));
  
    if (summaryData) {
      document.getElementById("current-date").textContent = summaryData.currentDate;
      document.getElementById("selected_time").textContent = summaryData.selectedTime;
      document.getElementById("selected_duration").textContent = summaryData.selectedDuration;
  
       // Update ticket count cells
       document.getElementById("sl-adult").textContent = (summaryData.slAdultCount || 0) + " SL Adult";
       document.getElementById("sl-child").textContent = (summaryData.slChildCount || 0) + " SL Child";
       document.getElementById("foreigner-adult").textContent = (summaryData.foreignAdultCount || 0) + " Foreign Adult";
       document.getElementById("foreigner-child").textContent = (summaryData.foreignChildCount || 0) + " Foreign Child";
       document.getElementById("infant").textContent = (summaryData.infantCount || 0) + " Infant";
  
      // Update ticket price cells
      document.getElementById("sl_adult_ticketprice").textContent ="$" + summaryData.slAdultPrice;
      document.getElementById("sl_child_ticketprice").textContent ="$" + summaryData.slChildPrice;
      document.getElementById("foreign_adult_ticketprice").textContent ="$" + summaryData.foreignAdultPrice;
      document.getElementById("foreign_child_ticketprice").textContent ="$" + summaryData.foreignChildPrice;
      document.getElementById("infant_ticketprice").textContent = "Free";
  
      // Update total price
      document.getElementById("total_price").textContent = "$" + summaryData.totalPrice;
    }
  }
  
  // Call the function to display saved summary data
  displaySummaryData();
  

// Function to validate card number
function validateCardNumber(cardNumber) {
    const cardNumberInput = document.querySelector("#card_number");
    const cardNumberValidationMsg = document.querySelector("#card-number-validation-msg");

    if (!/^\d{12}$/.test(cardNumber)) {
        cardNumberValidationMsg.textContent = "Card number must have 12 digits";
        cardNumberValidationMsg.style.color = "red";
        cardNumberInput.style.borderColor = "red";
        return false;
    } else {
        cardNumberValidationMsg.textContent = "";
        cardNumberValidationMsg.style.color = "";
        cardNumberInput.style.borderColor = "";
        return true;
    }
}

const cardNumberInput = document.querySelector("#card_number");
cardNumberInput.addEventListener("input", function () {
    validateCardNumber(this.value);
});

//expiry date validation
document.addEventListener("DOMContentLoaded", function () {
    const expiryDateInput = document.getElementById("expiration_date");
    const expiryValidationMsg = document.getElementById("expiry-validation-msg");

    expiryDateInput.addEventListener("input", function () {
        const enteredDateParts = this.value.split("/");
        
        if (enteredDateParts.length === 2) {
            const enteredMonth = parseInt(enteredDateParts[0], 10);
            let enteredYear = parseInt(enteredDateParts[1], 10);
            
            // Convert two-digit year to four-digit year
            if (enteredYear < 100) {
                const currentYear = new Date().getFullYear();
                const currentCentury = Math.floor(currentYear / 100) * 100;
                enteredYear += currentCentury;
            }
            
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            
            if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
                expiryValidationMsg.textContent = "Your card is too old";
                expiryValidationMsg.style.color = "red";
                expiryDateInput.style.borderColor = "red";
            } else {
                expiryValidationMsg.textContent = "";
                expiryDateInput.style.borderColor = "";
            }
        } else {
            expiryValidationMsg.textContent = "Invalid date format";
            expiryValidationMsg.style.color = "red";
            expiryDateInput.style.borderColor = "red";

        }
    });
});


//CVV number validation
document.addEventListener("DOMContentLoaded", function () {
    const cvvInput = document.getElementById("cvv");
    const cvvValidationMsg = document.getElementById("cvv-validation-msg");

    cvvInput.addEventListener("input", function () {
        const enteredCvv = this.value;

        if (enteredCvv.length === 0) {
            cvvValidationMsg.textContent = "";
        } else if (enteredCvv.length < 3) {
            cvvValidationMsg.textContent = "Incomplete CVV";
            cvvValidationMsg.style.color = "red";
            cvvInput.style.borderColor = "red";
        } else if (!/^\d{3}$/.test(enteredCvv)) {
            cvvValidationMsg.textContent = "Invalid input";
            cvvValidationMsg.style.color = "red";
            cvvInput.style.borderColor = "red";
        } else {
            cvvValidationMsg.textContent = "";
            cvvInput.style.borderColor ="";
        }
    });
});


//name validation
document.addEventListener("DOMContentLoaded", function () {
    const cardholderInput = document.getElementById("cardholder");
    const cardholderValidationMsg = document.getElementById("cardholder-validation-msg");

    cardholderInput.addEventListener("input", function () {
        const enteredName = this.value;

        if (enteredName.length === 0) {
            cardholderValidationMsg.textContent = "";
        } else if (!/^[a-zA-Z\s]+$/.test(enteredName)) {
            cardholderValidationMsg.textContent = "Name contains invalid characters";
            cardholderValidationMsg.style.color ="red";
            cardholderInput.style.borderColor = "red";

        } else {
            cardholderValidationMsg.textContent = "";
            cardholderInput.style.borderColor = "";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const totalPrice = JSON.parse(localStorage.getItem("summaryData")).totalPrice;

    const payButton = document.querySelector(".button_container2 button");
    payButton.textContent = "Pay $" + totalPrice;
});

document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.querySelector("form");

    paymentForm.addEventListener("submit", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Check if all validation messages are empty
        const validationMessages = [
            document.getElementById("card-number-validation-msg").textContent,
            document.getElementById("expiry-validation-msg").textContent,
            document.getElementById("cvv-validation-msg").textContent,
            document.getElementById("cardholder-validation-msg").textContent
        ];

        const allValid = validationMessages.every(message => message === "");

        if (allValid) {
            // Redirect to index_confirmation.html
            window.location.href = "index_confirmation.html";
        } else {
            alert("Please fill in all required fields correctly.");
        }
    });
});
