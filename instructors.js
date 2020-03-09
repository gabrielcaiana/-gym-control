const fs = require('fs')
const data = require("./data.json") // importando json data 

exports.post = function(req, res){
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

    data.instructors.push(req.body) // utilizando o arquivo json data - adicionando o req.body no array

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send('Write file error')
        }
        return res.redirect('/instructors')
    })

    // return res.send(req.body)
}

