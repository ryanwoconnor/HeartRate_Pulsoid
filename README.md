# HeartRate_Pulsoid

This simple project is used to scrape data from a pulsoid URL and place it into Splunk. It was created by Ryan O'Connor. 


This has been verified and working on an Amazon Linux EC2 AMI. 


To use this, install node. 

Then clone the repository to your local machine.

CD into the HeartRate_Pulsoid directory

Run npm install

Modify the file in three places. 

You'll need your HTTP Event Collector Token from Splunk, The HTTP Event Collector URL/Port, and your Pulsoid URL. 

Within the script you'll see three strings:

your-pulsoid-url
http://your-HEC-URL:8088
your-token-here

You'll want to replace :

*"your-token-here" with your HTTP Event Collector Token
*http://your-HEC-URL:8088 with your HTTP Event Collector URL
*your-pulsoid-url with your pulsoid URL

I'll have an attached video later on with information on how to find all of those.
