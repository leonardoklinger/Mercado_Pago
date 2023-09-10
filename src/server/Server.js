require("dotenv").config()
require("./services/Gateway/MercadoPago/Status/MercadoPago.status").servico()
const { router } = require("./routes/Routes")
const express = require("express")
const cors = require("cors")

class Servidor {
    constructor() {
        this.server = express()
        this.middleware()
        this.router()
    }

    middleware() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    router() {
        this.server.use(router)
    }
}

module.exports = {
    Servidor
}