//console.log("I AM IN THE LOGIC FILE")
//var select = document.getElementById("subdivision");
var sddropDown = document.getElementById('subdivision');

console.log(sddropDown)

//array of sfh subdivisions
var hsubdivisions = [
    "Not in a Subdivision",
    "Abbey Run",
    "Abbington",
    "Amherst",
    "Amity Fields",
    "Arcadia Ridge",
    "Arcadia West",
    "Ashley Downs",
    "Autumnwood",
    "Bayfield Run",
    "Beaver Creek",
    "Beckett Crossing",
    "Bella Casa",
    "Belle Ridge",
    "Bells Pointe",
    "Belmont",
    "Belmont Estates",
    "Blaney Farms",
    "Bradley Park",
    "Bradley Terrace",
    "Branston",
    "Branston Farms",
    "Brighton Forest",
    "Brighton Woods",
    "Brittany Trace",
    "Brook Meadow",
    "Brookfield",
    "Brookshire Manor",
    "Buckhorn Preserve",
    "Buckingham",
    "Caitlin Pond",
    "Cameron Glen",
    "Cameron Park",
    "Carriage Downs",
    "Carriage Village",
    "Cary Oaks",
    "Castlewood",
    "Center Parkway",
    "Chapel Ridge Estates",
    "Chapel View Farms",
    "Chari Heights",
    "Charleston Village",
    "Chelsea Run",
    "Churchill Estates",
    "Clairmont",
    "Claridge",
    "Colvin Park",
    "Covington",
    "Covington Place",
    "Creek Bend",
    "Creeks Bend",
    "Creekside Commons",
    "Crestmont",
    "Crocketts Ridge",
    "Crocketts Ridge Village",
    "Crooked Brook",
    "Crowsdale",
    "Damont Hills",
    "Darlington Woods",
    "Deep Creek",
    "Deer Creek",
    "Deer Run",
    "Deerfield",
    "Deerfield Park",
    "Dogwood Acres",
    "Dogwood Ridge",
    "Dutchman Estates",
    "Edwards Creek",
    "Elizabeth Woods",
    "Ellington Cove",
    "Ellington Place",
    "Enclave",
    "Englewood Forest",
    "Fair Oaks",
    "Fairstone",
    "Fairview Park",
    "Fairview Woods",
    "Feldersville",
    "Friendship Acres",
    "Germaine Village",
    "Glen Arbor",
    "Glendale",
    "Goldenview",
    "Green at Scotts Mill",
    "Green Level Estates",
    "Greenbriar",
    "Greenbrier",
    "Greenmoor",
    "Grenadier",
    "GreyHawk Landing",
    "Greys Landing",
    "Gypsy Woods",
    "Haddon Hall",
    "Haddon Place",
    "Hallmark",
    "Hallmark West",
    "Halstead",
    "Harmony Glen",
    "Hensley",
    "Heritage Oaks",
    "Heritage Pointe",
    "Hickory Creek",
    "Highland Creek",
    "Highland Farms",
    "Hillcrest",
    "Holland Crossing",
    "Holland Farm",
    "Holland Farms",
    "Hollands Cove",
    "Hollands Crossing",
    "Holly Brook",
    "Holly Run",
    "Hollybrook",
    "Homestead Park",
    "Hunter Valley",
    "Hunters Woods",
    "Indian Trail",
    "Iron Gate",
    "Ivory Hills",
    "Jamison Park",
    "Jenmar Acres",
    "Jordan Pointe",
    "Justice Heights",
    "Keith Woods",
    "Kelly Glen",
    "Kelly Grove",
    "Kelly West",
    "Kildaire Estates",
    "Kirkwood",
    "Knollwood",
    "Lake Castleberry",
    "Lake Marsha",
    "Lakefield",
    "Langston",
    "Les Arbres",
    "Lexington",
    "Lexington Farm",
    "Lily Orchard",
    "Linden",
    "Lucas Farms",
    "Lynnhaven",
    "Madison",
    "Magnolia Walk",
    "Mannsfield",
    "Markham Plantation",
    "McKenzie Ridge",
    "McKenzie Ridge Manors",
    "Merion",
    "Middleton",
    "Middleton Estates",
    "Miramonte",
    "Montclair",
    "Myrtle Wood",
    "New Hope",
    "Newbury Park",
    "Oak Chase",
    "Oak Pointe",
    "Old Mill Village",
    "Olde Sturbridge",
    "Olde Thompson Creek",
    "Olive Chapel Farms",
    "Olive Chapel Park",
    "Olive Farms",
    "Orchard Knoll",
    "Oxford Greene",
    "Parkside at Bella Casa",
    "Peak 502 at Beaver Creek",
    "Peakway Village",
    "Pearson Farms",
    "Pebblestone",
    "Pemberley",
    "Perry Farms",
    "Perry Hills",
    "Perry Village",
    "Pinefield",
    "Pinewood",
    "Pinewoods",
    "Providence at Yates Pond",
    "Rancho Verde",
    "Reunion Pointe",
    "Rileys Pond",
    "Rollingwood  Estates",
    "Rose Garden",
    "Royal Senter Ridge",
    "Running Cedar",
    "Rustic Mill",
    "Saddlebrook",
    "Salem Oaks",
    "Salem Village",
    "Salem Woods",
    "Sancroft",
    "Santero",
    "Saponi Hills",
    "Sawgrass",
    "Sawyers Mill",
    "Scots Laurel",
    "Scott Mill",
    "Scotts Mill",
    "Seagroves Farm",
    "Sedgemoor",
    "Senter Farm",
    "Shepherds Vineyard",
    "Siena at Bella Casa",
    "Sleepy Valley",
    "Smith Farm",
    "South Lake",
    "South Pointe",
    "Southern Point of Lights",
    "Southwoods",
    "St James Village",
    "Sterling at Buckingham",
    "Stillwater",
    "Stone Point",
    "Stonewood Manor",
    "Stratford at Abbington",
    "Sturbridge Village",
    "Sugarland Run",
    "Summer Oaks",
    "Summercrest",
    "Sunlake Farms",
    "Sunset Hills",
    "Sunset Hills Village",
    "Sunset Park",
    "Sunset Pointe",
    "Surrey Meadows",
    "Surry Point",
    "Surry Ridge",
    "Sutton Place",
    "Sweetwater",
    "Symphony Run",
    "The Courtyards at Kildaire Farms",
    "The Park at Langston",
    "The Park At West Lake",
    "The Preserve at White Oak Creek",
    "The Trace",
    "The Villages of Apex",
    "To Be Added",
    "Toad Hollow",
    "Tunstall Square",
    "Tuscany",
    "Valley View",
    "Victorian Grace",
    "Village of Wynchester",
    "Villagio",
    "Vintage Grove",
    "Walden Creek",
    "Washington Homes",
    "Waterford East",
    "Waterford Green",
    "Wayland Grove",
    "Weavers Crossing",
    "Weddington",
    "Wendy Hill",
    "West Glen Estates",
    "West Lake",
    "Westwinds",
    "Wheeler Woods",
    "Whippoorwill Downs",
    "Whistling Quail",
    "Whistling Quail Run",
    "White Hall",
    "White Oak Creek",
    "Whitehall",
    "Whitehall Manor",
    "Whitehall Village Reserve",
    "Whitehart",
    "Winding Way Estates",
    "Winslow",
    "Woodall Estates",
    "Woodbridge",
    "Woodbury",
    "Woodcreek",
    "Woodhall",
    "Woodridge",
    "Woods Of Chatham",
    "Wrenn Meadow",
    "Wrenns Nest",
    "Wyndridge"
];

