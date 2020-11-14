#import dependents

from numpy import loadtxt
from keras.models import load_model
from flask import Flask, render_template, redirect, url_for, Response, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import tensorflow as tf
# want to use pandas because we want it in a df format to pass into model
import pandas as pd

# Create an instance of Flask
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
#handle our CORS headers and origins
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

# Route to render index.html template, this will be our base route
@app.route("/")
def index():

    # Return template and data
    return render_template("index.html")

#our main route to the first prediction, this will be for home stuff, the next route will be for townhomes
@app.route("/predict/<year>/<bedrooms>/<bathrooms>/<area>/<halfbaths>/<garage>/<sub>", methods=["GET", "POST"])
def predict(year, bedrooms, bathrooms, area, halfbaths, garage, sub):
    print(year, bedrooms, bathrooms, area, halfbaths, garage, sub)

    # load model
    model = load_model('model.h5')

    # create dictionary for encoded labels and corresponding subdivision names
    home_dict = {'Haddon Hall': 91,
                 'Beckett Crossing': 10,
                 'Stillwater': 210,
                 'Smith Farm': 203,
                 'Walden Creek': 244,
                 'Olde Sturbridge': 157,
                 'Woodcreek': 270,
                 'Sugarland Run': 215,
                 'Not in a Subdivision': 153,
                 'Greenmoor': 86,
                 'Sweetwater': 227,
                 'Saddlebrook': 185,
                 'Colvin Park': 45,
                 'Sunset Hills': 219,
                 'Brighton Forest': 21,
                 'The Park At West Lake': 230,
                 'Shepherds Vineyard': 200,
                 'Lexington': 134,
                 'Arcadia West': 5,
                 'Woodbury': 269,
                 'Providence at Yates Pond': 176,
                 'Bradley Park': 17,
                 'The Park at Langston': 231,
                 'Buckhorn Preserve': 27,
                 'Dogwood Ridge': 64,
                 'Middleton': 146,
                 'Haddon Place': 92,
                 'Lynnhaven': 139,
                 'Oak Pointe': 155,
                 'Crocketts Ridge': 52,
                 'Olive Chapel Park': 160,
                 'Whitehall': 261,
                 'Kelly Glen': 123,
                 'The Preserve at White Oak Creek': 232,
                 'Hickory Creek': 100,
                 'Bella Casa': 11,
                 'Weddington': 250,
                 'Crestmont': 51,
                 'Royal Senter Ridge': 182,
                 'Oak Chase': 154,
                 'The Villages of Apex': 234,
                 'Blaney Farms': 16,
                 'White Oak Creek': 260,
                 'Reunion Pointe': 178,
                 'Kildaire Estates': 126,
                 'Churchill Estates': 42,
                 'Wendy Hill': 251,
                 'Wheeler Woods': 255,
                 'Hollands Crossing': 108,
                 'Jamison Park': 118,
                 'Abbington': 1,
                 'Deerfield Park': 62,
                 'Clairmont': 43,
                 'Homestead Park': 112,
                 'Whippoorwill Downs': 256,
                 'Miramonte': 148,
                 'Englewood Forest': 71,
                 'Pearson Farms': 167,
                 'Merion': 145,
                 'Deer Creek': 59,
                 'Vintage Grove': 243,
                 'Salem Village': 187,
                 'Madison': 140,
                 'Newbury Park': 152,
                 'McKenzie Ridge': 143,
                 'Whitehall Manor': 262,
                 'To Be Added': 235,
                 'Peak 502 at Beaver Creek': 165,
                 'The Courtyards at Kildaire Farms': 229,
                 'Lake Castleberry': 129,
                 'Woodhall': 271,
                 'Senter Farm': 199,
                 'Amherst': 2,
                 'Waterford Green': 247,
                 'Cameron Park': 31,
                 'Fair Oaks': 72,
                 'Salem Oaks': 186,
                 'Perry Farms': 170,
                 'Mannsfield': 142,
                 'Green Level Estates': 82,
                 'Seagroves Farm': 197,
                 'Tuscany': 238,
                 'Green at Scotts Mill': 83,
                 'Pemberley': 169,
                 'Grenadier': 87,
                 'Holland Farm': 105,
                 'Greenbrier': 85,
                 'Deep Creek': 58,
                 'Rileys Pond': 179,
                 'Charleston Village': 40,
                 'Abbey Run': 0,
                 'Highland Creek': 101,
                 'Whitehart': 264,
                 'Fairview Park': 74,
                 'Scots Laurel': 194,
                 'Scotts Mill': 196,
                 'Knollwood': 128,
                 'Summer Oaks': 216,
                 'Olive Farms': 161,
                 'Crowsdale': 55,
                 'Enclave': 70,
                 'Branston': 19,
                 'GreyHawk Landing': 88,
                 'Dogwood Acres': 63,
                 'Surry Point': 224,
                 'Ellington Place': 69,
                 'Ashley Downs': 6,
                 'Chelsea Run': 41,
                 'Woodbridge': 268,
                 'Brittany Trace': 23,
                 'Hollands Cove': 107,
                 'Brookfield': 25,
                 'Parkside at Bella Casa': 164,
                 'Hunters Woods': 114,
                 'Buckingham': 28,
                 'Indian Trail': 115,
                 'Darlington Woods': 57,
                 'Surrey Meadows': 223,
                 'Magnolia Walk': 141,
                 'Woodridge': 272,
                 'Symphony Run': 228,
                 'Weavers Crossing': 249,
                 'Woods Of Chatham': 273,
                 'Goldenview': 81,
                 'Lily Orchard': 136,
                 'Creekside Commons': 50,
                 'Crocketts Ridge Village': 53,
                 'South Pointe': 205,
                 'Woodall Estates': 267,
                 'Belmont': 14,
                 'Chapel Ridge Estates': 37,
                 'Sancroft': 189,
                 'Heritage Oaks': 98,
                 'Belle Ridge': 12,
                 'Branston Farms': 20,
                 'Langston': 132,
                 'Sawyers Mill': 193,
                 'Glendale': 80,
                 'Bayfield Run': 8,
                 'Kelly West': 125,
                 'Toad Hollow': 236,
                 'Holland Crossing': 104,
                 'Whitehall Village Reserve': 263,
                 'Lakefield': 131,
                 'Peakway Village': 166,
                 'West Lake': 253,
                 'Hunter Valley': 113,
                 'Stonewood Manor': 212,
                 'Highland Farms': 102,
                 'Holly Brook': 109,
                 'Carriage Village': 33,
                 'Fairview Woods': 75,
                 'Hillcrest': 103,
                 'Les Arbres': 133,
                 'Covington': 46,
                 'Perry Village': 172,
                 'Center Parkway': 36,
                 'Ivory Hills': 117,
                 'Summercrest': 217,
                 'Stratford at Abbington': 213,
                 'Hallmark': 93,
                 'Sedgemoor': 198,
                 'Fairstone': 73,
                 'The Trace': 233,
                 'Carriage Downs': 32,
                 'Hallmark West': 94,
                 'Sunset Pointe': 222,
                 'Linden': 137,
                 'Ellington Cove': 68,
                 'Heritage Pointe': 99,
                 'Damont Hills': 56,
                 'Cary Oaks': 34,
                 'Oxford Greene': 163,
                 'Creeks Bend': 49,
                 'Elizabeth Woods': 67,
                 'Castlewood': 35,
                 'Brighton Woods': 22,
                 'Rancho Verde': 177,
                 'McKenzie Ridge Manors': 144,
                 'Holland Farms': 106,
                 'Wayland Grove': 248,
                 'Wyndridge': 276,
                 'Harmony Glen': 96,
                 'Villagio': 242,
                 'Kirkwood': 127,
                 'Kelly Grove': 124,
                 'Perry Hills': 171,
                 'Tunstall Square': 237,
                 'Lexington Farm': 135,
                 'Running Cedar': 183,
                 'Rustic Mill': 184,
                 'Keith Woods': 122,
                 'Olde Thompson Creek': 158,
                 'Salem Woods': 188,
                 'Wrenns Nest': 275,
                 'Old Mill Village': 156,
                 'Village of Wynchester': 241,
                 'Montclair': 149,
                 'Bells Pointe': 13,
                 'Winding Way Estates': 265,
                 'Brookshire Manor': 26,
                 'Whistling Quail Run': 258,
                 'Sunset Park': 221,
                 'Brook Meadow': 24,
                 'Bradley Terrace': 18,
                 'Dutchman Estates': 65,
                 'Olive Chapel Farms': 159,
                 'White Hall': 259,
                 'Claridge': 44,
                 'Justice Heights': 121,
                 'Glen Arbor': 79,
                 'Victorian Grace': 240,
                 'Creek Bend': 48,
                 'Lucas Farms': 138,
                 'Whistling Quail': 257,
                 'Rose Garden': 181,
                 'St James Village': 208,
                 'Pinefield': 173,
                 'Jordan Pointe': 120,
                 'Sterling at Buckingham': 209,
                 'Middleton Estates': 147,
                 'Crooked Brook': 54,
                 'Deerfield': 61,
                 'South Lake': 204,
                 'Orchard Knoll': 162,
                 'Greenbriar': 84,
                 'Autumnwood': 7,
                 'Lake Marsha': 130,
                 'Pebblestone': 168,
                 'Southwoods': 207,
                 'Arcadia Ridge': 4,
                 'Westwinds': 254,
                 'Chapel View Farms': 38,
                 'Covington Place': 47,
                 'Hollybrook': 111,
                 'Surry Ridge': 225,
                 'Chari Heights': 39,
                 'Amity Fields': 3,
                 'New Hope': 151,
                 'Sutton Place': 226,
                 'Sunlake Farms': 218,
                 'Caitlin Pond': 29,
                 'Washington Homes': 245,
                 'Saponi Hills': 191,
                 'Southern Point of Lights': 206,
                 'Pinewood': 174,
                 'Sleepy Valley': 202,
                 'Sawgrass': 192,
                 'Cameron Glen': 30,
                 'Siena at Bella Casa': 201,
                 'Iron Gate': 116,
                 'West Glen Estates': 252,
                 'Greys Landing': 89,
                 'Wrenn Meadow': 274,
                 'Sunset Hills Village': 220,
                 'Myrtle Wood': 150,
                 'Gypsy Woods': 90,
                 'Scott Mill': 195,
                 'Winslow': 266,
                 'Santero': 190,
                 'Pinewoods': 175,
                 'Germaine Village': 78,
                 'Stone Point': 211,
                 'Rollingwood  Estates': 180,
                 'Halstead': 95,
                 'Sturbridge Village': 214,
                 'Belmont Estates': 15,
                 'Friendship Acres': 77,
                 'Holly Run': 110,
                 'Jenmar Acres': 119,
                 'Deer Run': 60,
                 'Beaver Creek': 9,
                 'Hensley': 97,
                 'Feldersville': 76,
                 'Waterford East': 246,
                 'Edwards Creek': 66,
                 'Valley View': 239}

    # converting user input to encoded value
    subdivision = home_dict.get(sub)

    # casting input to int for enabling arithmetic for model
    input_row = [int(year), int(bedrooms), int(bathrooms), int(area),
                int(halfbaths), 16, int(garage), 0.99, subdivision]
    print(input_row)
    input_columns = ["YrBlt", "Beds", "FBths", "LvngAreaSF", "HBths",
                    "Days On Market", "Garage", "Sold Price/List Price", "Sub#"]
    file_detached = "edited_house_data.csv"
    homes_data = pd.read_csv(file_detached)

    X = homes_data[input_columns]
    y = homes_data["SoldPrice"]

