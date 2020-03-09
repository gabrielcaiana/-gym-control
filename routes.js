const express = require("express")
const routes = express.Router()

routes.get('/', function(req, res){
    return res.redirect('/instructors')
})

routes.get('/instructors', function(req, res){
    return res.render('instructors/index')
})

routes.post('/instructors', function(req, res){
    //req.body
    // retorna = { "avatar_url": "http://www.test.com.br", "name": "Gabriel", "birth": "2019-12-01", "gender": "M", "services": "rqr" }

    //Keys retorna = [ "avatar_url", "name", "birth", "gender", "services" ]
    const keys = Object.keys(req.body) // retorna um array com as chaves do objeto
    
    for(key of keys) {
        // A linha abaixo é a mesma coisa que req.body.avatar_url ou qualquer coisa chave.
        if (req.body[key] == "") {
            return res.send("Please, fill all fields")
        }
    }
    return res.send(req.body)
})

routes.get('/instructors/create', function(req, res){
    return res.render('instructors/create')
})

routes.get('/members', function(req, res){
    return res.send('Members')
})

module.exports = routes