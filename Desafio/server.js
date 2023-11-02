import http from 'node:http'
import { jsonBody } from './src/middleware/jsonBody.js'
import { routes } from './routes.js'

const port = 8888

const server = http.createServer(async (req,res)=>{
    const {method,url} = req

    await jsonBody(req,res)

    const route = routes.find(route => route.method === method && route.path.test(url))
    if(route){
        const routeParams = req.url.match(route.path)
        req.params = routeParams.groups
        route.handler(req,res)
    }
    return res.writeHead(404).end()
})
 
server.listen(port,()=>{
    console.log(`Escutando a porta ${port}.`)
})