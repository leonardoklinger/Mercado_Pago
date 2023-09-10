const yup = require("yup")
const { pt } = require("yup-locale-pt")
const { metodosPag, metodoPagamentoUtil } = require("../util/Util")
yup.setLocale(pt)

class SchemaPagamento {
    schemas = (tipo) => {
        switch (tipo) {
            case "pix":
                return yup.object({
                    transaction_amount: yup.number().transform((value, originalValue) => {
                        if (typeof originalValue === 'string') {
                            return parseFloat(originalValue)
                        }
                        return value
                    }).positive().min(metodoPagamentoUtil.pix.valor_minimo).max(metodoPagamentoUtil.pix.valor_maximo).required(),
                    payment_method_id: yup.string().oneOf(Object.values(metodosPag)).required(),
                    description: yup.string().notRequired(),
                    payer: yup.object().shape({
                        email: yup.string().email().required()
                    })
                })

            case "master":
                return yup.object({
                    transaction_amount: yup.number().transform((value, originalValue) => {
                        if (typeof originalValue === 'string') {
                            return parseFloat(originalValue)
                        }
                        return value
                    }).positive().min(metodoPagamentoUtil.pix.valor_minimo).max(metodoPagamentoUtil.pix.valor_maximo).required(),
                    token: yup.string().required(),
                    description: yup.string().notRequired(),
                    installments: yup.number().required(),
                    payment_method_id: yup.string().oneOf(Object.values(metodosPag)).required(),
                    payer: yup.object().shape({
                        email: yup.string().email().required(),
                        identification: yup.object().shape({
                            type: yup.string().required(),
                            number: yup.string().required()
                        })
                    })
                })

            case "cartao":
                return yup.object({
                    card_number: yup.string().required(),
                    expiration_month: yup.string().required(),
                    expiration_year: yup.string().required(),
                    security_code: yup.string().required(),
                    cardholder: yup.object().shape({
                        identification: yup.object().shape({
                            type: yup.string().required(),
                            number: yup.string().required()
                        })
                    })
                })
            default:
                break
        }
    }
}

class SchemaYupMercadoPago extends SchemaPagamento {
    validacoesYup = (schema, metodo) => {
        return new Promise(async (resolve, reject) => {
            try {
                const retorno = await this.schemas(schema).validate(metodo)
                resolve(retorno)
            } catch (error) {
                reject(error.errors)
            }
        })
    }
}

module.exports = {
    SchemaYupMercadoPago
}