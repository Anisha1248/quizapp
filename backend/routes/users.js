const router = require('express').Router();
const multer = require('multer');
var path        = require('path'); 
var csvModel    = require('../Model/csv.Model');  
var csv         = require('csvtojson');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
     filename:(req,file,cb)=>{  
        cb(null,file.originalname);  
    }
});


var upload = multer({storage:storage}); 


router.route('/get').get(function(req, res) {
    csvModel.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});



var temp ; 

router.route('/add').post(upload.single('photo'), (req, res) => {
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        console.log(jsonObj);
   
        csvModel.insertMany(jsonObj, (err, data) => {
            if(err){  
                                console.log(err);  
                            }else{  
                                res.send({data:'success'});
                                console.log(data); 
                            }  
            });
       
    })
     
});



module.exports = router;