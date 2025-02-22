const e=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");

const app=e();
const port=3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(e.static("public"));

var dataEntered = [];
var indexOfPostToEdit;
var indexOfPostToDelete;
var indexOfPostToView;

async function readText(req,res,next){
    dataEntered =await fs.readFileSync("post.txt").toString().split("\n").slice(0,-1);
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

app.get("/newPost",(req,res)=>{
    res.render("post.ejs")
})

app.post("/submit",(req,res)=>{
    fs.appendFileSync("post.txt",JSON.stringify(req.body)+"\n",(error)=>{
        if (error){
            throw error
        }
    })
    res.redirect("/")
})

app.post("/viewPost",(req,res)=>{
    indexOfPostToView = req.body.indexInArray;
    res.render("viewpost.ejs",{
        heading: JSON.parse(dataEntered[indexOfPostToView]).heading,
        body: JSON.parse(dataEntered[indexOfPostToView]).body
    })
})

app.post("/deleteLogin",(req,res)=>{
    indexOfPostToDelete = req.body.indexInArray;
    res.render("deletepost.ejs")
})

app.post("/deletePost",(req,res)=>{
    console.log(req.body)
    if(indexOfPostToDelete!=dataEntered.length-1){
    dataEntered = dataEntered.slice(0,indexOfPostToDelete) + dataEntered.slice(indexOfPostToDelete+1,-1)
    }else{
        dataEntered = dataEntered.slice(0,indexOfPostToDelete)
    }
    var finalText = ''
    dataEntered.map((item)=>{
        finalText += `${item}` + '\n'
    })
    console.log(finalText)

    fs.writeFileSync("post.txt",(finalText))
    res.redirect("/")
})

app.post("/editPost",(req,res)=>{
    indexOfPostToEdit = req.body.indexInArray;
    res.render("loginPost.ejs");   
})
app.post("/editor",(req,res)=>{
    if(req.body.password===JSON.parse(dataEntered[indexOfPostToEdit]).password)
        {
            res.render("editor.ejs",
                {
                    heading: JSON.parse(dataEntered[indexOfPostToEdit]).heading,
                    body: JSON.parse(dataEntered[indexOfPostToEdit]).body,
                    password: JSON.parse(dataEntered[indexOfPostToEdit]).password,
                    index : indexOfPostToEdit
                }
            );
        }
        else{
            indexOfPostToEdit = null;
            res.redirect("/");
        }
})

app.post("/makeChanges",(req,res)=>{
    dataEntered[parseInt(req.body.index)] = JSON.stringify({
        heading: req.body.heading,
        body: req.body.body,
        password: req.body.password
    })
    var finalText = ''
    dataEntered.map((item)=>{
        finalText += `${item}` + '\n'
    })
    fs.writeFileSync("post.txt",finalText)
    res.redirect("/");
})



app.listen(port,()=>{
    console.log("running At 3000")
})
