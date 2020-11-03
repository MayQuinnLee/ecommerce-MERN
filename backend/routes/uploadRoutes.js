import path from 'path' //from Nodejs
import express from 'express'
import multer from 'multer'
const router = express.Router()

//initialize multer
const storage = multer.diskStorage({
  //pass in an object with 2 functions. 1 is destination. 2 callback function
  destination(req, file, cb) { //require to pass in 3 parameter, request, file, callback function
    cb(null, 'uploads/') //call the callback function, pass in 'null' for no error, pass in where we want to upload the file
  },
  //By default, multer removes file extensions, so lets add it back
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    //path.extname() will break the file name to it's last '.' and extract the ext name, add on with '.'
  }
})

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    return cb('Please select an image file (png or jpeg)')
  }
}

//middleware to pass into the route
const upload = multer({
  storage, //this will take into all types of storage
  //if checked on frontend, we don't have to do the checking at the backend
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})


router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})


export default router