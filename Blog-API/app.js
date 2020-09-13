const express = require('express');
const app = express();

const posts = require('./api/models/posts');
const postData = new posts();

var multer  = require('multer');
var PostStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/blog_img');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + getExtention(file.mimetype));
    }
});

var DpStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/profile_img');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + getExtention(file.mimetype));
    }
});

var PostUpload = multer({ storage: PostStorage });
var DpUpload = multer({ storage: DpStorage });

getExtention = (mimeType) => {
    switch(mimeType) {
        case 'image/png':
            return ".png";
        case 'image/jpg':
            return ".jpg";
        case 'image/jpeg':
            return ".jpeg";
        case 'image/svg':
            return ".svg";        
    }
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/uploads', express.static('./images'));

app.use(express.json());

app.get('/api/posts', (req, res) => {
    res.status(200).send(postData.get());
});

app.get('/api/posts/:post_id', (req, res) => {
    const postId = req.params.post_id;
    const getPost = postData.getIndividualPost(postId);
    if(getPost) {
        res.status(200).send(getPost);
    }else {
        res.status(404).send('Not found!!')
    }
});

app.get("/api/admin", (req, res) => {
    res.status(200).send(postData.getAdminInfo());
})

app.get("/api/posts/admin/:admin_id", (req, res) => {
    const adminId = req.params.admin_id;
    const getPost = postData.getAdminPosts(adminId);
    if(getPost) {
        res.status(200).send(getPost);
    }else {
        res.status(404).send('Not found!!')
    }
})

app.post('/api/posts/:admin_id', PostUpload.single('post_image'), (req,res) => {
    console.log(req.file);
    const adminId = req.params.admin_id; 
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": `uploads/blog_img/${req.file.filename}`,
        "added_date": `${Date.now()}`
    }; 

    postData.addPost(adminId, newPost);
    res.status(201).send(newPost);
});

app.post('/api/admin', DpUpload.single('profile_image'), (req, res) => {
    const newAdmin = {
        "user_id": `${Date.now()}`,
        "name": req.body.name,
        "user_name": req.body["user_name"],
        "password": req.body["password"],
        "profile_image": `uploads/profile_img/${req.file.filename}`,
        "blogs": [req.body.blogs]
    };
    
    postData.addAdmin(newAdmin);
    res.status(201).send(newAdmin["user_id"]);
})


app.listen(3000, () => {
    console.log('Listening to http://localhost:3000')
});