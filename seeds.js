var mongoose = require("mongoose"),
    Comment    = require("./models/comment");
var Campground = require("./models/campground");

function seedDB() {
    
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed");
        //     Campground.create({
        //         name: "Peace Home",
        //         image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
        //         discription:"Very beautiful hill"
        //     },function(err, campground){
        //         if(err){
        //             console.log(err);
        //         }else {
        //             Comment.create({
        //                 text:"nice",
        //                 author: "Jack"
        //             },function(err,comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("add comment");
        //                 }
        //             })
        //         }
        //     })
    });
}
module.exports = seedDB;