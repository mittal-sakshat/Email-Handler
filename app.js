const express = require("express");
const request = require("request");
const https = require("https");
const { json } = require("express/lib/response");


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
    //res.send("<h1> Hello world</h1>")
})

app.post("/",function(req,res){
    //res.send(req.body.fname);
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
}

const jsonData = JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/839c567840";
const option={
    method: "POST",
    auth: "mittalji:c6ff354f1944ccc4dbc78a3a2ff0bd52-us1"
}

const request = https.request(url,option,function(response){
    
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
    }
    else
    res.sendFile(__dirname+"/failure.html")
    
    
    response.on("data",function(data){
        console.log(JSON.parse(data))
    })
})
request.write(jsonData)
request.end()

})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server is running");
})

//Audience id
//839c567840
//API keys
//c6ff354f1944ccc4dbc78a3a2ff0bd52-us13