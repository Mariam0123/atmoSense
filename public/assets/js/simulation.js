// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, onValue, ref, update, limitToLast, query, orderByKey, set, onChildAdded } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
const firebaseConfig = {
    apiKey: "AIzaSyBsJ5SHxRSGwEmyaYv9yp_APj2D53ajHyc",
    authDomain: "airquality-monitor-36278.firebaseapp.com",
    databaseURL: "https://airquality-monitor-36278-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "airquality-monitor-36278",
    storageBucket: "airquality-monitor-36278.appspot.com",
    messagingSenderId: "109574725040",
    appId: "1:109574725040:web:9526e57a3c89e5cc24ca75",
    measurementId: "G-4LN4Q8QJR4"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
var current_governerate = "Muharraq";
var time_var = 1670223488;
const send_values = ref(db, 'air_parameters/' + current_governerate + '/values/' + time_var);
set(send_values,
    {
        co2: 100,
        hum: 50,
        temp: 18,
        formaldahide: 0,
        pm10: 50,
        pm25: 25,
        tvoc: 10,
        counter: 1,
        lat: 50.6,
        lon: 26.6,
    });