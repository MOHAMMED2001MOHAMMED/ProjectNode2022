module.exports = (req,res,next)=>{
    console.log(req.session.AdminId)
    if(req.session.AdminId) next()
    else {console.log('You not Admin')
    res.redirect('/')
}
}