# normalize data
    x_max = X.max()
    x_min = X.min()
#X = (X-X.min())/(X.max()-X.min())

    y_min = y.min()
    y_max = y.max()
#y = (y-y.min())/(y.max()-y.min())

#print(x_min, x_max)
# =================================================

    #test_input = [year, 4 , 3, 1500, 0, 10, 1, 1, 193]

    # normalize inputs
    test_input_normal = (input_row-x_min)/(x_max-x_min)
    # convert to tf array
    array = tf.reshape(test_input_normal, [-1, 9])
    print(array)
    print('____________________')

    # run model
    output = model.predict(array)
    # print(output)
    # print('____________________')

    # unnormalize for final reports
    Normal_output = output*(y_max-y_min)+y_min
    data = {
        # we can convert back to integer in front end if needed
        "Result": str(Normal_output[0][0])
    }

    return str(Normal_output[0][0])

#This will our route for townhomes
@app.route("/predict1/<year>/<bedrooms>/<bathrooms>/<area>/<halfbaths>/<garage>/<sub>", methods=["GET", "POST"])
def predict1(year, bedrooms, bathrooms, area, halfbaths, garage, sub):
    print(year, bedrooms, bathrooms, area, halfbaths, garage, sub)
# ================load model=====================
    model = load_model('townhome_model.h5')
