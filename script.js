// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(document).ready(function() {
    // Retrieve data from local storage and populate textareas
    $('.description').each(function() {
      var id = $(this).parent().attr('id');
      var value = localStorage.getItem(id);
      $(this).val(value);
    });
  });

  // Check if local storage is supported
  if (typeof(Storage) === "undefined") {
    console.log("Local storage is not supported");
    return;
  }
  
  $('.saveBtn').on('click', function() {
    var key = $(this).parent().attr('id');
    var value = $(this).siblings('.description').val().trim();
    console.log("Saving task:", key, value);
    localStorage.setItem(key, value);
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function updateDateTime() {
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    var currentTime = dayjs().format('h:mm A');
    $('#currentDate').text(currentDate);
    $('#currentTime').text(currentTime);
  }

    // Call the updateDateTime function to set the initial date and time
    updateDateTime();

    // Update the current time every second
    setInterval(updateDateTime, 1000);

  function updateHourlySchedule() {
    // TODO: Update the class for each time block based on the current hour.
    var currentHour = dayjs().hour();
    console.log("Current hour:", currentHour);
      // Loop through each time block
  $('.time-block').each(function() {
    var hour = parseInt($(this).attr('id').split('-')[1]);
    console.log("Block hour:", hour);

    // Check if the hour is in the past, present, or future
    if (hour < currentHour) {
      // Set the class to 'past' if the hour is in the past
      $(this).removeClass('present future').addClass('past');
    } else if (hour === currentHour) {
      // Set the class to 'present' if the hour is the current hour
      $(this).removeClass('past future').addClass('present');
    } else {
      // Set the class to 'future' if the hour is in the future
      $(this).removeClass('past present').addClass('future');
    }
  });
}

// Call the updateHourlySchedule function to apply the appropriate class to each time block
updateHourlySchedule();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $('.time-block').each(function() {
    var key = $(this).attr('id');
    var value = localStorage.getItem(key);
    console.log("Retrieving task:", key, value);
    $(this).find('.description').val(value);
  });

  //
  // TODO: Add code to display the current date in the header of the page.

  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);

});
