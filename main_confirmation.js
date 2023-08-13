// Function to display saved summary data
function displaySummaryData() {
}

// Function to retrieve and display saved summary data


document.addEventListener("DOMContentLoaded", function () {
        const countryCode = localStorage.getItem("countryCode"); 
    const summaryData = JSON.parse(localStorage.getItem("summaryData"));
    const formData = JSON.parse(localStorage.getItem("formData"));
  
    if  (summaryData && formData)  {

      document.getElementById("name").textContent = formData.name;
      document.getElementById("current-date").textContent = summaryData.currentDate;
      document.getElementById("selected_time").textContent = summaryData.selectedTime;
      document.getElementById("selected_duration").textContent = summaryData.selectedDuration;



      // Format and update phone number with country code
      const formattedPhoneNumber = `+${countryCode} ${formData.phone}`;
      document.getElementById("phone").textContent = formattedPhoneNumber;


      document.getElementById("email").textContent = formData.email;
      document.getElementById("gender").textContent = formData.gender;
  
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
  });
  
  // Call the function to display saved summary data
  displaySummaryData();
  
