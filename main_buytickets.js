
const calendarContainer = document.querySelector('.calendar-container');
const currentDateElement = document.getElementById('current-date');
let currentDate = new Date();

// Function to generate the calendar
function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');

    const date = new Date(year, month, 1);

    // Get the first day of the month and the total number of days in the month
    const firstDay = date.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let calendarHTML = '<table><tr><th colspan="7">' + date.toLocaleString('default', { month: 'long', year: 'numeric' }) + '</th></tr>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

    let dayCount = 1;
    for (let week = 0; dayCount <= totalDays; week++) {
        calendarHTML += '<tr>';
        for (let day = 0; day < 7; day++) {
            if ((week === 0 && day < firstDay) || dayCount > totalDays) {
                calendarHTML += '<td></td>';
            } else {
                const dateUTC = Date.UTC(year, month, dayCount);
                const dateAttr = new Date(dateUTC).toISOString().slice(0, 10);
                calendarHTML += `<td class="calendar-date" data-date="${dateAttr}">${dayCount}</td>`;
                dayCount++;
            }
        }
        calendarHTML += '</tr>';
    }

    calendarHTML += '</table>';
    calendar.innerHTML = calendarHTML;

    // Add event listener to the calendar dates
    const calendarDates = calendar.querySelectorAll('.calendar-date');
    calendarDates.forEach(date => {
        date.addEventListener('click', () => {
            const selectedDateAttr = date.getAttribute('data-date');
            const selectedDate = new Date(selectedDateAttr);

            // Remove the 'selected' class from all dates
            calendarDates.forEach(date => {
                date.classList.remove('selected');
            });

            // Add 'selected' class to the clicked date
            date.classList.add('selected');

            currentDate = selectedDate;

            currentDateElement.textContent = currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        });
    });
}

// Function to generate the calendar for the current month
function generateCurrentMonthCalendar() {
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
}

// Call the function to generate the calendar for the current month initially
generateCurrentMonthCalendar();

// Add event listeners for navigation buttons
document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.getElementById('current-month').addEventListener('click', () => {
    generateCurrentMonthCalendar();
});

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});



  // Function to display the current date in the table
  function displayCurrentDate() {
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("current-date").textContent = currentDate;
}

// Call the function to display the current date
displayCurrentDate();



    // Function to update the table with selected tickets
    function updateTable() {
        // Get the values of selected tickets from the input fields
        const slAdult = document.querySelector("input[name='sl_adult']").value;
        const slChild = document.querySelector("input[name='sl_child']").value;
        const foreignAdult = document.querySelector("input[name='foreign_adult']").value;
        const foreignChild = document.querySelector("input[name='foreign_child']").value;
        const infant = document.querySelector("input[name='infant']").value;

        // Update the table with the selected ticket counts and labels
        document.getElementById("sl-adult").textContent = slAdult + " SL Adult";
        document.getElementById("sl-child").textContent = slChild + " SL Child";
        document.getElementById("foreigner-adult").textContent = foreignAdult + " Foreign Adult";
        document.getElementById("foreigner-child").textContent = foreignChild + " Foreign Child";
        document.getElementById("infant").textContent = infant + " Infant";

        

        updateTicketPrices();
    }

    // Event listener to trigger the updateTable function whenever input fields change
    const inputFields = document.querySelectorAll("input[type='number']");
    inputFields.forEach((input) => {
        input.addEventListener("input", updateTable);
    });

  
    
    
      // Add an event listener to the select element
      const selectTime = document.querySelector(".select_time select");
      selectTime.addEventListener("change", updateSelectedTimes);
    
      function updateSelectedTimes() {
        // Get all the selected options
        const selectedOptions = Array.from(selectTime.selectedOptions);
    
        // Extract the selected times from the options
        const selectedTimes = selectedOptions.map((option) => option.textContent);
    
        // Find the start and end times from the selected times
        const startTime = selectedTimes[0].split(" - ")[0];
        const endTime = selectedTimes[selectedTimes.length - 1].split(" - ")[1];
    
        // Combine the start and end times to create a single range
        const combinedRange = `${startTime} - ${endTime}`;
    
        // Update the table cell with the combined range
        const selectedTimeCell = document.getElementById("selected_time");
        selectedTimeCell.textContent = combinedRange;

        updateTicketPrices();
      }
   
      
        // Add an event listener to the select element for time selection
        const select_Time = document.querySelector(".select_time select");
        selectTime.addEventListener("change", updateSelectedDuration);
      
      

    // Calculate and update the duration based on selected times
        updateSelectedDuration();

  

 // Function to calculate the duration in hours and update the "selected_duration" cell
