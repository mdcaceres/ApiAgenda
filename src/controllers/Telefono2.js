const express = require("express")
const service = require("../services/Telefono")

const router = express.Router()

router.use(express.json())

router.get("/", async (req, res) => {
    res.json(await service.getAll())
    res.end()
})

router.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    if(!isNaN(id)){
        let tlf = await service.getById(id)
        if(tlf)
            res.json(tlf)
        else 
            res.status(404)
    } else
        res.status(400).send("el parametro debe ser numerico")
    res.end()
})

router.get("/sufijo/:sufix", async (req, res) => {
    let sufix = parseInt(req.params.sufix)
    let tlfs = await service.getBySufix(sufix)
    if(tlfs) {
        res.json(tlfs)
    } else {
        res.status(404)
    }
    res.end()
})

router.post("/", async (req, res) => {
    let id = parseInt(req.params.id)
    let nuevo = req.body
    nuevo.id = id
    await service.add(nuevo)
    res.sendStatus(201)
})

router.put("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let tlf = req.body
    tlf.id = id
    await service.update(tlf)
    res.sendStatus(200)
})

router.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    if (!isNaN(id))  {
        await service.deleteById(id)
        res.status(204)
    } else
        res.status(404)
    res.end()
})



exports.router = router
