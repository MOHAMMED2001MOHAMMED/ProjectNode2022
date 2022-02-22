const CartM = require('../models/cartM')
const { validationResult, Result } = require('express-validator')
var ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose')
let errorSave  = []

exports.getCart = (req,res,next)=>{
    
    CartM.FindData(req.session.userId).
   
    then(result=>{

        
        console.log('The Session  :',  req.session.AdminId)
        
        res.render('Cart', {
            isUser : req.session.userId , 
            result : result , 
            validatorError : errorSave , 
            isAdmin :req.session.AdminId
          
        })
        errorSave = []
  
    }
    
    ).catch(err=>{
        console.log(err)
    }
    )
    
    
}


exports.postCart = (req,res,next)=>{
if(validationResult(req).isEmpty()){
    
    CartM.createCart({
      
        name : req.body.name,
        Price : req.body.price , 
        ProdectId : req.body.ID,
        amount : req.body.amunt , 
        userId : req.session.userId, 
        taimstamp : Date.now() , 
        AllPrice : req.body.price * req.body.amunt, 
        deleteAll : 'delete' 
    }).then(()=>{
       
        res.redirect('/Cart')
    }).catch(err=>{console.log(err)})
}
else{
    req.flash('Validitor', validationResult(req).array())
     
    res.redirect(req.body.redirect2)
}

}

exports.postSave = (req,res,next)=>{

    let i = {
       o : req.body.CartId , 
       id:  ObjectId(this.o)
    }
    console.log(i.id)

 if(validationResult(req).isEmpty()){
    
    let i =  req.params.id 
    
    
    console.log(typeof(req.body.pri))
    
            let  update = {
                amount : req.body.amount ,
                taimstamp : Date.now() , 
                AllPrice : req.body.amount * req.body.pri
                
               
            } 

     CartM.edetItems( i ,  update ).then((result=>{
         
         res.redirect('/Cart')
                  
        })).catch(err=>{
            console.log(err)
        })
 }
 else{
  let errsave =   validationResult(req).array()
  for(let e =0 ; e <errsave.length ; e++){
     
         errorSave[e] = errsave[e].msg
      
  }
  console.log(errorSave)
   
    req.flash('ErrSave', validationResult(req).array())
  
    res.redirect("/Cart")

 }

}


exports.postDelete = (req,res,next)=>{
    
    let i =  req.params.id 
    console.log(i)
    CartM.deletDelete(i).then(()=>{
        res.redirect('/Cart')
    }).catch(err=>{
        console.log(err)
        res.redirect('/Cart')
    })
}

exports.DeleteAll  =(req,res,next)=>{
    CartM.Delete(req.session.userId).then(()=>{
        
        res.redirect('/Cart')
    }).catch(err=>{
        console.log(err)
        res.redirect('/Cart')

    })
}


exports.getOrderAddres = (req,res,next)=>{

     
          
       let information = { name : req.body.name , amount :  req.body.amount , price :  parseInt(req.body.pri) , taimstamp : req.body.taimstamp , AllPrice :  parseInt(req.body.AllPrice) , ProdectId : req.body.ProdectId , userId : req.body.userId }
       
       
            
        res.render('OrderAddres' , 
        {
            isUser : req.session.userId , 
            Data  : information ,
            isAdmin : req.session.AdminId
        })
}






