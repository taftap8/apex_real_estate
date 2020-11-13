var select = document.getElementById("subdivision");

var hsubdivisions = [
  "Not in a Subdivision",
  "Abbey Run",
  "Abbington",
  "Amherst",
  "Amity Fields",
  "Arcadia Ridge",
  "Arcadia West",
  "Ashley Downs",
  "Autumnwood"
];

var tsubdivisions = [
  "540 Townes",
  "55 James at Midtown",
  "Bella Casa",
  "Bella Casa Townes",
  "Bradley Terrace",
  "Bristol Walk",
  "Carriage Downs",
  "Center Heights",
  "Center Street Station",
  "CitiSide at Beaver Creek",
  "Deer Creek",
  "Dogwood",
  "Dogwood Ridge",
  "Edgewater",
  "Glen Arbor",
  "Golders Green",
  "Green at Scotts Mill"
];

// Select the button
//var button = d3.select("#predict-btn");

// Select the form
//var form = d3.select("form");

//select homtype dropdown
var hometypeinput = d3.select("#hometype");

// Load Dropdown Function 
function hometype() {

  x = document.getElementById("hometype").value

  if (x == "townhouse") {
    elmts = tsubdivisions;
  } else {
    elmts = hsubdivisions;
  }

  for (var i = 0; i < elmts.length; i++) {
    var optn = elmts[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    select.appendChild(el);
  }

}

//hometype();

//event handlers
hometypeinput.on("change", hometype)
//button.on("click", runEnter);
//form.on("change", runEnter);







