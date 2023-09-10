class Envs {
    tipoEnvs() {
        const dado = process.env.TYPE
        let tipo = null
        switch (dado) {
            case "DEV":
                return this.tipo = {
                    TOKEN_AUTH: process.env.TOKEN_AUTH,
                    MERCADO_PAGO_KEY: process.env.MERCADO_PAGO_KEY_TEST,
                    TYPE: "DEV"
                }
            case "PROD":
                return this.tipo = {
                    TOKEN_AUTH: process.env.TOKEN_AUTH,
                    MERCADO_PAGO_KEY: process.env.MERCADO_PAGO_KEY,
                    CLIENT_ID: process.env.CLIENT_ID,
                    CLIENT_SECRET: process.env.CLIENT_SECRET,
                    TYPE: "PROD"
                }
            default:
                break;
        }

        return tipo
    }
}

module.exports = { Envs }