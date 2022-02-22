
const session = require('express-session')
const aouthM = require('../models/aouthM')
const validationResult = require('express-validator').validationResult
let err2 = []
let err5 = []
let errprofile = []

exports.getSuinup =  (req,res,next)=>{
        let errors2 = req.flash('ErrorSuinup')

        
        
        let e  = err2.concat(errors2)
        
        res.render('Suinup',{
            e : e,
            isUser : req.session.userId ,
            
        })
        err2 = []
}

exports.postSuinup = (req,res,next)=>{
    let err3 = validationResult(req).array()
    for(var i = 0 ; i<err3.length ; i++){
        err2[i] = err3[i].msg
        console.log(err2[i])
    }
    console.log('The File : ', req.file)
    aouthM.getCreateUser(req.body.username , req.body.email , req.body.password , req.body.Confirmpassword , req.body.age , req.body.Unfirsty , req.body.Phone , req.body.Addres ).
    then(()=>res.redirect('/login')).
    catch((err)=>{
        req.flash('ErrorSuinup' , err)
        res.redirect("/Suinup")
    })

}

exports.getlogin = (req,res,next)=>{
    
    let errors1 = req.flash('ErrorAouth')
    let e = err5.concat(errors1)
    console.log(e)
    res.render('login' , {
        e :  e,
        isUser : req.session.userId ,
       
    })
    err5 = []
}

exports.Postlogin = (req,res,next)=>{
    let lo = validationResult(req).array()
    for(var i = 0 ; i<lo.length ; i++){
        err5[i] = lo[i].msg
        console.log(err5[i])
    }
    console.log(lo)
    aouthM.login(req.body.email , req.body.password).then((users)=>{

        req.session.userId = users.id , 
        req.session.AdminId = users.Admin 
        res.redirect('/')
    }
        ).catch((err)=>{
            req.flash('ErrorAouth' , err)
            res.redirect('/login')
        })
}


exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}


exports.getProfile =(req,res,next)=>{
    aouthM.getprofile(req.session.userId).then(resualt=>{


        console.log(resualt)
       
        console.log(req.session.userId)
        res.render('profile',{
            isUser : req.session.userId , 
            profile : resualt[0], 
            errprofile : errprofile , 
            isAdmin :req.session.AdminId

        })
        errprofile = []
})
.catch()
}


exports.postprofile = (req,res,next)=>{
   
    let e =  validationResult(req).array()
    for(let o = 0 ; o<e.length ; o++){
        errprofile[o] = e[o].msg
    }
    console.log(errprofile)

   
    
    aouthM.PostProfile(req.body.username , req.body.password ,req.session.userId).then(resualt=>{
      console.log(resualt)
      res.redirect('/profile')
    }).catch(err=>{
        console.log(err)
        res.redirect('/profile')
    })
}