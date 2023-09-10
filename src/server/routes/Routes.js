const { Router } = require("express")
const { mercadoPagoPix, mercadoPagoCartao } = require("../controller/MercadoPago/MetodoDePagamento.controller")
const { webHook } = require("../controller/MercadoPago/WebHookPagamento.controller")

const router = Router()

router.get("/", (req, res) => {
    res.json({message: "teste"})
})

router.post("/pagamento/pix", mercadoPagoPix)
router.post("/pagamento/cartao", mercadoPagoCartao)
router.post("/webhook", webHook)

module.exports = {
    router
}