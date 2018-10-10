# HeartRate_Pulsoid

This simple project is used to scrape data from a pulsoid URL and place it into Splunk. It was created by Ryan O'Connor and Tony Vincent. 


This has been verified and working on an Amazon Linux 2 EC2 AMI and an m4.4 Large. Though it should be fairly portable to other operating systems.  


To use this, first install node. On Amazon Linux 2 EC2 That looks like the following:

```
sudo yum install -y nodejs gcc-c++ make
```

Next, clone the repository to your local machine.

1. CD into the HeartRate_Pulsoid directory

2. Run npm install

3. Modify the scrape.js file in three places. Details below

You'll need to collect three things. 

1. your HTTP Event Collector Token from Splunk
2. The HTTP Event Collector URL/Port
3. your Pulsoid URL. 

Within the script you'll see three strings to be replaced. 

* your-pulsoid-url
* http://your-HEC-URL:8088
* your-token-here

You'll want to replace :

* "your-token-here" with your HTTP Event Collector Token
* http://your-HEC-URL:8088 with your HTTP Event Collector URL
* your-pulsoid-url with your pulsoid URL

I'll have an attached video later on with information on how to find all of those.

## Running the script

To run the script you'll simply issue the command:

```
node scrape.js
```

You should see the following output:

```
{ message: { heartrate: '146' } }
Sending payload { message: { heartrate: '146' } }
Response from Splunk { text: 'Success', code: 0 }
```
