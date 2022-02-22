const route = require('express').Router()
const ProdectC = require('../controlers/prodectcC') 


route.get('/:id', ProdectC.getProdectId) 

module.exports = route