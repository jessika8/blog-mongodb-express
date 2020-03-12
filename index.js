
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoStore = connectMongo(expressSession);
const nanoID = require('nanoid');


require('dotenv').config()

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const getCreateUserController = require("./controllers/createUser");
const postStoreUserController = require('./controllers/storeUser');
const getLoginController = require("./controllers/getLogin");
const postLoginUserController = require('./controllers/postLoginUser');
const getFullBlogPostController = require('./controllers/getFullBlogPost')
const getContactController = require('./controllers/getContact');
const getAbout = require('./controllers/getAbout');
const getFirstPage = require('./controllers/getFirstPage');

const storePost = require('./middleware/storePost')
// app.use('/posts/store', storePost)
const auth = require("./middleware/checkLoggedin");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

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
    },
    genid: (req) => {return nanoID()}
}));

const User = require('./database/models/User')

const Session = require('./database/models/Session')

const isLoggedIn = (req) => {
    Session.findById(req.session.userId, (error, user) => {
        console.log(user);
        
        if ( !user) {
            return false
        }
 
        return true
    })
}

app.use(function(req, res, next) {
    res.locals.login = isLoggedIn(req);
    next()
})


app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);
app.get("/auth/register", getCreateUserController);
app.post("/users/register", postStoreUserController);
app.get('/auth/login', getLoginController);
app.post('/users/login', postLoginUserController);
app.get('/post', getFullBlogPostController);
app.get('/contact', getContactController);
app.get('/about', getAbout);
app.get('/firstpage', getFirstPage);



// app.use('/posts/store', storePost)
 

// app.get('/firstpage', (req, res) => {
//     res.render('firstpage')
// })

// app.get('/about', (req, res) => {
//     res.render('about')
// });

// app.get('/contact', (req, res) => {
//     res.render('contact')
// });


// app.get('/post', async (req, res) => {
//     const posts = await Post.find({});
    
//     let postObject = []
   

//     for (const post of posts) {
//         console.log(post.title);

//         let objb= {
//             title: post.title,
//             content: post.content,
//             description: post.decription,
//             username:post.username,
//             createdAt: post.createdAt,
//             image: post.image,

//         }
//         postObject.push(objb);
//     }
    
  
//     res.render('post', {postObject})

// })


 
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