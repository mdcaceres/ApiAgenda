const mariadb = require("mariadb")
const config = require ("../config/Config")

async function add(persona) {
    const conn = await mariadb.createConnection(config)
    const params = [persona.documento, persona.nombre, persona.apellido, persona.edad]
    await conn.query("insert into personas2(documento,nombre,apellido,edad) values(?,?,?,?)", params)
    conn.end()
}

async function getAll() {
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query("select * from personas2")
    conn.end()
    return personas
}

async function getTelefonos(doc) {
    const conn = await mariadb.createConnection(config)
    let tlfs = await conn.query("select * from telefonos where documento = ?",[doc])
    conn.end()
    return tlfs
}

async function getTelefonosByTipo(doc,id_tipo) {
    const conn = await mariadb.createConnection(config)
    let tlfs = await conn.query("select id_telefono, numero, id_tipo from telefonos where documento = ? and id_tipo = ?",[doc, id_tipo])
    conn.end()
    return tlfs
}

async function getByDoc(doc) {
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query("select * from personas2 where documento = ?",[doc])
    conn.end()
    return personas[0]
}

async function filterByName(filter) {
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query(`select * from personas2 where nombre like '%${filter}%' or apellido like '%${filter}%'`)
    conn.end()
    return personas
}

async function update(persona) {
    const conn = await mariadb.createConnection(config) 
    const params = [persona.nombre, persona.apellido, persona.edad, persona.documento]
    await conn.query("update personas2 set nombre = ?, apellido = ?, edad = ? where documento = ?", params)
    conn.end()
}

async function deleteByDoc(doc) {
    const conn = await mariadb.createConnection(config)
    await conn.query("delete from personas2 where documento = ?", [doc])
    conn.end()
}

exports.add = add
exports.getAll = getAll
exports.getTelefonos = getTelefonos
exports.getTelefonosByTipo = getTelefonosByTipo
exports.getByDoc = getByDoc
exports.filterByName = filterByName
exports.update = update
exports.deleteByDoc = deleteByDoc