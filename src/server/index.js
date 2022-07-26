require('dotenv').config()
const express = require('express')
const routes = require('../routes')

const port = process.env.PORT

const server = (()=> {
    const router = new express.Router()
    const app = express()
    let serverProcess;

    const start = () => new Promise((resolve) => {
        routes(router)

        app.set('port', port)
        app.use(express.json())
        app.use('/', router)

        serverProcess = app.listen(port, ()=>{
            return resolve(app)
        })
    })

    const stop = () => new Promise((resolve, reject) => {
        if(serverProcess){
            serverProcess.close((err) => {
                if(err){
                    return reject(err)
                }
                return resolve()
            })
        }
    })

    return {
        start,
        stop
    }
})()

module.exports = server
