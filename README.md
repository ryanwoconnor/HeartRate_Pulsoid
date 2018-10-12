# HeartRate_Pulsoid

This simple project is used to scrape data from a Pulsoid URL (https://pulsoid.net/) and place it into Splunk. It was created by Ryan O'Connor and Tony Vincent.


Table of Contents
=================

   * [HeartRate Pulsoid Instructions](#heartrate_pulsoid)
      * [Supported Operating Systems](#supported-operating-systems)
      * [Prerequisite Instructions for Ubuntu 16.04](#prerequisite-instructions-for-ubuntu-1604)
      * [Prerequisite Instructions for Amazon Linux 2](#prerequisite-instructions-for-amazon-linux-2)
      * [Getting a Pulsoid URL](#getting-a-pulsoid-url)
      * [Downloading and Using the Package on all supported operating Systems](#downloading-and-using-the-package-on-all-supported-operating-systems)
      * [Running the script on all supported Operating Systems](#running-the-script-on-all-supported-operating-systems)
         * [Run the script once:](#run-the-script-once)
         * [Schedule the script:](#schedule-the-script)
         
         
## Supported Operating Systems

This has been verified and working on the following..

| Supported Operating Systems |
| --- |
| Amazon Linux 2 |
| Ubuntu 16.04 |


Though it should be fairly portable to other operating systems.


## Prerequisite Instructions for Ubuntu 16.04
To use this on Ubuntu 16.04, here are the instructions:

```
sudo apt-get install gdebi
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo gdebi google-chrome-stable_current_amd64.deb
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Prerequisite Instructions for Amazon Linux 2
To use this, first install node. On Amazon Linux 2 EC2 That looks like the following:

```
sudo yum install -y epel-release curl
curl --fail -sSL -o setup-nodejs https://rpm.nodesource.com/setup_8.x
sudo bash setup-nodejs
sudo yum install -y nodejs gcc-c++ make
sudo su
sudo touch /etc/yum.repos.d/google-chrome.repo
sudo echo -e "[google-chrome]\nname=google-chrome\nbaseurl=http://dl.google.com/linux/chrome/rpm/stable/\$basearch\nenabled=1\ngpgcheck=1\ngpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub" >> /etc/yum.repos.d/google-chrome.repo
sudo touch /etc/yum.repos.d/centos.repo
sudo echo -e "[CentOS-base]\nname=CentOS-6 - Base\nmirrorlist=http://mirrorlist.centos.org/?release=6&arch=x86_64&repo=os\ngpgcheck=1\ngpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-6\n\n" >> /etc/yum.repos.d/centos.repo
sudo echo -e "#released updates\n[CentOS-updates]\nname=CentOS-6 - Updates\nmirrorlist=http://mirrorlist.centos.org/?release=6&arch=x86_64&repo=updates\ngpgcheck=1\ngpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-6\n\n" >> /etc/yum.repos.d/centos.repo
sudo echo -e "#additional packages that may be useful\n[CentOS-extras]\nname=CentOS-6 - Extras\nmirrorlist=http://mirrorlist.centos.org/?release=6&arch=x86_64&repo=extras\ngpgcheck=1\ngpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-6\n" >> /etc/yum.repos.d/centos.repo
sudo yum install -y google-chrome-stable
google-chrome-stable --version
```

Next Modify your .bash_profile

Change:

```
export PATH
```
To: 

```
export PATH=~/.local/bin:$PATH
```

And finally run:

```
source ~/.bash_profile
```

## Getting a Pulsoid URL

It goes without saying that before you bother getting this URL, you should ensure you have a heartrate monitor. Up to date recommendations for a heart rate monitor can be found on the Pulsoid FAQ (https://pulsoid.net/faq). 

1. Once you sign up for Pulsoid (https://pulsoid.net) and have a working heart rate monitor you can go into the Configuration Page. 

2. From the configuration page click on "configure" for the widget "Heart rate(beats per minute) widget"

3. From this widget, copy the URL for for the Widget


## Downloading and Using the Package on all supported operating Systems

1. Clone the repository to your local machine.

2. CD into the HeartRate_Pulsoid directory

3. Run npm install

4. Modify the scrape.js file in three places. Details below

You'll need to collect three things. 

1. Your HTTP Event Collector Token from Splunk
2. The HTTP Event Collector URL/Port
3. Your Pulsoid URL. 

Within the script you'll see three strings to be replaced. 

* your-pulsoid-url
* http://your-HEC-URL:8088
* your-token-here

You'll want to replace :

* "your-token-here" with your HTTP Event Collector Token
* http://your-HEC-URL:8088 with your HTTP Event Collector URL
* your-pulsoid-url with your pulsoid URL

I'll have an attached video later on with information on how to find all of those.

## Running the script on all supported Operating Systems


### Run the script once:

Simply run the following command from the HeartRate_Pulsoid Directory

```
node scrape.js
```

You should see the following output:

```
{ message: { heartrate: '146' } }
Sending payload { message: { heartrate: '146' } }
Response from Splunk { text: 'Success', code: 0 }
```

### Schedule the script:

Within the HeartRate_Pulsoid directory you'll see a file called heart.sh. This script will run 10 times and sleep 5 seconds between each run. So if you schedule this in cron to run every minute, it will run every 5 seconds of every day. This is what your crontab may look like. 


```
* * * * * bash /home/ec2-user/HeartRate_Pulsoid/heart.sh
```
