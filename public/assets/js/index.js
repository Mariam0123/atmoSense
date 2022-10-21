// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, onValue, ref, limitToLast, query, orderByKey, set } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
const firebaseConfig = {
    apiKey: "AIzaSyDxFLdPFwjwUiI0EHwZvC0cRcEVmR0CiYs",
    authDomain: "atmosense-1645e.firebaseapp.com",
    databaseURL: "https://atmosense-1645e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "atmosense-1645e",
    storageBucket: "atmosense-1645e.appspot.com",
    messagingSenderId: "565173512011",
    appId: "1:565173512011:web:8Animationsa7a5947fb2470f8912ace",
    measurementId: "G-FZ55WKWLZP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const new_ref = query(ref(db, 'air_parameters/values'), orderByKey(), limitToLast(1));
var time_var, temp_var, hum_var, co2_var, co_var, formaldahide_var, tvoc_var, pm10_var, pm25_var;
onValue(new_ref, (data) => {
    var jsonData = data.toJSON();
    time_var = Object.keys(jsonData).toString();
    temp_var = jsonData[time_var]['temp'];
    hum_var = jsonData[time_var]['hum'];
    co_var = jsonData[time_var]['co'];
    co2_var = jsonData[time_var]['co2'];
    formaldahide_var = jsonData[time_var]['formaldahide'];
    tvoc_var = jsonData[time_var]['tvoc'];
    pm10_var = jsonData[time_var]['pm10'];
    pm25_var = jsonData[time_var]['pm25'];

    var temp_element = document.getElementById('temp');
    var hum_element = document.getElementById('hum');
    var co_element = document.getElementById('co');
    var co2_element = document.getElementById('co2');
    var formaldahide_element = document.getElementById('formaldahide');
    var tvoc_element = document.getElementById('tvoc');
    var pm10_element = document.getElementById('pm10');
    var pm25_element = document.getElementById('pm25');

    temp_element.innerHTML = temp_var + "°C";
    hum_element.innerHTML = hum_var + "%";
    co_element.innerHTML = co_var + "</br> ppm";
    co2_element.innerHTML = co2_var + "</br> ppm";
    formaldahide_element.innerHTML = formaldahide_var + "</br> (µg/m³)";
    tvoc_element.innerHTML = tvoc_var + "</br> (µg/m³)";
    pm10_element.innerHTML = pm10_var + '</br> (µg/m³)';
    pm25_element.innerHTML = pm25_var + "</br> (µg/m³)";

    var d = new Date(0);
    d.setUTCSeconds(time_var);
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", seconds: "numeric" };
    var date_time_element = document.getElementById("date_time");
    date_time_element.innerHTML = d.toLocaleString("en-GB", options);
    var today = d.getDate();
    var last_day = 21;
    var epoch_date = d.toLocaleDateString("en-gb");
    var epoch_string = epoch_date.replace(/\//g, '-');

    var Ihi_pm10, Ihi_co, Ihi_pm25, Ilo_pm10, Ilo_co, Ilo_pm25, BPhi_pm10, BPlo_pm25, BPhi_co, BPlo_co, BPhi_pm25, BPlo_pm10;
    function pm10_values(pm10_var) {
        if (pm10_var > 0 && pm10_var < 55) { BPhi_pm10 = 54; BPlo_pm10 = 0; Ihi_pm10 = 50; Ilo_pm10 = 0; }
        else if (pm10_var < 155) { BPhi_pm10 = 154; BPlo_pm10 = 55; Ihi_pm10 = 100; Ilo_pm10 = 51; }
        else if (pm10_var < 255) { BPhi_pm10 = 254; BPlo_pm10 = 155; Ihi_pm10 = 150; Ilo_pm10 = 101; }
        else if (pm10_var < 355) { BPhi_pm10 = 354; BPlo_pm10 = 255; Ihi_pm10 = 200; Ilo_pm10 = 151; }
        else if (pm10_var < 425) { BPhi_pm10 = 424; BPlo_pm10 = 355; Ihi_pm10 = 300; Ilo_pm10 = 201; }
        else if (pm10_var < 505) { BPhi_pm10 = 504; BPlo_pm10 = 425; Ihi_pm10 = 400; Ilo_pm10 = 301; }
        else { BPhi_pm10 = 604; BPlo_pm10 = 505; Ihi_pm10 = 500; Ilo_pm10 = 401; }
    }

    function pm25_values(pm25_var) {
        if (pm25_var > 0 && pm25_var < 12.1) { BPhi_pm25 = 12; BPlo_pm25 = 0; Ihi_pm25 = 50; Ilo_pm25 = 0; }
        else if (pm25_var < 35.5) { BPhi_pm25 = 35.4; BPlo_pm25 = 12.1; Ihi_pm25 = 100; Ilo_pm25 = 51; }
        else if (pm25_var < 55.5) { BPhi_pm25 = 55.4; BPlo_pm25 = 35.5; Ihi_pm25 = 150; Ilo_pm25 = 101; }
        else if (pm25_var < 150.5) { BPhi_pm25 = 150.4; BPlo_pm25 = 55.5; Ihi_pm25 = 200; Ilo_pm25 = 151; }
        else if (pm25_var < 250.5) { BPhi_pm25 = 250.4; BPlo_pm25 = 150.5; Ihi_pm25 = 300; Ilo_pm25 = 201; }
        else if (pm25_var < 350.5) { BPhi_pm25 = 350.4; BPlo_pm25 = 250.5; Ihi_pm25 = 400; Ilo_pm25 = 301; }
        else { BPhi_pm25 = 500.4; BPlo_pm25 = 350.5; Ihi_pm25 = 500; Ilo_pm25 = 401; }
    }

    function co_values(co_var) {
        if (co_var > 0 && co_var < 4.5) { BPhi_co = 4.4; BPlo_co = 0; Ihi_co = 50; Ilo_co = 0; }
        else if (co_var < 9.5) { BPhi_co = 9.4; BPlo_co = 4.5; Ihi_co = 100; Ilo_co = 51; }
        else if (co_var < 12.5) { BPhi_co = 12.4; BPlo_co = 9.5; Ihi_co = 150; Ilo_co = 101; }
        else if (co_var < 15.5) { BPhi_co = 15.4; BPlo_co = 12.5; Ihi_co = 200; Ilo_co = 151; }
        else if (co_var < 30.5) { BPhi_co = 30.4; BPlo_co = 15.5; Ihi_co = 300; Ilo_co = 201; }
        else if (co_var < 40.5) { BPhi_co = 40.4; BPlo_co = 30.5; Ihi_co = 400; Ilo_co = 301; }
        else { BPhi_co = 50.4; BPlo_co = 40.5; Ihi_co = 500; Ilo_co = 401; }
    }

    co_values(co_var);
    pm10_values(pm10_var);
    pm25_values(pm25_var);


    
    var muharraq_co_sum = 0, muharraq_pm25_sum = 0, muharraq_pm10_sum = 0, muharraq_co_avg, muharraq_pm25_avg, muharraq_pm10_avg, muharraq_aqi_avg, muharraq_aqi_pm10, muharraq_aqi_pm25, muharraq_aqi_co, muharraq_aqi_var, counter = 0, day;
    function calculate_avg() {
        if (today != last_day) { //in 24 hour
            muharraq_co_avg = muharraq_co_sum / counter;
            muharraq_pm10_avg = muharraq_pm10_sum / counter;
            muharraq_pm25_avg = muharraq_pm25_sum / counter;
            muharraq_aqi_pm10 = ((Ihi_pm10 - Ilo_pm10) / (BPhi_pm10 - BPlo_pm10)) * (pm10_var - BPlo_pm10) + Ilo_pm10;
            muharraq_aqi_pm25 = ((Ihi_pm25 - Ilo_pm25) / (BPhi_pm25 - BPlo_pm25)) * (pm25_var - BPlo_pm25) + Ilo_pm25;
            muharraq_aqi_co = ((Ihi_co - Ilo_co) / (BPhi_co - BPlo_co)) * (co_var - BPlo_co) + Ilo_co;
            muharraq_aqi_var = Math.max(muharraq_aqi_co, muharraq_aqi_pm10, muharraq_aqi_pm25);
            muharraq_co_sum = 0;
            muharraq_pm10_sum = 0;
            muharraq_pm25_sum = 0;
            console.log("muh_aqi" + muharraq_aqi_var);
            console.log("muh_pm10" + muharraq_aqi_pm10);
            console.log("muh_pm25" + muharraq_aqi_pm25);
            console.log("muh_co" + muharraq_aqi_co);
            console.log("counter" + counter);
            console.log("today", today);
            console.log("last day", last_day);
            counter = 0;
            last_day = today;
            
            
            
        }
        else {
            counter += 1;
            muharraq_co_sum += co_var;
            muharraq_pm25_sum += pm25_var;
            muharraq_pm10_sum += pm10_var;
            console.log("muh_pm10" + muharraq_pm10_sum);
            console.log("muh_pm25" + muharraq_pm25_sum);
            console.log("muh_co" + muharraq_co_sum);
            console.log("counter" + counter);
            console.log("today", today);
            console.log("last_day", last_day);   
        }
    }
    // calculate_avg();
        
    const avg_ref = ref(db, 'air_parameters/averages/');
    set(avg_ref, {
        "muharraq": {
            [epoch_string]: {
                "aqi_avg": [muharraq_aqi_avg],
                "co_avg": [muharraq_co_avg],
                "pm10_avg": [muharraq_pm10_avg],
                "pm25_avg": [muharraq_pm25_avg]
            }
        },
        "capital": {
            [epoch_string]: {
                "aqi_avg": 10,
                "co_avg": 11,
                "pm10_avg": 12,
                "pm25_avg": 13
            }
        },
        "southern": {
            [epoch_string]: {
                "aqi_avg": 10,
                "co_avg": 11,
                "pm10_avg": 12,
                "pm25_avg": 13
            }
        },
        "northern": {
            [epoch_string]: {
                "aqi_avg": 10,
                "co_avg": 11,
                "pm10_avg": 12,
                "pm25_avg": 13
            }
        }
    });

   



});