//array of townhome subdivisions
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
    "Green at Scotts Mill",
    "Haddon Hall",
    "Heatherbrook Townhomes",
    "Heatherwood Townhomes",
    "Hempstead at Beaver Creek",
    "Jamison Park",
    "McKenzie Ridge",
    "Middleton",
    "Miramonte",
    "Miramonte Townes",
    "Old Mill Village",
    "Olive Chapel Park",
    "Parkside at Bella Casa",
    "Peak 502 at Beaver Creek",
    "Pemberley",
    "Promanade at Beaver Creek",
    "Salem Creek Townhomes",
    "Salem Pointe",
    "Scots Laurel",
    "Scottish Mills",
    "Scotts Mill",
    "Scotts Mill at Bungalow Park",
    "Seagroves Farm",
    "Smith Farm",
    "South Walk",
    "Sweetwater",
    "The Groves",
    "The Orchard Villas",
    "The Preserve at White Oak Creek",
    "The Villages of Apex",
    "Townes at Friendship Station",
    "Townes at North Salem",
    "Townes At Sugarland",
    "Townes at Westford",
    "Walden Townes",
    "Wayland Grove",
    "West Haven Townhomes",
    "West Lake",
    "Westhaven",
    "Woodbury",
    "Woodcreek"
];

// Select the button
//var button = d3.select("#predict-btn");
// Select the form
//var form = d3.select("form");
//select homtype dropdown

var hometypeinput = d3.select("#hometype").property("value");

console.log(hometypeinput)

// Load Dropdown Function 
function hometype(value) {

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
        sddropDown.appendChild(el);
    }
}

hometype(hometypeinput);

//event handlers
//hometypeinput.on("change", hometype)


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

    //console.log("I HAVE SELECTED: " + inputtype)

    if (inputtype == "home") {

        console.log(inputhomeyear)

        d3.request("http://127.0.0.1:5000/predict/" + inputhomeyear + "/" + inputhomebedrooms + "/" + inputhomebath + "/" + inputhomearea + "/" + inputhomehalfbath + "/" + inputhomegarage + "/" + inputhomesubdivision).get(response => {
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
                url(https://media.giphy.com/media/MAcZH4WmbFgQdPuVQX/giphy.gif)
                bottom left
                no-repeat
                `
            })
        })
    }


    if (inputtype == "townhouse") {
        console.log(inputhomeyear)
        d3.request("http://127.0.0.1:5000/predict/" + inputhomeyear + "/" + inputhomebedrooms + "/" + inputhomebath + "/" + inputhomearea + "/" + inputhomehalfbath + "/" + inputhomegarage + "/" + inputhomesubdivision).get(response => {
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
                url(https://media.giphy.com/media/MAcZH4WmbFgQdPuVQX/giphy.gif)
                bottom left
                no-repeat
                `
            })
        })

    }


};




