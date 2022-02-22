const express = require('express')
const path = require('path')
const index = express()
const mongoose = require('mongoose') 
const Session = require('express-session')
const SessionStore = require('connect-mongodb-session')(Session)
const flash = require('connect-flash')
const bodyparser = require('body-parser')

const ProdectRouter = require('./route/prodectR')
const homeRoute = require('./route/homeR')
const aouthRoute = require('./route/aouthR')
const CartR = require('./route/cartR')
const session = require('express-session')

const RouteAdmin = require('./route/AdminR')

index.use(express.static(path.join(__dirname, 'public')))
index.use(express.static(path.join(__dirname, 'images')))
index.use(express.urlencoded({ extended: true }))
index.use(flash())

const STORE = new SessionStore({
    uri :  'mongodb+srv://Mohammed:0597033916@cluster0.nxpdw.mongodb.net/OnlineShoen?retryWrites=true&w=majority',
    collection : 'sessions' 
})

index.use(session({
    secret : 'This is My Secret....',
    saveUninitialized : false , 
    store : STORE
   /* cookie : {

    }*/
}))

index.set('view engine' , "ejs")
index.set('views','views')

index.use('/',homeRoute)
index.use('/prodect',ProdectRouter)
index.use('/',aouthRoute)
index.use('/Cart',CartR)
index.use('/Admin', RouteAdmin)

/*
mongoose.connect('mongodb://localhost:27017/OnlinStore',(err)=>{
    if(err){
        console.log(err)
    }
    else{
      console.log('connected in database')
    }
})*/
 

index.use(function (req, res, next) {
    
    res.render('err' ,
    {
        isUser : req.session.userId
    })
    
  })
  
  const port = process.env.PORT || 3000 ;

index.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Hello Worled')
    }
})
