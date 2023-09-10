const mercadopago = require("mercadopago")
const { Envs } = require("../../../config/envs")


class MercadoPagoAPI extends Envs {
    constructor() {
        super()
        this.mercadopago = mercadopago
        this.mercadopago.configurations.setAccessToken(this.tipoEnvs() ? this.tipo.TYPE === "PROD" ? process.env. MERCADO_PAGO_KEY : 
        process.env.MERCADO_PAGO_KEY_TEST: "")
        this.tipoEnvs() ? this.tipo.TYPE === "PROD" ? this.api = this.mercadopago.configure({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }) : "" : ""
    }
}


module.exports = new MercadoPagoAPI()