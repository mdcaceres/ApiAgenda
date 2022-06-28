const express = require("express")
const service = require("../services/Persona")
const router = express.Router()

router.use(express.json())

router.get("/", async (req, res) => {
    res.json(await service.getAll())
    res.end()
})

router.get("/documento/:documento", async (req, res) => {
    let doc = parseInt(req.params.documento)
    
    if (!isNaN(doc))  {
        let persona = await service.getByDoc(doc)
        if (persona) 
            res.json(persona)
        else
            res.status(404)
    }
    else
        res.status(400).send("El parámetro debe ser numérico")
    res.end()
})

router.get("/filtro/", async (req, res) => {
    let filtro = req.query.filtro 
    if (!(filtro===" ")) {
        let personas = await service.filterByName(filtro)
        if (personas) 
            res.json(personas)
        else
            res.status(404)
    }
    else
        res.status(400).send("Debe escribir un filtro")
    res.end()
})

router.get("/:documento/telefonos", async (req, res) => {
    let doc = parseInt(req.params.documento)
    if(!isNaN(doc)){
        let tlfs = await service.getTelefonos(doc)
        res.json(tlfs)
        res.end()
    }
})

router.get("/:documento/telefonos/:tipo", async (req, res) => {
    let doc = parseInt(req.params.documento)
    let tipo = parseInt(req.params.tipo)
    if(!isNaN(doc) && !isNaN(tipo)){
        let tlfs = await service.getTelefonosByTipo(doc,tipo)
        res.json(tlfs)
        res.end()
    }
})

router.put("/:documento", async (req, res) => {
    let doc = parseInt(req.params.documento)
    
    if (!isNaN(doc))  { 
        let nueva = req.body
        nueva.documento = doc

        let persona_encontrada = await service.getByDoc(doc)

        if (persona_encontrada) {
            await service.update(nueva)
            res.sendStatus(200)
        }
        else {
            await service.add(nueva)
            res.sendStatus(201)
        }
    }
    else
        res.status(400).send("El parámetro debe ser numérico")
    res.end()
})

router.delete("/:documento", async (req, res) => {
    let doc = parseInt(req.params.documento)
    if (!isNaN(doc))  {
        await service.deleteByDoc(doc)
        res.status(204)
    } else
        res.status(404)
    res.end()
})

exports.router = router