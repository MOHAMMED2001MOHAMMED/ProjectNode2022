const router = require('express').Router()

const homeControler = require('../controlers/homeC')

const authGuard = require('./gurdes/auth.gurds')

router.get('/',homeControler.getHome)


module.exports = router