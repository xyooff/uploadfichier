var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('3eme requete');
});



/* ajout de plusieurs photos fonctionnel mais erreur server a la fin de la requet*/
// router.post('/upload', upload.fields([{name:'monfichier', maxCount: 12}]), function (req, res) {
  //   const monfichier = req.files;
  //   monfichier['monfichier'].forEach((file) => {
    //     fs.rename(file.path, 'public/images/' + file.originalname, function(err){
      //       if (err) {
        //         return res.status(500).send({status: 1, message: "Messages not available!"});
        //         } else {
          //         return res.status(200).send({status: 0, message: "Messages available"});
          //         }
          //       }); 
          //   }
          //   )  
          // });
          
          /* ajout d'une photo */
          // router.post('/upload', upload.single('monfichier'), function (req, res, next) {
            //   fs.rename(req.file.path, 'public/images/' + req.file.originalname, function(err){
              //     if (err) {
                //         res.send('problème durant le déplacement');
                //     } else {
                  //         res.send('Fichier uploadé avec succès');
                  //     }
                  //   });
                  // })
                  
const MIME_TYPES = {
  "image/png": ".png",
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg"
}


const maxSize = 800000;
                  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    const extension = MIME_TYPES[file.mimetype]
    if (MIME_TYPES[file.mimetype] == file.mimetype) {
      cb(new Error("file format not valid"));
    } else {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
  },
  fileFilter: function (req, file, cb) {
    let size = +req.rawHeaders.slice(-1)[0]
    if(MIME_TYPES[file.mimetype] && size < maxSize){
      isValid = true;
    }
    let error = isValid ? null : new Error('Invalid mime type!');
      cb(error, isValid);
  }
  }
);


/*dkfkldfkldklgkldgklfdlgd*/
router.post('/upload', (req, res) => {
  let upload = multer({ storage}).array('monfichier', 10);
  upload(req, res, function(err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else {
      let result = "You have uploaded these images: <hr />";
      const files = req.files;
      let index, len;
      for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="http://localhost:3001/api/users/${files[index].path}" width="300" style="margin-right: 40px;">`;
      }
      result += '<hr/><a href="./">Upload more images</a>';
      res.send(result);
      console.log(result);
    }});
  });

router.get('/public/images/:name', (req, res) => {
  if (req.params.name){
    res.sendFile(`/Users/rodrigue/wild-project/sessions/uploadImage/public/images/${req.params.name}`)
  }
})

module.exports = router;

