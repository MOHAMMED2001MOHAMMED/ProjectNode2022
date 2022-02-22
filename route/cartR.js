const route = require('express').Router()
const CartC =require('../controlers/CartC')
const gurdsauth = require('./gurdes/auth.gurds')
const router = require('./homeR')
const check = require('express-validator').check
const CartM = require('../models/cartM')
const gurdAdmin = require('./gurdes/admin.gourd')


route.get('/',gurdsauth.isAuth ,CartC.getCart)
route.post('/',gurdsauth.isAuth ,
check('amunt').not().isEmpty().withMessage('The Enter is Empty'),
check('amunt').isInt({min : 1}).withMessage('Plase Enter more from element'),
CartC.postCart
 )


route.post('/Save/:id',
check('amount').not().isEmpty().withMessage('The Enter is Empty'), 
check('amount').custom((value , {req})=>{
    if(value === "0"){
        throw "then input less from one"
    }else{
        return true
    }
})
,CartC.postSave)


route.post('/Delete/:id' , CartC.postDelete)

route.post('/DeleteAll' , CartC.DeleteAll)

//route.get('/Address' , CartC.getOrderAddres)

route.post('/Address' , CartC.getOrderAddres)

//route.get('/Order/Addres' , CartC.postOrderAddres)

route.get('/Order' , (req,res,next)=>{
    CartM.Findorder(req.session.userId).then(result=>{
        console.log(result)
        res.render('Order', {
            isUser : req.session.userId , 
            result : result , 
            isAdmin :  req.session.AdminId
        })
    }).catch(err=>{
        console.log(err)
    })
    
})
route.post('/Order' , (req,res,next)=>{
    
    CartM.CreatOrder(req.body.name , req.body.amount , req.body.AllPrice ,req.body.Addres , "Pending" ,   req.body.taimstamp ,req.body.price , req.body.ProdectId , req.body.userId )
    res.redirect('Order')
})


route.post('/Order/Delte/:id' , (req,res,next)=>{
    let i =  req.params.id 
    CartM.DeleteOrder(i).then(()=>{
        res.redirect('/Cart/Order')
    }).catch(err=>{
        console.log(err)
    })
})


route.post('/Order/DeleteAll',(req,res,next)=>{
    CartM.DeleteAllOrder().then(()=>{
        res.redirect('/Cart/Order')
    }).catch(err=>{
        console.log(err)
    })
})


route.get('/MangeOrder',gurdAdmin,(req,res,next)=>{

    const  catogry = req.query.Status
    
    if(catogry && catogry != 'All'){
        CartM.FindDataStauts(catogry).then(result=>{
            res.render('MangeOrder', {
                isUser : req.session.userId , 
                isAdmin :  req.session.AdminId ,
                result :result
            })
    
        })
        
    }else{
        CartM.FindOrder().then(result=>{
            res.render('MangeOrder', {
                isUser : req.session.userId , 
                isAdmin :  req.session.AdminId ,
                result :result
            })
    
    
        })
    }

   
})


route.post('/MangeOrder/Save/:id',(req,res,next)=>{
    console.log(req.params.id)
    console.log(req.body.stauts)
    CartM.updateOrder(req.params.id , req.body.stauts).then(()=>{
        res.redirect('/Cart/MangeOrder')
    }).catch(err=>{
        console.log(err)
        res.redirect('/Cart/MangeOrder')
    })
    
})






module.exports = route