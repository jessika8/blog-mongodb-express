
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoStore = connectMongo(expressSession);


require('dotenv').config()


const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');

const Post = require('./database/models/Post')


const app = express();

mongoose.connect(`mongodb+srv://maarja:${process.env.PASSWORD}@cluster0-iwyl2.mongodb.net/test?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // .then(() => 'You are connected to Mongo!')
    // .catch(err => console.error('Something went wrong', err))
})

app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use(bodyParser.urlencoded({extended: false})); //Ignore data types and make everything a string
app.use(bodyParser.json());  


app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));



const storePost = require('./middleware/storePost')

app.use('/posts/store', storePost)
 

app.get('/firstpage', (req, res) => {
    res.render('firstpage')
})

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});


app.get('/post', async (req, res) => {
    const posts = await Post.find({});
    
    let postObject = []
   

    for (const post of posts) {
        console.log(post.title);

        let objb= {
            image: post.image,
            title: post.title,
            content: post.content,
            description: post.decription,
            username:post.username,
            createdAt: post.createdAt

        }
        postObject.push(objb);
    }
    
  
    res.render('post', {postObject})

})

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);
app.get("/auth/register", createUserController);
app.post("/users/register", storeUserController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);




 
// app.get('/', async(req, res) => {
//     const posts = await Post.find({});
//     // console.log(posts);
    
//     res.render('index', {posts})
// });


//creating the post
// app.get('/posts/new', (req, res) => {
//     res.render('create')
// })

// app.post("/posts/store", (req, res) => {
//     const {
//         image
//     } = req.files
 
//     image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
//         Post.create({
//             ...req.body,
//             image: `/posts/${image.name}`
//         }, (error, post) => {
//             res.redirect('/');
//         });
//     })
// });

//getting the data
// app.post('/posts/store', (req, res) => {
//     // console.log(req.body)
//     Post.create(req.body, (error, post) => {
//         res.redirect('/')
//     })
// })


// app.get('/post/:id', async (req, res) => {
//     // console.log(req.params.id);
    
//     const post = await Post.findById(req.params.id)

//     // console.log(post);
    
//     let myFuckingObj = {
//         title: post.title,
//         content: post.content,
//         decription: post.description
//     }

//     res.render('post', {myFuckingObj})
//     // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// });


app.listen(8080, () => {
    console.log("Server on port 8080");
    
})