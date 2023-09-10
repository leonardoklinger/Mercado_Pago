const { mercadopago } = require("../../services/Gateway/MercadoPago/MercadoPago")
const { SchemaYupMercadoPago } = require("../../models/Schema.yup")
const { metodosPag } = require("../../util/Util")
const { HttpStatusCode } = require("axios")
const axios = require("axios")

const url = "https://api.mercadopago.com/v1"

class MercadoPagoMetodo extends SchemaYupMercadoPago {
    requisicaoPagamento(body) {
        return {
            id_pagamento: body.id,
            data_criacao: body.date_created,
            ultima_data_atualizacao: body.date_last_updated,
            data_expiracao: body.date_of_expiration,
            metodo_de_pagamento: body.payment_method,
            status: body.status,
            descricao: body.description,
            valor_pagamento: body.transaction_amount,
            chave_pix: body.point_of_interaction.transaction_data.qr_code,
            qr_code: body.point_of_interaction.transaction_data.qr_code_base64
        }
    }

    mercadoPagoPix = async (req, res) => {
        try {
            const { preco, descricao, email } = req.body
            const dados = {
                transaction_amount: Number(preco),
                payment_method_id: metodosPag.pix,
                description: String(descricao),
                payer: {
                    email: String(email)
                }
            }
            const pix = await this.validacoesYup(metodosPag.pix, dados)
            const { body } = await mercadopago.payment.create(pix)
            res.status(HttpStatusCode.Created).json({ message: "Pagamento do tipo pix criado com sucesso!", data: this.requisicaoPagamento(body) })
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({ message: `Error ao criar forma de pagamento Pix`, data: error})
        }
    }

    mercadoPagoCartao = async (req, res) => {
        try {
            const { numero_cartao, mes, ano, code_seguranca, cpf, valor, descricao, parcela, metodoPagamento, email, nome } = req.body

            const dadosCartao = {
                card_number: numero_cartao,
                expiration_month: mes,
                expiration_year: ano,
                security_code: code_seguranca,
                cardholder: {
                    identification: {
                        number: cpf,
                        type: "CPF"
                    },
                    name: nome
                }
            }

            const dataCartao = await this.validacoesYup(metodosPag.cartao, dadosCartao)
            const tokenCartao = await axios.post(`${url}/card_tokens`, dataCartao, { params: { public_key: process.env.MERCADO_PAGO_PUBLIC_KEY }})

            const dados = {
                transaction_amount: Number(valor),
                token: tokenCartao.data.id,
                description: descricao,
                installments: Number(parcela),
                payment_method_id: metodoPagamento,
                issuer_id: "24",
                payer: {
                  email: email,
                  identification: {
                    type: "CPF",
                    number: cpf
                  }
                }
            }

            const cartao = await this.validacoesYup(metodosPag.master, dados)

            const { data } = await mercadopago.payment.save(cartao)
            res.status(HttpStatusCode.Created).json({ message: "Pagamento realizado com sucesso", data: data })
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({ message: `Error ao criar forma de pagamento Cartão de crédito`, data: error})
        }
    }
}

module.exports = new MercadoPagoMetodo()