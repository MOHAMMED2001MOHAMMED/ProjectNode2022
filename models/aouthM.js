const mongoose = require('mongoose')
const  bycrept = require('bcrypt')
const { reject } = require('bcrypt/promises')
const URL = 'mongodb+srv://Mohammed:0597033916@cluster0.nxpdw.mongodb.net/OnlineShoen?retryWrites=true&w=majority'
let bol
let y 
let updateuser
const userSchema = mongoose.Schema({
    username : String ,
    email : String , 
    password : String , 
    Age : Number , 
    Unfirsty : String , 
    Phone : String ,
    Addres : String , 
    isAdmin : {
        type : Boolean , 
        default : false
    } , 
    image : String

})

const User = mongoose.model('user',userSchema)

exports.getCreateUser = (username , email , password , Confirmpassword , age , unfirsty , phone , addres , image)=>{
     
   return new Promise((resolve , reject)=>{
       if(email == '')
       {
           reject("The Enter Email null")
       }
       else{
       mongoose.connect(URL).then(()=>{
           return User.findOne({email : email}).then(user=>{
            
               if(user)
               {

                   reject('email is user')
                   bol = true

               }
               else{

                   if(password === Confirmpassword){
                    bycrept.hash(password , 10).then(hashpassword =>{
                            
                        let user = new User({
                            username : username , 
                            email : email , 
                            password : hashpassword, 
                            Age : age , 
                            Unfirsty : unfirsty , 
                            Phone : phone, 
                            Addres : addres , 
                            image : image
                            
                        })
                        
                        return user.save()
                     
                   })
                   }
                   else{

                       reject('Password not equal ConfirmPassword')
                   }
                   
                   
                }

               
           }).then(()=>{
               resolve()
           }).catch(err=>reject(err))
       })
    }
   })


}

exports.login = (email , password)=>{
  
    return new Promise((resolve , reject)=>{
        if(email == ''){
            return reject('The Email is Empty')
        }
        else{
        mongoose.connect(URL).then(()=>{
            return User.findOne({email : email}).then(user=>{
           console.log(user)
            if(!user){
                reject("The Email not fund")
               
            }
            else{
                bycrept.compare(password , user.password).then(same=>{
                if(!same){
                    reject('Password is Corect')
                }
                else{
                    console.log(' The Admin : ' ,  user.isAdmin)
                    resolve({
                      id : user._id , 
                      Admin : user.isAdmin
                    })

                }
            })
            }
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    })
}

exports.getprofile = (id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(URL).then(()=>{
            User.find({_id : id}).
            then(resualt=>{
                console.log(resualt)
                resolve(resualt)
            })
        }).catch(err=>{reject(err)})
    })

    }

    exports.PostProfile = (username , password1 , id)=>{
        return new Promise((resolve , reject)=>{
            if(username == '' || password1 == ''){
                reject('err')
            }else{

            mongoose.connect(URL).then(()=>{
               
                bycrept.hash(password1 , 10).then(hashpassword1=>{
                     updateuser = {
                        username : username ,
                        password : hashpassword1
                    }
                })
        
               
                User.findOneAndUpdate({_id : id},updateuser).then((resualt)=>{
                    console.log('2')
                    console.log(resualt[0])
                    resolve(resualt)
                }).catch(err=>{reject(err)})
            })}
        })
    
    }


    exports.GetUsers = ()=>{
        return new Promise((resolve , reject)=>{
            mongoose.connect(URL).then(()=>{
                User.find({}).then((resulte)=>{
                    console.log('The Resulte : ' , resulte)
                    resolve(resulte)
                }).catch(err=>{
                    reject(err)
                })
            })
        })
    }


    exports.UpdateUser = (id , Admin)=>{
        return new Promise((resolve , reject)=>{
            mongoose.connect(URL).then(()=>{
                User.updateOne({_id : id}, {isAdmin : Admin}).then(()=>{
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            })
        })
    }

    exports.deleteuser =(id)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(URL).then(()=>{
                User.deleteOne({_id : id}).then(()=>{
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            })
        })
    }


    exports.deleteAll= ()=>{
        return new Promise((resolve , reject)=>{
            mongoose.connect(URL).then(()=>{
                User.deleteMany({isAdmin : false}).then(()=>{
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            })
        })
    }