# summarize model.
# model.summary()
    townhome_dict = {'Woodcreek': 56,
                     'Scotts Mill': 36,
                     'The Villages of Apex': 45,
                     'Walden Townes': 50,
                     'The Preserve at White Oak Creek': 44,
                     'Hempstead at Beaver Creek': 20,
                     'Salem Pointe': 33,
                     'West Haven Townhomes': 52,
                     'Sweetwater': 41,
                     'Old Mill Village': 26,
                     'Deer Creek':	10,
                     'Middleton': 23,
                     'Smith Farm': 39,
                     'Salem Creek Townhomes': 32,
                     'Bella Casa': 2,
                     'Peak 502 at Beaver Creek': 29,
                     'The Orchard Villas': 43,
                     '540 Townes': 0,
                     'Seagroves Farm': 38,
                     'Center Street Station': 8,
                     'West Lake': 53,
                     'Townes at North Salem': 48,
                     'Townes at Westford': 49,
                     '55 James at Midtown': 1,
                     'Scotts Mill at Bungalow Park': 37,
                     'Pemberley': 30,
                     'The Groves':	42,
                     'Bradley Terrace':	4,
                     'Miramonte':	24,
                     'Heatherwood Townhomes': 19,
                     'Promanade at Beaver Creek': 31,
                     'Haddon Hall': 17,
                     'Edgewater': 13,
                     'Woodbury': 55,
                     'Carriage Downs': 6,
                     'Green at Scotts Mill': 16,
                     'South Walk':	40,
                     'Townes at Friendship Station': 47,
                     'Dogwood Ridge':	12,
                     'Parkside at Bella Casa': 28,
                     'Wayland Grove': 51,
                     'Miramonte Townes': 25,
                     'CitiSide at Beaver Creek': 9,
                     'Glen Arbor': 14,
                     'Townes At Sugarland':	46,
                     'Scots Laurel': 34,
                     'Westhaven': 54,
                     'Jamison Park': 21,
                     'Scottish Mills': 35,
                     'McKenzie Ridge': 22,
                     'Golders Green': 15,
                     'Bristol Walk': 5,
                     'Center Heights': 7,
                     'Olive Chapel Park': 27,
                     'Heatherbrook Townhomes': 18,
                     'Dogwood': 11,
                     'Bella Casa Townes': 3

                     }

    subdivision = townhome_dict.get(sub)
    input_row = [int(year), int(bedrooms), int(bathrooms), int(area),
                int(halfbaths), 9, int(garage), 0.99, subdivision]
    print(input_row)
    input_columns = ["YrBlt", "Beds", "FBths", "LvngAreaSF", "HBths",
                    "Days On Market", "Garage", "Sold Price/List Price", "Sub#"]
    file_attached = "townhouse_data_edited.csv"
    townhomes_data = pd.read_csv(file_attached)

    X = townhomes_data[input_columns]
    y = townhomes_data["SoldPrice"]

# normalize data
    x_max = X.max()
    x_min = X.min()
#X = (X-X.min())/(X.max()-X.min())

    y_min = y.min()
    y_max = y.max()
#y = (y-y.min())/(y.max()-y.min())

#print(x_min, x_max)
# =================================================

    #test_input = [year, 4 , 3, 1500, 0, 10, 1, 1, 193]

    # normalize inputs
    test_input_normal = (input_row-x_min)/(x_max-x_min)
    # convert to tf array
    array = tf.reshape(test_input_normal, [-1, 9])
    print(array)
    print('____________________')

    # run model
    output = model.predict(array)
    # print(output)
    # print('____________________')

    # unnormalize for final reports
    Normal_output = output*(y_max-y_min)+y_min
    data = {
        # we can convert back to integer in front end if needed
        "Result": str(Normal_output[0][0])
    }

    return str(Normal_output[0][0])

#return main
if __name__ == "__main__":
    app.run(debug=True)