function updateSelectedDuration() {
    const selectTime = document.querySelector(".select_time select");
    const selectedOptions = Array.from(selectTime.selectedOptions);
  
    // Find the start and end times from the selected times
    const startTime = selectedOptions[0].textContent.split(" - ")[0];
    const endTime = selectedOptions[selectedOptions.length - 1].textContent.split(" - ")[1];
  
    // Calculate the duration in hours
    const duration = calculateDurationInHours(startTime, endTime);
  
 
  // Calculate and update the count of normal and peak tickets for different categories
  const normalHours = ["07:00 am - 08:00 am", "08:00 am - 09:00 am", "09:00 am - 10:00 am", "01:00 pm - 02:00 pm", "02:00 pm - 03:00 pm"];
  const peakHours = ["10:00 am - 11:00 am", "11:00 am - 12:00 pm", "12:00 pm - 01:00 pm", "03:00 pm - 04:00 pm", "04:00 pm - 05:00 pm", "05:00 pm - 06:00 pm"];

  const selectedNormalTickets = selectedOptions.filter(option => !peakHours.includes(option.textContent)).length;
  const selectedPeakTickets = selectedOptions.filter(option => peakHours.includes(option.textContent)).length;

  // Update the table cell with the duration and count of normal and peak tickets
  const selectedDurationCell = document.getElementById("selected_duration");
  selectedDurationCell.textContent = `${duration.toFixed(2)} hour(s) (normal ${selectedNormalTickets} and peak ${selectedPeakTickets})`;
}


  function calculateDurationInHours(startTime, endTime) {
    const startHours = extractHours(startTime);
    const endHours = extractHours(endTime);
  
    let duration = endHours - startHours;
  
    if (duration < 0) {
      duration += 12; // Assuming the maximum duration is 12 hours
    }
  
    return duration;
  }



  function extractHours(time) {
    if (!time) {
        console.log("Time is undefined or null.");
        return -1;
    }

    const [timeParts] = time.split(" ");
    
    if (!timeParts) {
        console.log("Time parts are undefined or null.");
        return -1;
    }
    
    const [hours, period] = timeParts.split(":");
    
    if (!hours || !period) {
        console.log("Hours or period is undefined or null.");
        return -1;
    }

    if (period.toLowerCase() === "pm" && hours !== "12") {
        return parseInt(hours) + 12;
    } else {
        return parseInt(hours);
    }
}

  

function calculateTotalPrice(ticketCount, pricePerHour, isPeakHour, totalHours) {
  const pricePerHourValue = isPeakHour ? pricePerHour.peakHour : pricePerHour.normalHour;
  const totalPrice = ticketCount * pricePerHourValue * totalHours;
  return totalPrice;
}

