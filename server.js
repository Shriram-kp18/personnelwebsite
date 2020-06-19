const express=require("express");
const bodyParser=require("body-parser");
const request=require('request');
const https=require('https');
const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true})); //for html posting urlencoded is used..differnet for differnet posting...
app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");//dirname is used because if it is in server it will open file.html sendFile for sending whole file...
});
app.post("/",function(req, res){
    const fullname=req.body.name;
    const email=req.body.email;
    const message=req.body.message;

    const data= {
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME:fullname,
                    MESSAGE:message
                }

            }
        ]
    };

    const jsondata=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/2fd82eb611";
    const options={
        method:"POST",
        auth:"shriramkp:20d9a1ae3ff7e535e0d55ab8cd12ffd8-us10"

    };


    const request=https.request(url,options,function(response){

        if (response.statusCode===200){
            res.send('thank you');
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsondata);
    request.end();
});
app.listen(process.env.PORT || 3000 ,function(){
  console.log("server running 3000");
});

//api key
//20d9a1ae3ff7e535e0d55ab8cd12ffd8-us10

//list id
//2fd82eb611