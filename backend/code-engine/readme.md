This is MeetCode RCE backend

Ok firs we need to connect to the instance
Run the following script

ssh -i "kenneth-in-cali.pem" ubuntu@ec2-18-189-21-62.us-east-2.compute.amazonaws.com
Step Two:
Setup EC2 Instance

sudo apt update
sudo apt upgrade

// install node
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

Install Dockcer
To install Docker on your Ubuntu EC2 instance, you can follow these steps:

Update the Package Index:
First, update the apt package index to ensure you have access to the latest packages.

bash
Copy code
sudo apt-get update
Install Required Packages:
Install packages that allow apt to use a repository over HTTPS.

bash
Copy code
sudo apt-get install \
 apt-transport-https \
 ca-certificates \
 curl \
 software-properties-common
Add Docker's Official GPG Key:
Add Docker’s official GPG key to verify the integrity of the packages.

bash
Copy code
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
Set up the Stable Repository:
Set up the Docker stable repository.

bash
Copy code
sudo add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) \
 stable"
Update the Package Index Again:
Update the apt package index again to include the newly added Docker repository.

bash
Copy code
sudo apt-get update
Install Docker CE (Community Edition):
Install the latest version of Docker CE.

bash
Copy code
sudo apt-get install docker-ce
Verify Installation:
Verify that Docker is installed correctly by running the hello-world image.

bash
Copy code
sudo docker run hello-world
If the installation was successful, you should see a message indicating that your Docker installation is working correctly.

Add Your User to the Docker Group (Optional):
By default, the Docker command can only be run by the root user or by a user in the docker group. To avoid using sudo for every Docker command, you can add your user to the docker group.

bash
Copy code
sudo usermod -aG docker $USER
After executing this command, you'll need to log out and log back in for the changes to take effect.

Now, Docker should be installed and ready to use on your Ubuntu EC2 instance.

Send the folder

rsync -avz --exclude 'node_modules' --exclude "sandBox" --exclude "tempSanbox" --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/kenneth-in-cali.pem" \
. ubuntu@ec2-18-189-21-62.us-east-2.compute.amazonaws.com:~/app

to restart the service
sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
sudo systemctl restart myapp.service

https://www.sammeechward.com/deploying-full-stack-js-to-aws-ec2#systemd

INCODE RCE is a sever that allow user to run code only via API the concep is prettu simple.

- User can create an account on the platform ( i will clone meettum code for that )
- user then create "generate an APi key
- USer "load they account with money 1-->100Request( let's keep it simple for now)
- we will supoort only 3 language for now then make sure
- they will make a requet with they key , the language , and the code
  and we return the solution .

step the create this

- Create a class that can generate keys for a user
- create a wallet class where user can "load money into they account"
- create a class that given a key it check it the user can execute code then then we charge you for everyh "suceful execution" the when succeful we dedtett with your account . and crete the awnser
