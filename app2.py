from numpy import loadtxt
from keras.models import load_model
from flask import Flask, render_template, redirect, url_for, Response, jsonify
from flask_cors import CORS, cross_origin
import requests
import tensorflow as tf
import pandas as pd #want to use pandas because we want it in a df format to pass into model


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'

app.config['DEBUG'] = True



# ================load model=====================
model = load_model('model.h5')
# summarize model.
#model.summary()


input_columns = ["YrBlt", "Beds", "FBths", "LvngAreaSF","HBths", "Days On Market", "Garage", "Sold Price/List Price", "Sub#"]
file_detached = "edited_house_data.csv"
homes_data = pd.read_csv(file_detached)

X = homes_data[input_columns]
y = homes_data["SoldPrice"]

#normalize data
x_max = X.max()
x_min = X.min()
#X = (X-X.min())/(X.max()-X.min())

y_min = y.min()
y_max = y.max()
#y = (y-y.min())/(y.max()-y.min())

#print(x_min, x_max)
#=================================================

@app.route("/", methods=["GET"])
def index():
    return "route testing, try /predict"


@app.route("/predict", methods=["POST"])
def predict():

    year = request.form['year']
    
    test_input = [year, 4 , 3, 1500, 0, 10, 1, 1, 193]

    #normalize inputs
    test_input_normal = (test_input-x_min)/(x_max-x_min)
    #convert to tf array
    array = tf.reshape(test_input_normal, [-1,9])
    print(array)
    print('____________________')


    #run model
    output = model.predict(array)
    print(output)
    print('____________________')


    #unnormalize for final reports
    Normal_output = output*(y_max-y_min)+y_min
    data = {
        "Result": str(Normal_output[0][0])  #we can convert back to integer in front end if needed
    }
    print(Normal_output[0][0]) 
    return jsonify(data) #added [0][0] to get it out of array. you want json format so easier for javascript to interpret




#dont need this if you dont have a server running
if __name__ == "__main__":
    app.run()