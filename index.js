const { Servidor } = require("./src/server/Server")
const socket = require("socket.io")

class API extends Servidor {
    
    constructor() {
        super()
        this.porta = process.env.PORT || 3000
        this.servidor = this.server.listen(this.porta, () => {
            console.log(`Payment ligado na porta ${this.porta} ✅`);
        })
        this.socket = socket(this.servidor)
        this.usuariosConectados = []
        this.socket.on("connection", (socket) => {
            console.log('Um cliente se conectou')
            global.socket = socket

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

            global.conexoesId = this.usuariosConectados
            
            socket.on("disconnect", () => {
                console.log("Um usuário se desconectou!")
            })
        })
    }
}

new API()