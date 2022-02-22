
const express = require('express')
const getPro = require('../models/prodect')

exports.getProdectId = (req,res,next)=>{

    let pro = req.params.id 
    getPro.getProdectId(pro).then(prodect =>{
        console.log(prodect)
        res.render('prodect',{
            prodect : prodect,
            isUser : req.session.userId ,
            isAdmin : req.session.AdminId
        })
    })
}


