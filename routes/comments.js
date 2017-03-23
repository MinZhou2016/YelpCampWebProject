var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router({mergeParams:true});
var middleware = require("../middleware/index");

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground})
        }
    })
})

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    req.flash("error","Something went wrong!");
                    console.log(err);
                }else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Sucessfully add comment");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    })
})

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id,function(err, comment){
        res.render("comments/edit",{comment: comment, id: req.params.id});
    })
})

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updatedComment){
        if(err){
            res.redirect("/campgrounds/" + req.params.id);
        }else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })   
})
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else {
            req.flash("success","Comment Deleted");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

module.exports = router;
