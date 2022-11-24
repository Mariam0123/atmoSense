// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, onValue, ref, update, limitToLast, query, orderByKey, set, onChildAdded } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
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

var latest_timestamps, time_var, temp_var, hum_var, co2_var, co_var, formaldahide_var, tvoc_var, pm10_var, pm25_var, lat, lon, counter, flag;
var Ihi_pm10, Ihi_co, Ihi_pm25, Ilo_pm10, Ilo_co, Ilo_pm25, BPhi_pm10, BPlo_pm25, BPhi_co, BPlo_co, BPhi_pm25, BPlo_pm10;
var epoch_day, day, epoch_date;
var muharraq_co_sum = 0, muharraq_pm25_sum = 0, muharraq_pm10_sum = 0, muharraq_co_avg, muharraq_pm25_avg, muharraq_pm10_avg, muharraq_aqi_avg, muharraq_aqi_pm10, muharraq_aqi_pm25, muharraq_aqi_co, muharraq_aqi_var, capital_aqi_var, southern_aqi_var, northern_aqi_var, counter = 0, day;
var primary_pollutant;

var concerned_element = document.getElementById("concerned_text");
var advice_element = document.getElementById("advice_text");
var advice_header = document.getElementById("advice_text_header");
var concerned_header = document.getElementById("concerned_text_header");
var aqi_header = document.getElementById("aqi_header");
var pollutant_header = document.getElementById("pollutant_header");
var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var temp_element = document.getElementById('temp');
var hum_element = document.getElementById('hum');
var date_time_element = document.getElementById("date_time");
var co_element = document.getElementById("co_value");
var co2_element = document.getElementById("co2_value");
var formaldahide_element = document.getElementById("formaldahide_value");
var pm25_element = document.getElementById("pm25_value");
var pm10_element = document.getElementById("pm10_value");
var tvoc_element = document.getElementById("tvoc_value");
const concerned = ["Air quality is great!", "Some people who may be unusually sensitive to particle pollution.", "Sensitive groups include people with heart or lung disease, older adults, children and teenagers.", "Everyone"];
const advice = ["It's a great day to be active outside.", "<b>Unusually sensitive people:</b> Consider reducing prolonged or heavy exertion. Watch for symptoms such as coughing or shortness of breath. These are signs to take it easier. </br></br><b>Everyone else: </b> It's a good day to be active outside.", "<b>Sensitive groups: </b>Reduce prolonged or heavy exertion. It's OK to be active outside, but take more breaks and do less intense activities. Watch for symptoms such as coughing or shortness of breath. </br></br><b>People with asthma </b>should follow their asthma action plans and keep quick relief medicine handy. </br></br><b>If you have heart disease: </b>Symptoms such as palpitations, shortness of breath, or unusual fatigue may indicate a serious problem. If you have any of these, contact your heath care provider.", "<b>Sensitive groups:</b> Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling. </b><b>Everyone else:</b> Reduce prolonged or heavy exertion. Take more breaks during outdoor activities.", "<b>Sensitive groups:</b> Avoid all physical activity outdoors. Move activities indoors or reschedule to a time when air quality is better. </br></br><b>Everyone else: </b>Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.", "<b>Everyone:</b> Avoid all physical activity outdoors. </br></br><b>Sensitive groups:</b> Remain indoors and keep activity levels low. Make sure particle pollution indoors is low. "];
const comments = ["Good", "Moderate", "Unhealthy for sensitive groups", "Unhealthy", "Very Unhealthy", "Hazardous"];
const colors = ['#f5365c', "#A0DC65", '#FDD853', '#FE9B58', '#FF6C70', '#A87CBD', "#d10404"];
const muharraq_coordinates = [[50.629623, 26.265227], [50.629002, 26.265463], [50.627711, 26.266278], [50.62746, 26.266535], [50.627078, 26.266889], [50.62672, 26.267114], [50.626397, 26.267189], [50.625895, 26.267243], [50.625704, 26.26735], [50.623852, 26.268358], [50.623481, 26.268561], [50.623195, 26.268594], [50.622657, 26.268701], [50.622083, 26.268679], [50.621939, 26.268655], [50.62114, 26.268402], [50.620049, 26.268039], [50.61957, 26.267891], [50.619214, 26.267712], [50.618876, 26.267525], [50.618451, 26.267338], [50.617864, 26.267051], [50.617365, 26.266724], [50.616977, 26.266468], [50.616641, 26.266228], [50.616396, 26.265998], [50.616139, 26.265746], [50.615983, 26.265541], [50.615848, 26.265351], [50.615662, 26.265121], [50.615533, 26.264835], [50.615411, 26.264534], [50.6153, 26.264228], [50.615202, 26.264041], [50.61508, 26.263846], [50.614925, 26.263606], [50.61473, 26.263382], [50.614469, 26.263177], [50.614224, 26.263002], [50.613947, 26.262837], [50.613571, 26.262698], [50.613321, 26.262617], [50.612625, 26.262395], [50.612039, 26.262193], [50.611535, 26.262047], [50.611131, 26.261898], [50.610599, 26.261675], [50.609973, 26.261394], [50.60968, 26.261274], [50.609387, 26.26119], [50.609018, 26.261098], [50.608618, 26.261014], [50.60787, 26.260868], [50.607265, 26.260795], [50.606779, 26.260788], [50.605634, 26.260759], [50.604484, 26.260741], [50.603313, 26.260709], [50.602241, 26.260672], [50.600809, 26.260591], [50.600348, 26.260525], [50.600011, 26.260477], [50.599381, 26.260314], [50.598549, 26.260041], [50.597837, 26.259747], [50.596666, 26.259031], [50.59598, 26.258444], [50.595551, 26.258021], [50.595049, 26.257438], [50.594713, 26.25697], [50.594469, 26.256525], [50.59423, 26.256075], [50.594098, 26.255703], [50.593972, 26.255231], [50.592988, 26.252174], [50.594659, 26.256514], [50.594826, 26.256867], [50.595153, 26.257312], [50.595465, 26.257714], [50.595799, 26.258081], [50.596283, 26.258538], [50.596717, 26.258829], [50.597352, 26.259226], [50.597911, 26.259555], [50.598335, 26.259778], [50.598602, 26.25995], [50.599078, 26.260122], [50.599454, 26.260234], [50.599905, 26.260369], [50.600297, 26.260414], [50.601576, 26.260516], [50.603311, 26.260595], [50.605508, 26.260628], [50.607692, 26.260717], [50.608815, 26.260952], [50.609784, 26.261131], [50.610969, 26.261702], [50.612355, 26.262205], [50.613952, 26.26272], [50.614557, 26.26305], [50.615019, 26.263408], [50.615218, 26.263699], [50.615518, 26.264214], [50.615755, 26.264874], [50.616055, 26.265311], [50.61623, 26.265702], [50.616554, 26.265948], [50.617103, 26.266407], [50.618327, 26.267213], [50.61955, 26.26775], [50.620973, 26.268231], [50.622078, 26.268535], [50.62229, 26.268535], [50.622427, 26.268389], [50.62249, 26.268166], [50.622415, 26.267852], [50.622215, 26.267315], [50.62174, 26.266062], [50.621478, 26.265155], [50.621403, 26.264909], [50.621503, 26.264696], [50.621717, 26.264641], [50.622575, 26.264508], [50.623538, 26.264342], [50.624131, 26.264231], [50.624316, 26.264219], [50.624424, 26.26425], [50.624622, 26.264355], [50.624961, 26.26486], [50.62509, 26.26491], [50.625232, 26.265065], [50.625246, 26.265185], [50.625223, 26.265233], [50.625162, 26.265277], [50.62509, 26.265289], [50.625012, 26.265246], [50.624931, 26.2651], [50.624897, 26.265003], [50.62485, 26.26492], [50.624744, 26.264755], [50.624532, 26.264474], [50.62445, 26.264406], [50.624371, 26.264361], [50.624276, 26.264345], [50.622556, 26.264623], [50.622031, 26.264724], [50.621924, 26.26479], [50.62183, 26.264878], [50.621799, 26.264984], [50.621787, 26.265126], [50.621838, 26.265546], [50.621964, 26.266061], [50.622411, 26.267193], [50.622621, 26.267559], [50.622775, 26.26787], [50.622856, 26.267969], [50.622932, 26.26806], [50.623051, 26.26816], [50.623204, 26.268206], [50.623351, 26.268245], [50.623501, 26.268253], [50.623732, 26.268222], [50.623922, 26.268136], [50.625262, 26.267377], [50.626602, 26.266656], [50.627513, 26.266147], [50.629622, 26.264942], [50.630656, 26.264361], [50.63102, 26.264149], [50.631174, 26.264101], [50.631274, 26.264161], [50.631322, 26.264239], [50.631319, 26.264342], [50.631294, 26.264434], [50.631207, 26.264509], [50.630994, 26.264628], [50.630753, 26.264685], [50.63061, 26.264754], [50.629979, 26.265112], [50.62967, 26.265285], [50.593128, 26.252234], [50.594351, 26.255912], [50.594493, 26.256232], [50.595153, 26.257312], [50.595465, 26.257714], [50.595799, 26.258081], [50.596283, 26.258538], [50.596717, 26.258829], [50.597352, 26.259226], [50.597911, 26.259555], [50.598335, 26.259778], [50.598602, 26.25995], [50.599078, 26.260122], [50.599454, 26.260234], [50.599905, 26.260369], [50.600297, 26.260414], [50.601576, 26.260516], [50.603311, 26.260595], [50.605508, 26.260628], [50.607692, 26.260717], [50.608815, 26.260952], [50.609784, 26.261131], [50.610969, 26.261702], [50.612355, 26.262205], [50.613952, 26.26272], [50.614557, 26.26305], [50.615019, 26.263408], [50.615218, 26.263699], [50.615518, 26.264214], [50.615755, 26.264874], [50.616055, 26.265311], [50.61623, 26.265702], [50.616554, 26.265948], [50.617103, 26.266407], [50.618327, 26.267213], [50.61955, 26.26775], [50.620973, 26.268231], [50.622078, 26.268535], [50.62229, 26.268535], [50.622427, 26.268389], [50.62249, 26.268166], [50.622415, 26.267852], [50.622215, 26.267315], [50.62174, 26.266062], [50.621478, 26.265155], [50.621403, 26.264909], [50.621503, 26.264696], [50.621717, 26.264641], [50.622575, 26.264508], [50.623538, 26.264342], [50.624131, 26.264231], [50.624316, 26.264219], [50.624424, 26.26425], [50.624622, 26.264355], [50.624961, 26.26486], [50.62509, 26.26491], [50.625232, 26.265065], [50.625246, 26.265185], [50.625223, 26.265233], [50.625162, 26.265277], [50.62509, 26.265289], [50.625012, 26.265246], [50.624931, 26.2651], [50.624897, 26.265003], [50.62485, 26.26492], [50.624744, 26.264755], [50.624532, 26.264474], [50.62445, 26.264406], [50.624371, 26.264361], [50.624276, 26.264345], [50.622556, 26.264623], [50.622031, 26.264724], [50.621924, 26.26479], [50.62183, 26.264878], [50.621799, 26.264984], [50.621787, 26.265126], [50.621838, 26.265546], [50.621964, 26.266061], [50.622411, 26.267193], [50.622621, 26.267559], [50.622775, 26.26787], [50.622856, 26.267969], [50.622932, 26.26806], [50.623051, 26.26816], [50.623204, 26.268206], [50.623351, 26.268245], [50.623501, 26.268253], [50.623732, 26.268222], [50.623922, 26.268136], [50.625262, 26.267377], [50.626602, 26.266656], [50.627513, 26.266147], [50.629622, 26.264942], [50.630656, 26.264361], [50.63102, 26.264149], [50.631174, 26.264101], [50.631274, 26.264161], [50.631322, 26.264239], [50.631319, 26.264342], [50.631294, 26.264434], [50.631207, 26.264509], [50.630994, 26.264628], [50.630753, 26.264685], [50.63061, 26.264754], [50.629979, 26.265112], [50.62967, 26.265285]];

