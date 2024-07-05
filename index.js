var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app = express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/bharatIregistration')
var db = mongoose.connection
db.on('error',()=> console.log("error in connecting to databse"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var fname=req.body.fname
    var age = req.body.age
    var phoneno = req.body.phoneno
    var city = req.body.city
    var gender = req.body.gender
    var email = req.body.email
    var password= req.body.password

    var data={
        'fname':fname,
        'age':age,
        'phoneno':phoneno,
        'city':city,
        'gender':gender,
        'email':email,
        'password':password
    }
    db.collection('users').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record inserted successfully")
    })
    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Originn":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")