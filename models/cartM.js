const { reject } = require('bcrypt/promises')
const res = require('express/lib/response')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const URL =  'mongodb+srv://Mohammed:0597033916@cluster0.nxpdw.mongodb.net/OnlineShoen?retryWrites=true&w=majority'
const price= require('./prodect')
let idprice
const SchemaCart = mongoose.Schema({
    name : String , 
    Price : Number , 
    amount : Number , 
    userId : String , 
    ProdectId : String , 
    taimstamp : Number , 
    AllPrice : Number , 
    deleteAll : String
})

const SchemaOrder = mongoose.Schema({
    name : String , 
    Addres : String ,
    Price : Number , 
    amount : Number ,
    taimstamp : Number , 
    AllPrice : Number , 
    Status : String , 
    deleteAll : String , 
    ProdectId : String , 
    userId : String
})

const CrateOrder = mongoose.model('Order' , SchemaOrder)

const CrateItems = mongoose.model("Cart" , SchemaCart)


exports.createCart = data =>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            
            

            CrateItems.find({userId : data.userId}).then((resulte)=>{
          let u 
          let ids
          for(let y = 0 ; y <resulte.length ; y++){
            if(data.ProdectId == resulte[y].ProdectId){
                ids  =  resulte[y]._id
                u = y
                console.log('The index @@@@@@@@@' , u)
                console.log(ids)
            }
        }
 console.log("The Rsulte :==============================+++++++++++++ ",resulte)
    
         
            if(resulte == null){
                console.log('Wwwwwwwwwwwwwwwwwwwwwwwwwww')
                const cart = new CrateItems(data)
                cart.save()
                console.log('Wwwwwwwwwwwwwwwwwwwwwwwwwww')
            }
            else if (u == undefined){
                const cart = new CrateItems(data)
                cart.save()
            }
            else{
                

               
                let am = resulte[u].amount
                console.log(am)
               let o = parseInt(data.amount) + parseInt(am)
               let  update = {
                amount :o , 
                taimstamp : Date.now() , 
                AllPrice : o * data.Price
               } 
               console.log('----------------------------------------------------------')
               CrateItems.updateMany({_id: ids} , update).then((resulte)=>{
                   console.log('----------------Update----------------')
                   console.log(resulte)
               })
                    
                    
             
                 
            
           
        }

          
            
            
            }).catch(err=>{
                console.log(err)
            })
           

           
        }).then(()=>{
            resolve()
        }).catch(err=>{reject(err)})
    })
}


exports.FindData = userId =>{
    console.log(userId)
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            
            CrateItems.find({userId : userId}, {} , {sort : {taimstamp : 1 }}).then((result)=>{
                console.log( "Resulte : " , result)
                resolve(result)
                 

              

            }).catch(err=>{reject(err)})
        })
    })
}



exports.edetItems = (id , newData )=>{
    
 
 
    return new Promise((resolve , reject)=>{
       
        mongoose.connect(URL).then(()=>{
              
            

            CrateItems.findOneAndUpdate({_id : id }, newData ).then(result=>{
             resolve(result)
              
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    })

}

exports.deletDelete = (id)=>{
    return new Promise((resolve , reject )=>{
        mongoose.connect(URL).then(()=>{
            CrateItems.findByIdAndDelete({_id : id}).then(()=>{
                resolve()
            }).catch(err=>{
                reject(err)
            })
        })
    })
}




exports.Delete = (userId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            
            CrateItems.deleteMany({deleteAll : 'delete' , userId : userId}).then(()=>{
                console.log('Delete')
                resolve()
            }).catch((err)=>{
                 reject(err)
            })
        })
    })
}


exports.CreatOrder = (name , amount , AllPrice, addres , status , time , price , ProdectId , userId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            let data = {
                name : name , 
                amount : amount , 
                AllPrice : AllPrice , 
                Addres : addres ,
                Status : status , 
                taimstamp : time, 
                Price : price , 
                deleteAll : 'delete' , 
                ProdectId : ProdectId ,
                userId : userId
            }

            
      
            CrateOrder.find({userId : userId }).then((resulte)=>{
                console.log('The Resulte :=================' , resulte)

                let u 
                let ids
                for(let y = 0 ; y <resulte.length ; y++){
                  if(data.ProdectId == resulte[y].ProdectId){
                      ids  =  resulte[y]._id
                      u = y
                      console.log('The index @@@@@@@@@' , u)
                      console.log(ids)
                  }
              } 
              if(resulte == []){
                let order = new CrateOrder(data)
                order.save() ;
              }
              else if(resulte == null){
                console.log('Wwwwwwwwwwwwwwwwwwwwwwwwwww')
                let order = new CrateOrder(data)
                order.save() ;
               console.log('yes')
                console.log('Wwwwwwwwwwwwwwwwwwwwwwwwwww')
            }
            else if (u == undefined){
                let order = new CrateOrder(data)
                order.save() ;
            }
            else {
                    console.log('no')
                    let am = parseInt(amount) + resulte[u].amount
                    let pri = price * am
                    console.log(am , "  " , typeof(am))
                    console.log(pri , "   " , typeof(pri))
                    let update = {
                        amount : am ,
                        AllPrice : resulte[u].AllPrice + pri ,
                        Addres : addres
                    }
                    console.log('Update................')
                    CrateOrder.updateOne({_id : ids } , update ).then(()=>{
                        console.log()

                    }).catch(err=>{
                        console.log(err)
                    })
                }
            })
            
            
            
        })
    })
}


exports.Findorder= (id)=>{


    console.log('the id  :' , id)
    const userId = id.valueOf()
    console.log(userId+' ')
    const y = userId + ' '
   

    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            CrateOrder.find({userId : y}).then((result)=>{
               console.log('the resulte' ,  result)
               resolve(result)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    })
}


exports.FindOrder= ()=>{


   

    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            CrateOrder.find({}).then((result)=>{
               console.log('the resulte' ,  result)
               resolve(result)
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    })
}


exports.DeleteOrder = (id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            CrateOrder.deleteOne({_id : id}).then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    })
}

exports.DeleteAllOrder = ()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            CrateOrder.deleteMany({deleteAll : 'delete'}).then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
        })

    })
}


exports.FindDataStauts = (status)=>{
    return new Promise((resolve , reject )=>{
        mongoose.connect(URL).then(()=>{
            CrateOrder.find({Status : status}).then(resulte=>{
                resolve(resulte)
            }).catch(err=>{
                reject(err)
            })
        })
    })
}


exports.updateOrder = (id , data)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            CrateOrder.updateMany({_id : id},{Status : data}).then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    })
}