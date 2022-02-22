const { reject } = require('bcrypt/promises')
const mongoose = require('mongoose')
const URL = 'mongodb+srv://Mohammed:0597033916@cluster0.nxpdw.mongodb.net/OnlineShoen?retryWrites=true&w=majority'

const Schema = mongoose.Schema({
    
        name : String,
        image : String,
        type : String , 
        description : String ,
        category : String,
        prise : Number ,
   
    
})

const Prodect = mongoose.model('Prodect',Schema)

module.exports  = mongoose.model('Prodect',Schema)

module.exports.getAllProdect = ()=>{

     
   return new Promise((resolve , reject)=>{
    mongoose.connect(URL).then(()=>{ 
        return Prodect.find({}).then(Prodects=>{
        resolve(Prodects)
    }).catch(err=>{
        reject(err)
    }
        
    )
}
 )
   })
}


module.exports.getCategory = (category)=>{

     
    return new Promise((resolve , reject)=>{
     mongoose.connect(URL).then(()=>{ 
         return Prodect.find({category : category}).then(Prodects=>{
         resolve(Prodects)
     }).catch(err=>{
         reject(err)
     }
         
     )
 }
  )
    })
 }



 module.exports.getProdectId = (id)=>{

     
    return new Promise((resolve , reject)=>{
     mongoose.connect(URL).then(()=>{ 
         return Prodect.findById(id).then(Prodects=>{
         console.log(Prodects)
         resolve(Prodects)
     }).catch(err=>{
         reject(err)
     }
         
     )
 }
  )
    })
 }



module.exports.Createprodect = (data)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            const create = new Prodect(data)
            return create.save()
        }).then((resulte)=>{
            console.log(resulte)
            resolve(resulte)
        }).catch(err=>{
            console.log(err)
            reject(err)
        })
    })
}