function muharraq_advice_update() {
    if (muharraq_aqi_var < 1 || muharraq_aqi_var > 500) {

        concerned_element.innerHTML = "Error in data";
        advice_element.innerHTML = "Please use other resources.";

        document.getElementById("aqi_value_text").innerHTML = "-";
        document.getElementById("comment").innerHTML = "";
        $('#aqi_value').css({ 'background': '#f5365c ' });
        advice_header.style.color = colors[0];
        concerned_header.style.color = colors[0];
        aqi_header.style.color = colors[0];
        pollutant_header.style.color = colors[0];
        icon1.style.color = colors[0];
        icon2.style.color = colors[0];

    }
    else if (muharraq_aqi_var >= 1 & muharraq_aqi_var < 51) {
        concerned_element.innerHTML = concerned[0];
        advice_element.innerHTML = advice[0];
        document.getElementById("aqi_value_text").innerHTML = Math.round(muharraq_aqi_var);
        document.getElementById("comment").innerHTML = comments[0];

        $('#aqi_value').css({ 'background': '#A0DC65' });
        advice_header.style.color = colors[1];
        concerned_header.style.color = colors[1];
        aqi_header.style.color = colors[1];
        pollutant_header.style.color = colors[1];
        icon1.style.color = colors[1];
        icon2.style.color = colors[1];

    }
    else if (muharraq_aqi_var < 101) {
        concerned_element.innerHTML = concerned[1];
        advice_element.innerHTML = advice[1];

        document.getElementById("aqi_value_text").innerHTML = Math.round(muharraq_aqi_var);
        document.getElementById("comment").innerHTML = comments[1];

        $('#aqi_value').css({ 'background': '#FDD853' });
        advice_header.style.color = colors[2];
        concerned_header.style.color = colors[2];
        aqi_header.style.color = colors[2];
        pollutant_header.style.color = colors[2];
        icon1.style.color = colors[2];
        icon2.style.color = colors[2];

    }
    else if (muharraq_aqi_var < 151) {
        concerned_element.innerHTML = concerned[2];
        advice_element.innerHTML = advice[2];

        document.getElementById("aqi_value_text").innerHTML = Math.round(muharraq_aqi_var);
        document.getElementById("comment").innerHTML = comments[2];

        $('#aqi_value').css({ 'background': '#FE9B58' });
        advice_header.style.color = colors[3];
        concerned_header.style.color = colors[3];
        aqi_header.style.color = colors[3];
        pollutant_header.style.color = colors[3];
        icon1.style.color = colors[3];
        icon2.style.color = colors[3];

    }
    else if (muharraq_aqi_var < 201) {
        concerned_element.innerHTML = concerned[3];
        advice_element.innerHTML = advice[3];

        document.getElementById("aqi_value_text").innerHTML = Math.round(muharraq_aqi_var);
        document.getElementById("comment").innerHTML = comments[3];

        $('#aqi_value').css({ 'background': '#FF6C70' });
        advice_header.style.color = colors[4];
        concerned_header.style.color = colors[4];
        aqi_header.style.color = colors[4];
        pollutant_header.style.color = colors[4];
        icon1.style.color = colors[4];
        icon2.style.color = colors[4];

    }
    else if (muharraq_aqi_var < 301) {
        concerned_element.innerHTML = concerned[3];
        advice_element.innerHTML = advice[4];

        document.getElementById("aqi_value_text").innerHTML = Math.round(muharraq_aqi_var);
        document.getElementById("comment").innerHTML = comments[4];

        $('#aqi_value').css({ 'background': '#A87CBD' });
        advice_header.style.color = colors[5];
        concerned_header.style.color = colors[5];
        aqi_header.style.color = colors[5];
        pollutant_header.style.color = colors[5];
        icon1.style.color = colors[5];
        icon2.style.color = colors[5];

    }
    else if (muharraq_aqi_var < 501) {
        concerned_element.innerHTML = concerned[3];
        advice_element.innerHTML = advice[5];

        document.getElementById("aqi_value_text").innerHTML = Math.round(muharraq_aqi_var);
        document.getElementById("comment").innerHTML = comments[5];

        $('#aqi_value').css({ 'background': '#d10404 ' });
        advice_header.style.color = "#d10404 ";
        concerned_header.style.color = "#d10404 ";
        aqi_header.style.color = "#d10404 ";
        pollutant_header.style.color = "#d10404 ";
        icon1.style.color = "#d10404 ";
        icon2.style.color = "#d10404 ";
    }

}

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
function update_pollutant_colors(co, co2, form, pm10, pm25, tvoc) {
    if (co < 51 && co2 < 91) {
        co_element.style.color = colors[0];
    }

}

