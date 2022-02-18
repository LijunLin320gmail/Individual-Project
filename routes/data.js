var express = require('express');
//Define route-level middleware
var router = express.Router();
/* file storage */
var mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
//Introduce the data model module
var DataSchema = require('../models/user.data.model');
var Data = mongoose.model('Data', DataSchema);//Create a model object under mongoose
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* Add pictures */
router.post('/add', uploadFile, function (req, res, next) {
    let src = req.body.photo;
    console.log(src);
    const data = {
        png: src,
        description: req.body.description
    }
    var user = new Data(data);
    user.save(data, function (err, doc) {
        if (err) {
            res.end('Error' + err);
            return next();
        } else {
            console.log('add success')//Added data successfully
            console.log(doc)
            res.json({ code: '000', 'result': 'success' });
//            window.location.reload();
        }
    });
});
/*search*/
router.get('/findAll', function (req, res, next) {
    Data.find({}, function (err, docs) {
        if (err) {
            console.log('Error:');
            return next();
        }
        res.json({ code: '000', 'result': docs });
    });
});
/* ================================= */
//Custom middleware [image upload]
function uploadFile(req, res, next) {
    //dest The value is the path of the file storage; the single method means uploading a single file, and the parameter is the key corresponding to the form data
    // let upload = multer({ dest: "public/uploads" }).single("photo");
    //Set the name of the file
    let filename = "";
    //get absolute path
    let fullPath = path.resolve(__dirname, "../uploads");/* store pictures */
    // console.log(fullPath)
    let storage = multer.diskStorage({
        //set storage path
        destination: (req, file, cb) => {
            // console.log("destination:", file);
            // cb(null,fullPath);
            cb(null, 'public/uploads');
        },
        //Set the stored filename
        filename: (req, file, cb) => {
            // console.log("filename:", file);
            //Get file extension
            let extname = path.extname(file.originalname);
            filename = file.fieldname + "-" + Date.now() + extname;
            cb(null, filename);
        }
    })
    let upload = multer({ storage: storage }).single("file");
    /* The single attribute name must be the same as the uploaded name, otherwise an error will be reported：multererr:MulterError: */
    upload(req, res, (err) => {
        // console.log(req.file);
        /* file save */
        if (err instanceof multer.MulterError) {
            res.send("multererr:" + err);
            console.log("multererr:" + err);
            return false;
        } else if (err) {
            res.send("err:" + err);
            return false;
        } else {
            //After the upload is successful, write the picture in req.body.photo and continue to execute
            // req.body.photo=filename;
            req.body.photo = filename;
            // console.log({ 'filesuccess': req.file })
            next();
        }
    })
}

module.exports = router;


