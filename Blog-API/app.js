const express = require('express');
const app = express();

const posts = require('./api/models/posts');
const postData = new posts();

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +  getExtention(file.mimetype));
    }
});

var upload = multer({ storage: storage });

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

app.post('/api/posts', upload.single('post_image'), (req,res) => {
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": `uploads/${req.file.filename}`,
        "added_date": `${Date.now()}`
    } 
    
    postData.addPost(newPost);
    res.status(201).send(newPost);
})


app.listen(3000, () => {
    console.log('Listening to https://localhost:3000')
});