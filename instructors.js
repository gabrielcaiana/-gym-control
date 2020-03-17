const fs = require('fs')
const data = require("./data.json") // importando json data
const { age } = require('./utils')

//show
exports.show = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instructor not found!')

    //conceito spread
    const instructor = {
        ...foundInstructor, // aplicando o spread
        age: age(foundInstructor.birth), // aplicando funcao age em birth
        services: foundInstructor.services.split(","), // transformando services em array
        created_At: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_At) // formatando data de cadastro
    }

    return res.render('instructors/show', { instructor })
}

//create
exports.post = function (req, res) {
    //req.body
    // retorna = { "avatar_url": "http://www.test.com.br", "name": "Gabriel", "birth": "2019-12-01", "gender": "M", "services": "rqr" }

    //Keys retorna = [ "avatar_url", "name", "birth", "gender", "services" ]
    const keys = Object.keys(req.body) // retorna um array com as chaves do objeto

    for (key of keys) {
        // A linha abaixo é a mesma coisa que req.body.avatar_url ou qualquer coisa chave.
        if (req.body[key] == "") {
            return res.send("Please, fill all fields")
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth) // Trabalhando com data no js
    const created_At = Date.now() // Trabalhando com data no js
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_At
    }) // utilizando o arquivo json data - adicionando o req.body no array

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send('Write file error')
        }
        return res.redirect('/instructors')
    })

    // return res.send(req.body)
}

//edit
exports.edit = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send('Instructor not found!')

    return res.render('instructors/edit', {instructor: foundInstructor})
}


