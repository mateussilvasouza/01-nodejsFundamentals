import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select('users', search ? {
                name: search,
                email: search
            } : null)
            if(Array.isArray(users) && users.length){
                return res.writeHead(200).end(JSON.stringify(users))
            }
            return res.writeHead(200).end('Nenhum usuário encontrado!')
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            if(req.body){
                const user = {...req.body}
                database.insert('users',user)
                return res.writeHead(201).end()
            }
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            if(req.body){
                const { id } = req.params
                const { name, email} = req.body
                database.update('users',id, {name, email})
                return res.writeHead(200).end()
            }
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            database.delete('users', id)    
            return res.writeHead(200).end()
            
        }
    }
]
