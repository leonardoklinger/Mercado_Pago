const axios = require("axios")

class MercadoPagoStatus {
    servico = async () =>{
        try {
            const { data } = await axios.get("https://status.mercadopago.com/api/v2/summary.json")
            const idsStatus = ["6kr510vp00f1", "3kcsxxj59my6"]
            const statusMercadoPago = data.components.filter(item => idsStatus.includes(item.id))

            const statusInfo = statusMercadoPago.map((status) => {
                switch (status.status) {
                    case "operational":
                        return `Serviço ${status.name} |  mercado pago ✅`
                    default:
                        return `Serviço ${status.name} | mercado pago ❌`
                }
            })

            return statusInfo.forEach((server)  => {
                console.log(server)
            })
        } catch (error) {
            return console.log(`Deu algo de errado no serviço de status Mercado Pago. ❌`)
        }
    }
}

module.exports = new MercadoPagoStatus()