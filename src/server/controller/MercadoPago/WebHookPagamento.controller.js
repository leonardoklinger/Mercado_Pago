class WebHook {
    webHook(req, res) {
        const socket = global.socket
        const conexaoId = global.conexoesId
        
        if(conexaoId.find(id => id == "123")) {
            socket.emit("123", req.body)
            res.status(200).send("ok")
        }
    }
}

module.exports =  new WebHook()