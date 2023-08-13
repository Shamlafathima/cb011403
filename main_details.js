

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
  




const emailInput = document.querySelector("#email");
const confirmEmailInput = document.querySelector("#confirm_email");
const emailValidationMsg = document.querySelector("#email-validation-msg");
const confirmEmailValidationMsg = document.querySelector("#confirm-email-validation-msg");


//Email validation
function validateEmail(email, validationMsg) {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        validationMsg.textContent = "Please enter a valid email address";
        validationMsg.style.color = "red";
        emailInput.style.borderColor = "red"
        return false;
    } else {
        validationMsg.textContent = "Your email address is valid";
        validationMsg.style.color = "green";
        emailInput.style.borderColor = "green"
        return true;
    }
}

emailInput.addEventListener("input", function () {
    validateEmail(this.value, emailValidationMsg);
});

//confirm email validation
confirmEmailInput.addEventListener("input", function () {
    if (this.value === emailInput.value) {
        confirmEmailValidationMsg.textContent = "Email addresses match";
        confirmEmailValidationMsg.style.color = "green";
        confirmEmailInput.style.borderColor = "green"
    } else {
        confirmEmailValidationMsg.textContent = "Email addresses do not match";
        confirmEmailValidationMsg.style.color = "red";
        confirmEmailInput.style.borderColor = "red"
    }
});

// Initialize the intl-tel-input plugin
var input = document.querySelector("#phone");
var iti = window.intlTelInput(input, {
    initialCountry: "auto",
    separateDialCode: true,
    preferredCountries: ["us", "gb", "ca"] // You can change these to your preferred countries
});



const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from actually submitting

    // Get all the form field values
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const confirmEmail = document.querySelector('input[name="confirm_email"]').value;
    const gender = document.querySelector('#gender').value;

     // Retrieve the selected country's data from intlTelInput
     const selectedCountryData = iti.getSelectedCountryData();
     const countryCode = selectedCountryData.dialCode; // Get the country code
 

    // Create an object to store the form details
    const formData = {
        name: name,
        phone: phone,
        email: email,
        confirmEmail: confirmEmail,
        gender: gender
    };

    localStorage.setItem("countryCode", countryCode);

    // Save the form data in local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Redirect or display a success message as needed
    alert("Form details have been saved!");

    // Redirect to index_payment.html
    window.location.href = "index_payment.html";
});





