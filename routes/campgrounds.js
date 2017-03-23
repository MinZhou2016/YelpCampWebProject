var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();
var middleware = require("../middleware/index");

router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });

})

router.post("/",middleware.isLoggedIn,function(req, res){
    
    Campground.create(
        {
            name : req.body.name,
            price: req.body.price,
            image: req.body.image,
            discription: req.body.discription,
            author:{
                id: req.user._id,
                username: req.user.username
            }
            
        }, function(err, campground){
            if(err){
                console.log(err);
            }else {
                res.redirect("/campgrounds");
            }
        });
})

//NEW
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})

// SHOW 
router.get("/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
        if(err){
            console.log(err);
        } else {
             res.render("campgrounds/show", {campGround: foundCampGround});
        }
    })
    
});

router.get("/:id/edit",middleware.checkCamogroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("campgrounds/edit", {campground: campground});
    })
})

router.put("/:id",middleware.checkCamogroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    }) 
})

router.delete("/:id",middleware.checkCamogroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds");
        }
    })
})



module.exports = router;