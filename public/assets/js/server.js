function find_governerate(lat, lon) {
    for (let i = 0; i < muharraq.length; i++) {
        if (lat == muharraq[i][0] && lon == muharraq[i][1])
            return "Muharraq";

    }

    for (let i = 0; i < capital.length; i++) {
        if (lat == capital[i][0] && lon == capital[i][1])
            return "Capital";

    }
    for (let i = 0; i < northern.length; i++) {
        if (lat == northern[i][0] && lon == northern[i][1])
            return "Northern";

    }
    for (let i = 0; i < southern.length; i++) {
        if (lat == southern[i][0] && lon == southern[i][1])
            return "Southern";

    }
    return "Error";
}
function calculate_flag(endDate, startDate) {
    var d1 = new Date(0);
    d1.setUTCSeconds(startDate);
    var d2 = new Date(0);
    d2.setUTCSeconds(endDate);

    return (d1.getDay() != d2.getDay());
}
function calculate_aqi(jsonAvgData, governerate, counter) {
    var node_keys = Object.keys(jsonAvgData);
    var pm10_sum = 0;
    var pm25_sum = 0;
    for (var key of node_keys) {
        var string_key = key.toString();
        pm10_sum += jsonAvgData[string_key]['pm10'];
        pm25_sum += jsonAvgData[string_key]['pm25'];
    }
   
    pm10_avg = pm10_sum / counter;
    pm25_avg = pm25_sum / counter;
    pm10_values(pm10_avg);
    pm25_values(pm25_avg);
   
    aqi_pm10 = ((Ihi_pm10 - Ilo_pm10) / (BPhi_pm10 - BPlo_pm10)) * (pm10_avg - BPlo_pm10) + Ilo_pm10;
    aqi_pm25 = ((Ihi_pm25 - Ilo_pm25) / (BPhi_pm25 - BPlo_pm25)) * (pm25_avg - BPlo_pm25) + Ilo_pm25;

    aqi_var = Math.max(aqi_pm10, aqi_pm25);
    const aqi_set_ref = db.ref('air_parameters/' + governerate + "/aqis/" + epoch_date);
    aqi_set_ref.set(
        {
            "aqi": aqi_var.valueOf(),
            "pm10_aqi": aqi_pm10.valueOf(),
            "pm25_aqi": aqi_pm25.valueOf()
        }
    );

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

const admin = require('firebase-admin');
var serviceAccount = require('./admin.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: "https://airquality-monitor-36278-default-rtdb.europe-west1.firebasedatabase.app", authDomain: "airquality-monitor-36278.firebaseapp.com", });

/* should get the two latest time stamps to figure out the flag.
 Should first separate into governerates. - done
After flag done calculate aqi*/
var latest_timestamps, time_var, temp_var, hum_var, co2_var, formaldahide_var, tvoc_var, pm10_var, pm25_var, lat, lon, counter, flag, clicked_governerate;
var Ihi_pm10, Ihi_pm25, Ilo_pm10, Ilo_pm25, BPhi_pm10, BPlo_pm25, BPhi_pm25, BPlo_pm10;
var epoch_date;
var pm25_avg, pm10_avg, aqi_pm10, aqi_pm25, aqi_var, muharraq_aqi_var, capital_aqi_var, southern_aqi_var, northern_aqi_var, counter = 0;

const muharraq = [[50.629623, 26.265227], [50.625895, 26.267243], [50.621939, 26.268655], [50.617864, 26.267051], [50.615848, 26.265351], [50.614469, 26.263177], [50.611131, 26.261898], [50.607265, 26.260795], [50.600011, 26.260477], [50.594713, 26.25697], [50.592988, 26.252174]];
const capital = [
    [50.592466, 26.250699],
    [50.590808, 26.24811],
    [50.588739, 26.245996],
    [50.584474, 26.242957],
    [50.579868, 26.240163],
    [50.57608, 26.237683],
    [50.575712, 26.236792],
    [50.576228, 26.235103],
    [50.57418, 26.233666],
    [50.572315, 26.232347],
    [50.571168, 26.231266],
    [50.570324, 26.230329],
    [50.568715, 26.229972],
    [50.568488, 26.229486],
    [50.564397, 26.227166],
    [50.561324, 26.23076],
    [50.560311, 26.235096],
    [50.557129, 26.234628],
    [50.556841, 26.232287],
    [50.556505, 26.232251],
    [50.553284, 26.232176],
    [50.55161, 26.232532],
    [50.550991, 26.235106],
    [50.546315, 26.234661],
    [50.54175, 26.234614],
    [50.536958, 26.234574],
    [50.536847, 26.234574],
    [50.535734, 26.234569],
    [50.534035, 26.234798],
    [50.53378, 26.234719],
    [50.533737, 26.233568],
    [50.534065, 26.231769],
    [50.533818, 26.23099],
    [50.53271, 26.230501],
    [50.531304, 26.22984],
    [50.528643, 26.228286],
    [50.527847, 26.227737],
    [50.523897, 26.224562],
    [50.523593, 26.22424],
    [50.522393, 26.222281],
    [50.522087, 26.221577],
    [50.521886, 26.219927]
]

const northern = [
    [50.520808, 26.216493],
    [50.517001, 26.208625],
    [50.511726, 26.201707],
    [50.505719, 26.19316],
    [50.503564, 26.187154],
    [50.502401, 26.180678],
    [50.502244, 26.17407],
    [50.50412, 26.162626],
    [50.509183, 26.147628],
    [50.510123, 26.141013],
    [50.501229, 26.142392],
    [50.499923, 26.142793],
    [50.496557, 26.143564],
    [50.492923, 26.144302],
    [50.493607, 26.143972],
    [50.496323, 26.143488],
    [50.499343, 26.142411],
    [50.498905, 26.140128],
    [50.49785, 26.136502],
    [50.497489, 26.134443],
    [50.497738, 26.131761],
    [50.497718, 26.128974],
    [50.493792, 26.121921],
    [50.496289, 26.115533],
    [50.500096, 26.115836],
    [50.503962, 26.110726],
    [50.504206, 26.108063],
    [50.504868, 26.10548],
    [50.503848, 26.104059],
    [50.501463, 26.103546],
    [50.501178, 26.103546],
    [50.499453, 26.103403],
    [50.4987, 26.103389],
    [50.497997, 26.10326],
    [50.499889, 26.098093],
    [50.500064, 26.096851],
    [50.502598, 26.097197],
    [50.504785, 26.096907],
    [50.505486, 26.096211],
    [50.505994, 26.094115],
    [50.507138, 26.092872],
    [50.509516, 26.086515],
    [50.50899, 26.08509],
    [50.506596, 26.081107],
    [50.506531, 26.078382],
    [50.507431, 26.071722],
    [50.507523, 26.068635],
    [50.507523, 26.06257],
    [50.508754, 26.058856]
];

const southern = [[50.512893, 26.048726], [50.511687, 26.048826], [50.510753, 26.049754], [50.509833, 26.050572], [50.510386, 26.053678], [50.509842, 26.054164], [50.50903, 26.056458], [50.508725, 26.056735] ];


var db = admin.database();
const new_ref = db.ref('air_parameters/temp_values'); // get latest node in temp_values
new_ref.orderByKey().limitToLast(2).on('value', (data) => {
    var jsonData = data.toJSON();
    time_var = Object.keys(jsonData)[1].toString();

    latest_timestamps = Object.keys(jsonData); // two latest epoch timestamps 
    flag = calculate_flag(latest_timestamps[0], latest_timestamps[1]);

    if (!clicked_governerate) {
        temp_var = jsonData[time_var]['temp'];
        hum_var = jsonData[time_var]['hum'];
        co2_var = jsonData[time_var]['co2'];
        formaldahide_var = jsonData[time_var]['formaldahide'];
        tvoc_var = jsonData[time_var]['tvoc'];
        pm10_var = jsonData[time_var]['pm10'];
        pm25_var = jsonData[time_var]['pm25'];
        counter = jsonData[time_var]['counter'];
        lat = jsonData[time_var]['lat'];
        lon = jsonData[time_var]['lon'];
    }
    var current_governerate = find_governerate(lat, lon);
    if (current_governerate != "Error") {
        const sort_values = db.ref( 'air_parameters/' + current_governerate + '/values/' + time_var);
        sort_values.set(
            {
                co2: [co2_var][0],
                hum: [hum_var][0],
                temp: [temp_var][0],
                formaldahide: [formaldahide_var][0],
                pm10: [pm10_var][0],
                pm25: [pm25_var][0],
                tvoc: [tvoc_var][0],
                counter: [counter][0],
                lat: [lat][0],
                lon: [lon][0],
            });
    }
    var d = new Date(0);
    d.setUTCSeconds(time_var);
    [epoch_date] = d.toISOString().split('T');
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", seconds: "numeric" };

    // calculating aqis and adding data based on governerate should start here. 
    if (flag) {
        console.log("flag");
        if (current_governerate != "Error") {
            const get_muh_counter = db.ref('air_parameters/Muharraq/' + '/values');
            const get_cap_counter = db.ref('air_parameters/Capital/' + '/values');
            const get_north_counter = db.ref('air_parameters/Northern/' + '/values');
            const get_south_counter = db.ref('air_parameters/Southern/' + '/values');
            
            get_muh_counter.orderByKey().limitToLast(1).on("value", (data0) => {
                var muh_json = data0.toJSON();
                var muh_key = Object.keys(muh_json);
                var muh_counter = muh_json[muh_key]['counter'];
               
                get_cap_counter.orderByKey().limitToLast(1).on("value",  (data5) => {
                    var cap_json = data5.toJSON();
                    var cap_key = Object.keys(cap_json);
                    var cap_counter =cap_json[cap_key]['counter'];
                    get_south_counter.orderByKey().limitToLast(1).on("value",  (data6) => {
                        var south_json = data6.toJSON();
                        var south_key = Object.keys(south_json);
                        var south_counter =south_json[south_key]['counter'];
                        get_north_counter.orderByKey().limitToLast(1).on("value",  (data7) => {
                            var north_json = data7.toJSON();
                            var north_key = Object.keys(north_json);
                            var north_counter =north_json[north_key]['counter'];
                            
                            const get_muh_values_ref = db.ref('air_parameters/Muharraq/' + '/values');
                            const get_cap_values_ref = db.ref('air_parameters/Capital/' + '/values');
                            const get_north_values_ref = db.ref('air_parameters/Northern/' + '/values');
                            const get_south_values_ref = db.ref('air_parameters/Southern/' + '/values');
                           

                            get_muh_values_ref.orderByKey().limitToLast(muh_counter).on("value",  (data) => { //to retrive values
                                var muh_jsonAvgData = data.toJSON();
                                get_cap_values_ref.orderByKey().limitToLast(cap_counter).on("value",  (data2) => { //to retrive values
                                    var cap_jsonAvgData = data2.toJSON();
                                    get_north_values_ref.orderByKey().limitToLast(north_counter).on("value",  (data3) => { //to retrive values
                                        var north_jsonAvgData = data3.toJSON();
                                        get_south_values_ref.orderByKey().limitToLast(south_counter).on("value",  (data4) => { //to retrive values
                                            var south_jsonAvgData = data4.toJSON();

                                            calculate_aqi(muh_jsonAvgData, 'Muharraq', muh_counter);
                                            calculate_aqi(cap_jsonAvgData, 'Capital', cap_counter);
                                            calculate_aqi(north_jsonAvgData, 'Northern', north_counter);
                                            calculate_aqi(south_jsonAvgData, 'Southern', south_counter);
                                           
                                            const muh_ref_string = 'air_parameters/' + "Muharraq" + "/values/" + muh_key;
                                            const muh_query_ref = db.ref(muh_ref_string);
                                            muh_query_ref.update({ 'counter': 1 });
                                            const cap_ref_string = 'air_parameters/' + "Capital" + "/values/" + cap_key;
                                            const cap_query_ref = db.ref(cap_ref_string);
                                            cap_query_ref.update({ 'counter': 1 });
                                            const north_ref_string = 'air_parameters/' + "Northern" + "/values/" + north_key;
                                            const north_query_ref = db.ref(north_ref_string);
                                            north_query_ref.update({ 'counter': 1 });
                                            const south_ref_string = 'air_parameters/' + "Southern" + "/values/" + south_key;
                                            const south_query_ref = db.ref(south_ref_string);
                                            south_query_ref.update({ 'counter': 1 });
                                            flag=false;

                                        });
                                    });

                                });
                            });
                        });
                    });
                });
            });
        }
    }

    else {
        const get_values_ref = db.ref('air_parameters/' + current_governerate + '/values');

        get_values_ref.orderByKey().limitToLast(2).on('value', (data5) => { //to retrive values

            var jsonAvgData = data5.toJSON();
            var new_node_keys = Object.keys(jsonAvgData);

            var key_2nd_last_node = new_node_keys[0].toString();
            var key_last_node = new_node_keys[1].toString();

            var last_counter_2 = jsonAvgData[key_2nd_last_node]['counter'];

            var last_counter = jsonAvgData[key_last_node]['counter'];

            if (current_governerate != "Error") {
                if (last_counter != (last_counter_2 + 1)) {
                    last_counter = last_counter_2 + 1;

                    const ref_string = 'air_parameters/' + current_governerate + "/values/" + time_var;

                    const counter_query_ref = db.ref(ref_string);
                    counter_query_ref.update({ 'counter': last_counter.valueOf() });
                }
                else {
                    last_counter = last_counter;
                }
            }

        });

    }



})

