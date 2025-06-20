const mongoose = require('mongoose')
const config = require('./configuracion')

module.exports={
    connecction: null,
    connect : ()=>{
        if(this.connecction) return this.connecction
        return mongoose.connect(config.DB)
        .then(conn =>{
            this.connecction = conn
            console.log('La conexión se realizó de manera correcta')
        })
        .catch(e =>{console.log('Error en la conexión',e)})
    }
}