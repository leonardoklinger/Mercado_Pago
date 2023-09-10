exports.metodoPagamentoUtil = {
    pix: {
        id: "pix",
        valor_maximo: 9999999,
        valor_minimo: 0.01
    },
    boleto: {
        id: "bolbradesco",
        valor_maximo: 100000,
        valor_minimo: 4,
    },
    visa: {
        id: "visa",
        payment_type_id: "credit_card",
        valor_maximo: 60000,
        valor_minimo: 0.5,
    },
    master: {
        id: "master",
        payment_type_id: "credit_card",
        valor_maximo: 60000,
        valor_minimo: 0.5,
    }
}

exports.metodosPag = {
    pix: "pix",
    boleto: "boleto",
    visa: "visa",
    master: "master",
    cartao: "cartao"
}