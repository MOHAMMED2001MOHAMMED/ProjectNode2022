
const ProdectsModel = require('../models/prodect')

exports.getHome =(req,res,next)=>{
    let category = req.query.category ; 
    let categorypromis 
    if(category && category !== 'all'){
        categorypromis = ProdectsModel.getCategory(category)
    }else{
        categorypromis =   ProdectsModel.getAllProdect()
    }
    let t = req.flash('Validitor')[0]
   
    categorypromis.then(prodects=>{
        console.log(req.session.AdminId)
        res.render('index',{
            prodects , prodects,
            isUser : req.session.userId , 
            Validitor : t , 
            isAdmin : req.session.AdminId 
            
           
        })
        
    })
}