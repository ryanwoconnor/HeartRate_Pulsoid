# HeartRate_Pulsoid

This simple project is used to scrape data from a pulsoid URL and place it into Splunk. It was created by Ryan O'Connor and Tony Vincent.


This has been verified and working on the following..

| Operating System |
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


## General Instructions for downloading and Using the Package on all Operating Systems
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

## Running the script on all Operating Systems

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
