const route = require('express').Router()
const bodyparser = require('body-parser')
const check  = require('express-validator').check
const aouthC = require('../controlers/aouthC')
const authgurds =  require('./gurdes/auth.gurds')
const aouthM = require('../models/aouthM')
const multer = require('multer')

route.get('/Suinup',authgurds.notAuth, aouthC.getSuinup)
route.post('/Suinup' , multer({
    storage : multer.diskStorage({
        destination : (req , file , cd )=>{
            cd(null , 'images')
        }, 
        filename : (req, file , cd)=>{
            cd(null , Date.now() + '-' + file.originalname)

        }
    })
}).single('imge'),

  check('username').not().isEmpty().withMessage("The username is Empty"), 
  check('email').not().isEmail().withMessage("The Enter not Email"),
  check('password').isLength({min : 5}).withMessage('Please enter more than 5 items ') , 
  check('image').custom((value,{req})=>{
      if(req.file) return true
      else throw 'The File image is Empty'
  })
  ,
  check('Confirmpassword').custom((value , {req})=>{
      if(value === req.body.password){
         return true
      }else{
          throw "Password not equals ConfirmPassword"
      }
  }),
  check('Addres').not().isEmpty().withMessage('The Addres is Empty '), 
  check('Phone').not().isEmpty().withMessage('The Phone is Empty'), 
  check('age').not().isEmpty().withMessage('The Age is Empty'),
  check('age').isLength({min : 18}).withMessage('You must be over 18'),
  check('Unfirsty').not().isEmpty().withMessage('The Unfirsty is Empty')
 , aouthC.postSuinup)


route.get('/login' , authgurds.notAuth ,aouthC.getlogin)
route.post('/login' ,
check('password').isLength({min : 5}).withMessage('Please enter more then 5 items ')

, aouthC.Postlogin)

route.get('/profile',aouthC.getProfile)

route.post('/profile', 
check('username').not().isEmpty().withMessage('The Enter in Email is Empty'),
check('password').not().isEmpty().withMessage('The Enter in Password is Empty'),
check('password').isLength({min : 5}).withMessage('please enter more from 5 element ')
, aouthC.postprofile)
route.all('/logout',aouthC.logout)


route.get('/User',(req,res,next)=>{
    aouthM.GetUsers().then(resulte=>{
        console.log(resulte)
        res.render('user',{
            isUser : req.session.userId,
            isAdmin : req.session.AdminId ,
            result : resulte
        })
    }).catch(err=>{
        console.log(err)
    })
    
})


route.post('/User/Save/:id',(req,res,next)=>{
    const id = req.params.id 
    const Admin = req.body.Admin
    aouthM.UpdateUser(id,Admin).then(()=>{
        res.redirect('/User')
    }).catch(err=>{
        res.redirect('/User')
    })
})


route.post('/User/Delete/:id',(req,res,next)=>{
    const id = req.params.id
    aouthM.deleteuser(id).then(()=>{
        res.redirect('/User')
    }).catch(err=>{
        res.redirect('/User')
    })
})


route.post('/User/DeleteAll',(req,res,next)=>{
    aouthM.deleteAll().then(()=>{
        res.redirect('/User')
    }).catch(err=>{
        res.redirect('/User')
    })
})

module.exports = route 