function calculate_flag(endDate, startDate) {
    const msInDay = 24 * 60 * 60;
    var days = Math.round(Math.abs(endDate - startDate) / msInDay);

    if (days > 0) return true;
    else return false;
}

const new_ref = query(ref(db, 'air_parameters/values'), orderByKey(), limitToLast(2)); // get latest node and second latest to compare

onValue(new_ref, (data) => {
    var jsonData = data.toJSON();
    time_var = Object.keys(jsonData)[1].toString(); // two latest epoch timestamps
    latest_timestamps = Object.keys(jsonData); // two latest epoch timestamps    
    flag = (calculate_flag(latest_timestamps[0], latest_timestamps[1]));

    temp_var = jsonData[time_var]['temp'];
    hum_var = jsonData[time_var]['hum'];
    co_var = jsonData[time_var]['co'];
    co2_var = jsonData[time_var]['co2'];
    formaldahide_var = jsonData[time_var]['formaldahide'];
    tvoc_var = jsonData[time_var]['tvoc'];
    pm10_var = jsonData[time_var]['pm10'];
    pm25_var = jsonData[time_var]['pm25'];
    counter = jsonData[time_var]['counter'];
    lat = jsonData[time_var]['lat'];
    lon = jsonData[time_var]['lon'];

    var d = new Date(0);
    d.setUTCSeconds(time_var);
    [epoch_date] = d.toISOString().split('T');
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", seconds: "numeric" };



    temp_element.innerHTML = temp_var + "°C";
    hum_element.innerHTML = hum_var + "%";
    date_time_element.innerHTML = d.toLocaleString("en-GB", options);
    co_element.innerHTML = co_var + "<span class='unit'>ppm</span>";
    co2_element.innerHTML = co2_var + '<span class="unit">ppm</span>';
    formaldahide_element.innerHTML = formaldahide_var + '<span class="unit">µg/m³</span>';
    pm25_element.innerHTML = pm25_var + '<span class="unit">µg/m³</span>';
    pm10_element.innerHTML = pm10_var + '<span class="unit">µg/m³</span>';
    tvoc_element.innerHTML = tvoc_var + '<span class="unit">µg/m³</span>';
    co_values(co_var);
    pm10_values(pm10_var);
    pm25_values(pm25_var);

    if (flag) {
        var node_keys;
        const get_values_ref = query(ref(db, 'air_parameters/values'), orderByKey(), limitToLast(counter));
        onValue(get_values_ref, (data) => { //to retrive values
            if (flag) { //in 24 hour
                var jsonAvgData = data.toJSON();
                var pm10_sum = 0, pm25_sum = 0, co_sum = 0;
                var current_lat, current_lon;

                node_keys = Object.keys(jsonAvgData);
                for (var key of node_keys) {
                    var string_key = key.toString();
                    pm10_sum += jsonAvgData[string_key]['pm10'];
                    pm25_sum += jsonAvgData[string_key]['pm25'];
                    co_sum += jsonAvgData[string_key]['co'];
                    current_lon = jsonAvgData[string_key]['lon'];
                    current_lat = jsonAvgData[string_key]['lat'];


                }

                muharraq_co_avg = co_sum / counter;
                muharraq_pm10_avg = pm10_sum / counter;
                muharraq_pm25_avg = pm25_sum / counter;

                muharraq_aqi_pm10 = ((Ihi_pm10 - Ilo_pm10) / (BPhi_pm10 - BPlo_pm10)) * (muharraq_pm10_avg - BPlo_pm10) + Ilo_pm10;
                muharraq_aqi_pm25 = ((Ihi_pm25 - Ilo_pm25) / (BPhi_pm25 - BPlo_pm25)) * (muharraq_pm25_avg - BPlo_pm25) + Ilo_pm25;
                muharraq_aqi_co = ((Ihi_co - Ilo_co) / (BPhi_co - BPlo_co)) * (muharraq_co_avg - BPlo_co) + Ilo_co;
                muharraq_aqi_var = Math.max(muharraq_aqi_co, muharraq_aqi_pm10, muharraq_aqi_pm25);


                const aqi_set_ref = ref(db, 'air_parameters/aqis/' + epoch_date);
                set(aqi_set_ref,
                    {
                        "muharraq": {
                            "aqi": muharraq_aqi_var.valueOf(),
                            "co_aqi": muharraq_aqi_co.valueOf(),
                            "pm10_aqi": muharraq_aqi_pm10.valueOf(),
                            "pm25_aqi": muharraq_aqi_pm25.valueOf()
                        },
                        "capital": {
                            "aqi": 10,
                            "co_aqi": 11,
                            "pm10_aqi": 12,
                            "pm25_aqi": 13
                        },
                        "southern": {
                            "aqi": 10,
                            "co_aqi": 11,
                            "pm10_aqi": 12,
                            "pm25_aqi": 13
                        },
                        "northern": {
                            "aqi": 10,
                            "co_aqi": 11,
                            "pm10_aqi": 12,
                            "pm25_aqi": 13
                        }
                    }
                );

                counter = 1;
                const ref_string = 'air_parameters/values/'+time_var;
                const counter_query_ref = ref(db, ref_string);
                update(counter_query_ref, {'counter':1});
                

            }
        });
    }
    else {
        
        var key_2nd_last_node = latest_timestamps[0].toString();
        var last_counter_2 = jsonData[key_2nd_last_node]['counter'];
        if (counter != (last_counter_2 +1 )){
            counter = last_counter_2 + 1;
            const ref_string = 'air_parameters/values/'+time_var;
            const counter_query_ref = ref(db, ref_string);
            update(counter_query_ref, {'counter':counter.valueOf()});
        }
        else {
            counter = counter;
        }
        

        
    }
    

    const aqi_query_ref = ref(db, 'air_parameters/aqis');
    onValue(aqi_query_ref, (data) => { //to retrive values
        var jsonAQIData = data.toJSON();
        muharraq_co_avg = jsonAQIData[epoch_date]['muharraq']['co_aqi'];
        muharraq_pm10_avg = jsonAQIData[epoch_date]['muharraq']['pm10_aqi'];
        muharraq_pm25_avg = jsonAQIData[epoch_date]['muharraq']['pm25_aqi'];
        muharraq_aqi_var = jsonAQIData[epoch_date]['muharraq']['aqi'];
        capital_aqi_var = jsonAQIData[epoch_date]['capital']['aqi'];
        southern_aqi_var = jsonAQIData[epoch_date]['southern']['aqi'];
        northern_aqi_var = jsonAQIData[epoch_date]['northern']['aqi'];

        var aqi_val_element = document.getElementById("aqi_val");
        var average_aqis = (muharraq_aqi_var + capital_aqi_var + southern_aqi_var + northern_aqi_var) / 4;
        aqi_val_element.innerHTML = Math.round(average_aqis);

        var pollutant_array = ["CO", "PM10", "PM2.5"];
        var pollutant_values = [muharraq_co_avg.valueOf(), muharraq_pm10_avg.valueOf(), muharraq_pm25_avg.valueOf()];
        var prim_poll = document.getElementById("primary_pollutant");
        var maximum = Math.max.apply(Math, pollutant_values);
        if (muharraq_aqi_var < 1 || muharraq_aqi_var > 500) {
            prim_poll.innerHTML = "Error";
        }
        else {
            var maxIndex = pollutant_values.indexOf(maximum);
            var primary_pollutant = pollutant_array[maxIndex];
            prim_poll.innerHTML = primary_pollutant;
        }

        muharraq_advice_update();



    });




});

export { app, firebaseConfig };