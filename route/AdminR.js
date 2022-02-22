const route = require('express').Router()
const AdminC = require('../controlers/AdminC')
const multer = require('multer')

const AdminGurd = require('../route/gurdes/admin.gourd')
const { check } = require('express-validator')

route.get('/Add-prodect' , AdminGurd , AdminC.getAddProdect )
route.post('/Add-prodect', multer({
     storage : multer.diskStorage({
         destination : (req , file , cd )=>{
             cd(null , 'images')
         }, 
         filename : (req, file , cd)=>{
             cd(null , Date.now() + '-' + file.originalname)

         }
     })
}).single('imge') ,
check('imge').custom((value , {req})=>{
    if(req.file) return true
    else {
        throw 'The imge is Empty'
    }
}),
check('name').not().isEmpty().withMessage('The Name is Empty'),
check('type').not().isEmpty().withMessage('The Type is Empty') , 
check('Description').not().isEmpty().withMessage('The Description is Empty') ,
check('Category').not().isEmpty().withMessage('The Category is Empty'),
check('price').isInt({min:1}).withMessage('The price less from 1')
,AdminGurd ,AdminC.postProdect)

module.exports = route