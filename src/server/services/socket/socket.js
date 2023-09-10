class Socket {
    constructor() {
        this.usuariosConectados = []
    }

    comunicao = (socket) => {
        socket.on("paymentServer", (message) => {
            const { tokenAcess, id } = message
            if (process.env.TOKEN_ACESS_PAYMENT === tokenAcess) {
                this.usuariosConectados.push(id)
            } else {
                this.usuariosConectados.splice(this.usuariosConectados.indexOf(id), 1)
                socket.emit(id, "Desconectado, tokenAcess incorreto!")
                socket.disconnect()
                console.log(`Usuário removido. Motivo: tokenAcess incorreto. Id: ${id}`);
            }
        })

        socket.on("disconnect", () => {
            console.log("Um usuário se desconectou!")
        })
    }
}

module.exports = {
    Socket
}
