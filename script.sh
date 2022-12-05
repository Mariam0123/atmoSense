#!/bin/bash

#temp between 18 and 28 in dec
#humidity 60 to 68%
#decmeber average aqi is 73 to 20
#average pm10_aqi is 25 to  20
#average pm2.5_aqi is 17 to 6
#average pm10 is 25 to 20
#average pm2.5 is 9 to 3
epoch_time=1670100600;

# path="/air_parameters/temp_values/$epoch_time"
send_data(){
    # this function generates random values based on the ranges above and sends them to a firebase database.
    hum=$(shuf -i 60-68 -n1)
    temp=$(shuf -i 18-28 -n1)
    pm25=$(shuf -i 3-9 -n1)
    pm10=$(shuf -i 20-25 -n1)
    tvoc=$(shuf -i 20-50 -n1)
    co2=$(shuf -i 300-450 -n1)
    formaldahide=$(shuf -i 0-20 -n1)
    lat=50.627711
    lon=26.266278

    
    JSON=$(jo co2="$co2" counter=1 formaldahide="$formaldahide" temp="$temp" hum="$hum" lat="$lat" lon="$lon" pm10="$pm10" pm25="$pm25" tvoc="$tvoc")
    firebase database:set "/air_parameters/temp_values/${epoch_time}/" --data "$JSON" --force
}


while true; do
    let epoch_time=$epoch_time+5000;
    send_data;
    sleep 20;
done

