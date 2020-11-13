console.log("I AM IN THE LOGIC FILE")
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
function hometype(value) {
    //x = document.getElementById("hometype").value
    if (value == "townhouse") {
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


button = d3.select("#predict-btn")
button.on("click", prediction)

function prediction() {
    console.log("I AM IN THE BUTTON")
    var inputtype = d3.select("#hometype").property("value")
    var inputhomeyear = d3.select("#year").property("value")
    var inputhomebedrooms = d3.select("#bedrooms").property("value")
    var inputhomebath = d3.select("#baths").property("value")
    var inputhomearea = d3.select("#sqft").property("value")
    var inputhomehalfbath = d3.select("#halfbaths").property("value")
    var inputhomegarage = d3.select("#garage").property("value")
    var inputhomesubdivision = d3.select("#subdivision").property("value")

    user_input = {
        "year": inputhomeyear,
        "bedrooms": inputhomebedrooms, "bath": inputhomebath, "area": inputhomearea, "halfbath": inputhomehalfbath,
        "garage": inputhomegarage, "subdivision": inputhomesubdivision
    }
    console.log("I HAVE SELECTED: " + inputtype)
    if(inputtype == "home") {
        console.log(inputhomeyear)
        d3.request("http://127.0.0.1:5000/predict/" + inputhomeyear + "/" + inputhomebedrooms + "/" + inputhomebath +"/" + inputhomearea + "/" + inputhomehalfbath +"/" + inputhomegarage +"/" + inputhomesubdivision).get(response => {
            //calling the alert
        return Swal.fire({
            title: `Your Home is worth $${response.response}!`,
            text: 'Click to make another prediction',
            // imageUrl: `${winnerPic}`,
            // imageWidth: 400,
            // imageHeight: 400,
            // imageAlt: 'Custom image',
            backdrop: `
                rgba(0, 255, 0, 0.3)
                url(https://tech4mag.com/wp-content/uploads/2020/03/1583577776_253_Want-To-Remove-Background-from-A-GIF-Or-Video-Try-Unscreen.gif)
                bottom left
                no-repeat
                `
    })
        })

    }
    if(inputtype == "townhouse"){
        console.log(inputhomeyear)
        d3.request("http://127.0.0.1:5000/predict/" + inputhomeyear + "/" + inputhomebedrooms + "/" + inputhomebath +"/" + inputhomearea + "/" + inputhomehalfbath +"/" + inputhomegarage +"/" + inputhomesubdivision).get(response => {
            //calling the alert
        return Swal.fire({
            title: `Your Home is worth $${response.response}!`,
            text: 'Click to make another prediction',
            // imageUrl: `${winnerPic}`,
            // imageWidth: 400,
            // imageHeight: 400,
            // imageAlt: 'Custom image',
            backdrop: `
                rgba(0, 255, 0, 0.3)
                url(https://tech4mag.com/wp-content/uploads/2020/03/1583577776_253_Want-To-Remove-Background-from-A-GIF-Or-Video-Try-Unscreen.gif)
                bottom left
                no-repeat
                `
        })
    }



};





