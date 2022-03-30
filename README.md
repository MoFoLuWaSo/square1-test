![Web Blog logo](./public/images//logo/webblog_logo.png "Web Blog logo")
## About Web Blog

Web Blog is a fictitious blogging platform which i created for my recruitment project assignment at [Square 1](https://square1.io/).

For more details about the project please check the requirement document.

[Web Blog Requirement](https://github.com/MoFoLuWaSo/square1-test/blob/master/Square1-WebBlog%20Requirements%20Document.pdf)

## Domain of Interests
While focusing on the requirements of the project, I also used this project to highlight some of my basic areas of interests which includes:

- Research and Design
- DevOps Practices
- Frontend Development
- Backend Development
- Database design and Query optimization

## Tools

Throughout this project, I used the following tools and services

Design
- [Lucid Chart:](https://www.lucidchart.com/) for Architectural diagrams
- [Adobe Illustrator:](https://www.adobe.com/products/illustrator.html) for logo designs
- [Adobe Photoshop:](https://www.adobe.com/products/photoshop.html) for carousel image editing 
- [Adobe XD:](https://www.adobe.com/products/xd.html) for Mock up design
- [Freepik:](https://www.freepik.com) for free photos
- [Awwwards](https://www.awwwards.com) for design ideas

Programming
- [PHP Programming Language](https://php.net) for backend coding 
- [Laravel framework](https://laravel.com) for easy implementations of backend business logic
- [React.js](https://reactjs.org/) frontend javascript library for nice layout and easy navigation
- [Redux](https://redux.js.org/) Javascript Library for state management
- [Php Storm](https://www.jetbrains.com/phpstorm) for code editing: Love this so much for easy syntax highlighting, code formatting and quick navigation

Deployment 
- [AWS](https://aws.amazon.com): Cloud Formation, VPC, Subnets, EC2, RDS
- [CI/CD Pipeline](https://github.com): Github and Github Actions
- [Cloud Sphere](https://github.com/MoFoLuWaSo/CloudSphere) this is my custom tool for easy creation of cloud formation templates, when i'm not using terraform, i make use of this tool.


 ## Project Setup 
 
 You can clone this repository and test the deployments by following the instructions below.
 To run this deployment you need to have an aws account otherwise you might need to clone this
 repo and run it locally.
 
- Fork the repository 

`git clone https://github.com/MoFoLuWaSo/square1-test.git`

- Add the following credentials to the repo secrets in settings

`setting -> Secrets -> Actions -> New Repository secret`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`DB_DATABASE`

`DB_USERNAME`

`DB_PASSWORD`

 Github will make use of these credentials to access your AWS account and setup the database and other infrastructure for this project.
 
 Requirement from AWS
 - Region: eu-central region
    - Switch to eu-central region
 - KeyPair 
    - Create a key pair on AWS 
 - ImageId
    - Get an Amazon Linux Image ID (64-bit x86)
 
 - Run the Workflow
    - Click on Actions from the repo menu
    - Then navigate to All workflows
    - Select the "Deploy Web Blog Environment" repo and click on "Run workflow"
    - You will be presented with a form that contains list of required fields. The defaults are fine except for the "SSH Key Pair" and "Amazon Linux Image Id" which you've already setup and retrieved from AWS.
    - Enter the key pair name and the image id and run the workflow
    
  ## Alternatively
  Upload the template in cloudFormation directory into your cloud formation service on aws to quickly have the services up.
Check  the Cloud formation stack output to see the Load balancer  dnsname, use this to access the page.
 

After successful deployment, if you see an apache page, give it sometime and then refresh again to see the WebBlog page

There is a feed that is setup to retrieve posts every 10minutes, if it doesn't get triggered
you can use this endpoint `/api/feeds` to test it.

A solution for that might be to implement a lambda function that triggered the api every 10 minutes based on Cloud Watch Scheduled Event. 

