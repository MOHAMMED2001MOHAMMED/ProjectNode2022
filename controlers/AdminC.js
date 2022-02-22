const { validationResult } = require('express-validator')
const prodectM = require('../models/prodect')
let errProdect = []

exports.getAddProdect = (req,res,next)=>{
    res.render('Add-prodect', {
        isUser : true  , 
        isAdmin : true  ,
         isUser : req.session.userId , 
         errProdect : errProdect
    })
    errProdect = []
}



exports.postProdect = (req,res,next)=>{
    
 
   for(let e = 0 ; e <validationResult(req).array().length ; e++){
       console.log(  'The result : ' ,validationResult(req).array()[e].msg)
       errProdect[e] = validationResult(req).array()[e].msg
   }
   
   
   if(validationResult(req).isEmpty()){ 
 
    console.log( "The File :  PostProdect",req.file)

    let data = {
      name : req.body.name , 
        image : req.file.filename,
        type : req.body.type, 
        description : req.body.Description ,
        category : req.body.Category ,
        prise : req.body.price ,
    
    }
    prodectM.Createprodect(data).then((resulte)=>{
        console.log('The Resulte : '  , resulte) 
        res.redirect('/Admin/Add-prodect')
    })
}
else{
    res.redirect('/Admin/Add-prodect')
}
}