// from data.js
var tableData = data;

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

//variable for table body to add rows to
var tbody = d3.select("tbody");

//event handlers
button.on("click", runEnter);
form.on("change", runEnter);


//Use d3 to update each cell's text with
//Sighting values (date/time, city, state, country, shape, comment)
tableData.forEach(function (ufosightings) {
  console.log(ufosightings);
  var row = tbody.append("tr");
  Object.entries(ufosightings).forEach(function ([key, value]) {
    console.log(key, value);
    // Append a cell to the row for each value
    // in the ufosightings object
    var cell = row.append("td");
    cell.text(value);
  });
});

// Complete the event handler function for the form
function runEnter() {

  //clear previous searches rows
  tbody.html("");

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var dateinput = d3.select("#datetime");
  var cityinput = d3.select("#city");
  var stateinput = d3.select("#state");
  var countryinput = d3.select("#country");
  var shapeinput = d3.select("#shape");

  // Get the value property of the input element
  var datevalue = dateinput.property("value");
  var cityvalue = cityinput.property("value");
  var statevalue = stateinput.property("value");
  var countryvalue = countryinput.property("value");
  var shapevalue = shapeinput.property("value");


  //create if statement
  var filteredData = [...tableData]; //to make each filter independent of each other
  if (datevalue) {
    filteredData = filteredData.filter(obj => obj.datetime === datevalue);
  }

  if (cityvalue) {
    filteredData = filteredData.filter(obj => obj.city.toLowerCase() === cityvalue.toLowerCase());
  }

  if (statevalue) {
    filteredData = filteredData.filter(obj => obj.state.toLowerCase() === statevalue.toLowerCase());
  }

  if (countryvalue) {
    filteredData = filteredData.filter(obj => obj.country.toLowerCase() === countryvalue.toLowerCase());
  }

  if (shapevalue) {
    filteredData = filteredData.filter(obj => obj.shape.toLowerCase() === shapevalue.toLowerCase());
  }

  console.log(filteredData);

  if (filteredData.length >= 1) {
    //Sighting values (date/time, city, state, country, shape, comment)
    filteredData.forEach(function (filteredsightings) {
      console.log(filteredsightings);
      var row = tbody.append("tr");
      Object.entries(filteredsightings).forEach(function ([key, value]) {
        console.log(key, value);
        // Append a cell to the row for each value
        // in the ufosightings object
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }
  else {

    alert("No Results Found.")

  }
};