function updateTicketPrices() {
  const prices = {
    slAdult: {
      normalHour: 4,
      peakHour: 6,
    },
    slChild: {
      normalHour: 2,
      peakHour: 3,
    },
    foreignAdult: {
      normalHour: 10,
      peakHour: 13,
    },
    foreignChild: {
      normalHour: 5,
      peakHour: 8,
    },
  };

  // Get the counts of selected tickets
  const slAdultCount = parseInt(document.querySelector("input[name='sl_adult']").value) || 0;
  const slChildCount = parseInt(document.querySelector("input[name='sl_child']").value) || 0;
  const foreignAdultCount = parseInt(document.querySelector("input[name='foreign_adult']").value) || 0;
  const foreignChildCount = parseInt(document.querySelector("input[name='foreign_child']").value) || 0;

  // Calculate the total hours selected
  const selectedOptions = Array.from(selectTime.selectedOptions);
  const totalHours = selectedOptions.reduce((total, option) => {
    const [start, end] = option.textContent.split(" - ");
    const startHour = extractHours(start);
    const endHour = extractHours(end);
    const duration = endHour - startHour >= 0 ? endHour - startHour : endHour - startHour + 12;
    return total + duration;
  }, 0);

  // Check if the total hours selected fall within the peak hour range
  const isPeakHour = isTimeWithinPeakHours(selectedOptions);

  // Calculate ticket prices for each type
  const slAdultPrice = calculateTotalPrice(slAdultCount, prices.slAdult, isPeakHour, totalHours);
  const slChildPrice = calculateTotalPrice(slChildCount, prices.slChild, isPeakHour, totalHours);
  const foreignAdultPrice = calculateTotalPrice(foreignAdultCount, prices.foreignAdult, isPeakHour, totalHours);
  const foreignChildPrice = calculateTotalPrice(foreignChildCount, prices.foreignChild, isPeakHour, totalHours);

 

  // Update the ticket prices in the table
  document.getElementById("sl_adult_ticketprice").textContent ="$" + slAdultPrice.toFixed(2);
  document.getElementById("sl_child_ticketprice").textContent ="$" + slChildPrice.toFixed(2);
  document.getElementById("foreign_adult_ticketprice").textContent ="$" +foreignAdultPrice.toFixed(2);
  document.getElementById("foreign_child_ticketprice").textContent ="$" + foreignChildPrice.toFixed(2);
  document.getElementById("infant_ticketprice").textContent = "Free";




// Function to check if the time falls within the peak hour range
function isTimeWithinPeakHours(selectedOptions) {
  const peakHours = [
    "10:00 am - 11:00 am",
    "11:00 am - 12:00 pm",
    "12:00 pm - 01:00 pm",
    "03:00 pm - 04:00 pm",
    "04:00 pm - 05:00 pm",
    "05:00 pm - 06:00 pm",
  ];
  return selectedOptions.some(option => peakHours.includes(option.textContent));
}

// Function to extract hours from a time string
function extractHours(time) {
  const [hours, period] = time.split(" ")[0].split(":");
  if (period.toLowerCase() === "pm" && hours !== "12") {
    return parseInt(hours) + 12;
  } else {
    return parseInt(hours);
  }
}




// Get the values of selected tickets from the input fields
const slAdult = parseInt(document.querySelector("input[name='sl_adult']").value);
const slChild = parseInt(document.querySelector("input[name='sl_child']").value);
const foreignAdult = parseInt(document.querySelector("input[name='foreign_adult']").value);
const foreignChild = parseInt(document.querySelector("input[name='foreign_child']").value);
const infant = parseInt(document.querySelector("input[name='infant']").value);


// Calculate the total price for all ticket types
const totalPrice = slAdultPrice + slChildPrice + foreignAdultPrice + foreignChildPrice;

// Update the total price in the table
document.getElementById("total_price").textContent = "$" + totalPrice.toFixed(2);

// Enable the purchase button if the total price is greater than 0
const purchaseButton = document.getElementById("purchaseButton");
purchaseButton.disabled = totalPrice <= 0;

// Add event listener to the purchase button
purchaseButton.addEventListener("click", () => {
  // Redirect to the index_details.html page
  window.location.href = "index_details.html";
});

// Calculate and update the duration based on selected times
updateSelectedDuration();

// Debugging: Check if selected_duration is being extracted correctly
console.log("Selected Duration:", document.getElementById("selected_duration").textContent);

// Save the summary table data to local storage
const summaryData = {
currentDate: currentDate.toLocaleDateString('en-US'),
selectedTime: document.getElementById("selected_time").textContent,
selectedDuration:document.getElementById("selected_duration").textContent,
slAdultCount: slAdult,
slChildCount: slChild,
foreignAdultCount: foreignAdult,
foreignChildCount: foreignChild,
infantCount: infant,  
slAdultPrice: slAdultPrice,
slChildPrice: slChildPrice,
foreignAdultPrice: foreignAdultPrice,
foreignChildPrice: foreignChildPrice,
infantPrice: "Free",
totalPrice: totalPrice.toFixed(2)
 
};

// Debugging: Check the summaryData before saving to local storage
console.log("Summary Data:", summaryData);

localStorage.setItem("summaryData", JSON.stringify(summaryData));
}




