const mariadb = require("mariadb")
const config = require ("../config/Config")

async function add(tlf) {
    const conn = await getConnection()
    const params = [tlf.numero, tlf.id_tipo, tlf.documento]
    await conn.query("insert into telefonos(numero, id_tipo, documento) values(?,?,?)",params)
    conn.end()
}

async function getAll() {
    const conn = await getConnection()
    let telefonos = await conn.query("select * from telefonos")
    conn.end()
    return telefonos
}

async function getById(id) {
    const conn = await getConnection()
    let telefono = await conn.query("select * from telefonos where id_telefono = ? ", [id])
    conn.end()
    return telefono[0]
}

async function getBySufix(sufix) {
    const conn = await getConnection()
    let telefonos = await conn.query(`select * from telefonos where numero like '%${sufix}'`)
    conn.end()
    return telefonos
}

async function update(tlf) {
    const conn = await getConnection()
    const params = [tlf.numero, tlf.id_tipo, tlf.documento, tlf.id]
    await conn.query("update telefonos set numero = ?, id_tipo = ?, documento = ? where id_telefono = ?", params)
    conn.end()
}

async function deleteById(id) {
    const conn = await getConnection()
    await conn.query("delete from telefonos where id_telefono = ?", [id])
    conn.end()
}



async function getConnection() {
    return await mariadb.createConnection(config);
}

exports.add = add
exports.getAll = getAll
exports.getById = getById
exports.getBySufix = getBySufix
exports.update = update
exports.deleteById = deleteById