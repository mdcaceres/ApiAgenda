const express = require("express")
const persona = require("./src/controllers/Persona")
const telefono = require("./src/controllers/Telefono2")
const app = express()

//use routers
app.use("/personas/", persona.router)
app.use("/telefonos/", telefono.router)

app.listen(8080)