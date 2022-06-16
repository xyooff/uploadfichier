var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'tmp/'});
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('3eme requete');
});

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


/* ajout de plusieurs photos */
router.post('/upload', upload.fields([{name:'monfichier', maxCount: 12}]), function (req, res) {
  const monfichier = req.files;
  monfichier['monfichier'].map((file) => {
    fs.rename(file.path, 'public/images/' + file.originalname, function(err){
      if (err) {
        return errors.push('res.status(500).send({status: 1, message: "Messages not available!"})');
        } else {
        return available.push('res.status(200).send({status: 0, message: "Messages available"})');
        }
      }); 
  }
  )  
});

module.exports = router;
