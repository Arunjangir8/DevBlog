const e=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");

const app=e();
const port=3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(e.static("public"));

var dataEntered = [];
function readText(req,res,next){
    dataEntered = fs.readFileSync("post.txt").toString().split("\n");
    next();
}
app.use(readText);

app.get("/",(req,res)=>{
    const comments=["Hey, what’s been on your mind lately? Any new ideas or plans?","Tell me something new and exciting going on in that brilliant mind of yours!","I love hearing your thoughts—what’s something new you’ve been thinking about or dreaming of?","If I could peek into your thoughts right now, what’s the newest idea I’d find?","I was just thinking about you and wondering what’s been on your mind lately.","You always have interesting thoughts, and I’d love to hear what new ideas or plans you're exploring.","Feel free to share anything—big or small, creative or logical.","Is there something exciting you're considering or working on?","I always admire how your mind works and the way you see things differently.","It could be a new project, a random thought, or even a dream you had recently.","No pressure, of course! Just curious to catch up with your amazing thoughts.","If there's something you're excited about, I’d love to hear all about it.","Talking to you always gives me fresh perspectives.","I bet whatever you're thinking about is something unique and brilliant.","Even if it’s something completely random, I’d still love to know!","You know I’m always here to listen and share thoughts with you.","So, what’s the latest idea floating in that amazing mind of yours?","Looking forward to hearing from you soon!"]
    const random=Math.floor(Math.random()*(18))
    console.log(random)
    res.render("index.ejs",{
        ideas:comments[random],
        dataEntered:dataEntered,
    })
    // res.send(dataEntered)
})


app.listen(port,()=>{
    console.log("running At 3000")
})
