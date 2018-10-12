#!/usr/bin/env sh

for i in {1..10}
do
  node ~/HeartRate_Pulsoid/scrape.js
  sleep 5s
done
