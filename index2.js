var fs = require('fs');
var inquirer=require('inquirer')
var pdf = require('html-pdf');
var axios=require('axios');
var options = { base: "file://D://classwork//UofM-STP-FSF-PT-12-2019-U-C//homework7" };


 

function generate(){
  inquirer.prompt([
    {
      type:"input",
      message:" What pdf background color do you want sir?",
      name:"backgroundcolor"
      },
      {
        type:"input",
        message:"What is your github user name?",
        name:"github"
      }
     ]).then (function(data){
      axios
      .get(
        `https://api.github.com/users/${data.github}`
      )
      .then(response => {
        console.log(response.data);
    
    const html=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    <style>
    .title{
        color:red;
        font-style:bold;
        position:relative;
        left:25px;
       
    }
    .container{
        background-color:${data.backgroundcolor};
        border: 10px solid yellow;
        position:relative;
    }
    .img{
    position:relative;
    left:35%;
    }
    .info{
    position:relative;
    left:32vw;
    font-size:35px;
    }
    .secondTitle{
        position:relative;
        left:30vw;
        color:red;
    }
    .col-md-6{
        border: 5px blue solid;
        background-color: green;
        color:yellow;
        font-size:30px;
    }
    .location{
      position:relative;
     
    }
    .github{
      position:relative;
   
    }
    .text{
      color:yellow;
    }
    
    </style>
    <body>
    <div class="container">
        <div class="row">
        
        <h1 class=" title " >Jack(Peng) Fang Github Profile page </h1>
        </div>
        <img class="row img" src="${response.data.avatar_url}" height=230px alt="Jack's image">
        <h2 class="row text">My name is Jack Fang. I like doing math and graphic design. I like figuring out the locgic of coding and improve my own coding skill.  </h2>
        <h2 class="row text">I have strong desire to develop and build heavy duty machines with my well-developed logical skills one day.  </h2>
        <h2 class="row text">My Github Bio:</h2>
        <h2 class="row text">${response.data.bio}</h2>
       <a class="location info col-md-6" href="https://www.google.com/maps/place/490+Hall+Ave,+St+Paul,+MN+55107/@44.9308418,-93.0868806,18.82z/data=!4m5!3m4!1s0x87f7d53ac694db83:0xde117c910cba3802!8m2!3d44.9311984!4d-93.0863081?hl=en">My location</a>
       <a class="github info col-md-6" href="https://github.com/JackFang1998">Github profile</a>
       <h2 class= "secondTitle">My current status</h2>
       <div class="row">
           
           <div class="col-md-6">public repository:${response.data.public_repos}</div>
           <div class="col-md-6">follower:${response.data.followers}</div>
      </div>
      <div class="row">
           <div class="col-md-6">github Star:1</div>
           <div class="col-md-6">following:${response.data.following}</div>
       </div>
    </div>
    </body>
    </html>`
    
     fs.writeFile('index.html',html, function (err) {
      if (err) throw err;
    console.log('saved');
  })
   pdf.create(html, options).toFile('./jackprofile.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
  })
  })
  }
  generate()