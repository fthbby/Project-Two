const db = require('../models');


//INDUCES

//index
const index = (req,res) =>{
    db.posts.find({}, function(err, foundPosts) {
        if(err) return res.send(err);
        const context = {posts: foundPosts};
        res.render('posts/index', context)
    });
};


//show

const show = (req,res) => {
    db.posts.findById(req.params.id, (err, foundPosts) => {
        if(err) return res.send(err)
        
        
        const context = {posts: foundPosts}
        return res.render('posts/show', context)
        
    });
};

//new
const newPost = (req, res) => {
    db.posts.find({}, (err, foundPosts) => {
        if(err) return res.send(err);
        const context = {posts: foundPosts};
        res.render('posts/new', context)
    });
};

//create

const create = (req,res) => {
    db.posts.create(req.body, function(err, createdPost) {
        if(err) return res.send(err)
        return res.redirect('/posts')
});
};


//edit

const edit = (req,res) => {
    db.posts.findById(req.params.id, (err, foundPosts) => {
        if(err) return res.send(err)
        const context = {posts: foundPosts};
        res.render('posts/edit', context)
    });
};

//update

const update = (req,res) =>{
    db.posts.findByIdAndUpdate(req.params.id,
        {
            $set: {...req.body},
        },
        
        {new:true},
        (err, updatedPost) => {
            if(err) return res.send(err);
            return res.redirect(`/posts/${updatedPost._id}`)
        });
    };
    


//delete
const destroy = (req, res)=> {
    db.posts.findByIdAndDelete(req.params.id, (err, foundPost) => {
        if (err) return res.send(err);

        return res.redirect('/posts')
    });
};



module.exports = {
    index,
    show,
    create,
    newPost,
    edit,
    update,
    destroy,
};

