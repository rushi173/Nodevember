const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const blogPostArray = require("./data");
require("dotenv").config();

const app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


const mongodbURL =  process.env.mongo_URL;
mongoose.connect(mongodbURL)
.then(()=>{
    console.log("DataBase connection successfully");
})
.catch((err)=>{
    console.log("DataBase connection not successfully",err);
});

const blogSchema = new mongoose.Schema({
    title: String,
    imageURL: String,
    description : String

});

const Blog = new mongoose.model("blog",blogSchema)

app.get("/",(request, response)=>{
    Blog.find({})
    .then((arr)=>{
        response.render("index",{blogPostArray:arr})
    })
    .catch((err)=>{
        console.log("can not find blogs",err);
        response.render("404");
    });
    

   
    })

    //

app.get("/contact",(request, response)=>{
    response.render("contact");
})

app.get("/about",(request, response)=>{
    response.render("about");
})

app.get("/compose",(request, response)=>{
    response.render("compose");
})

app.post("/compose", (request,response)=>{

    const newid = blogPostArray.length+1;
    const image = request.body.imageUrl;
    const title = request.body.title;
    const description = request.body.description;

    

        const newBlog = new Blog({
            
            imageURL: image,
            title: title,
            description: description
        })

    newBlog.save()
    .then(()=>{
        console.log("New post");
    })
    .catch((err)=>{
        console.log("dsajn",err);
    });
    
    

    // blogPostArray.push(obj);

    response.redirect("/");

})

app.get("/post/:id",(request, response)=>{
    console.log(request.params.id);

    const id = request.params.id;
    const title = "";
    const imageURL = "";
    const description = "";
    blogPostArray.forEach(post => {
        if(post._id == id){
            response.render("post",{post:post});

        }
    });
   
});


//Deleate request
app.get("/delete/:id",(request,response)=>{
    const id=request.params.id;
    Blog.findOneAndDelete({ _id: documentIdToDelete });
    blogPostArray.remove({_id:id},(err,docs)=>{
        if(err){
            console.log("Something went wrong")
        }
        else{
            console.log("Delete succesfully")
            response.redirect("/")
        }
    })
    
})

// app.get("/",(request, response)=>{
//     response.send("Welcome Home page")
// })

// app.get("/contact",(request,response)=>{
//     response.send("This Is contact page")
// })

// app.get("/about",(request,response)=>{
//     response.send("This Is about page")
// })

const port = 3000 || process.env.PORT;
app.listen(post, ()=>{
    console.log("Server is listening on port 3000");
})