import { TaskList } from "./src/TaskList.js";
import { buildRoutePath } from "./src/utils/BuildRoutePath.js";

const taskList = new TaskList()

export const routes = [
    {
        method: 'GET' ,
        path: buildRoutePath('/tasks') ,
        handler: (req, res) => {
            const list = taskList.listTask()
            return res.writeHead(200).end(JSON.stringify(list))
        }
    },
    {
        method: 'POST' ,
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            if(req.body !== null){
                const { title, description } = req.body
                if(title && description){
                    taskList.createTask(title,description)
                    return res.writeHead(201).end()
                }
            }
            return res.writeHead(400).end()
        }
    },
    {
        method: 'POST' ,
        path: buildRoutePath('/tasks/import'),
        handler: (req, res) => {
            if(req.body !== null){
                if(Array.isArray(req.body)){
                    req.body.forEach(body => {
                        const { title, description } = body
                        if(title && description){
                            taskList.createTask(title,description)
                        }
                    })
                    return res.writeHead(201).end()
                } else {
                    const { title, description } = req.body
                    if(title && description){
                        taskList.createTask(title,description)
                        return res.writeHead(201).end()
                    }
                }
            }
            return res.writeHead(400).end()
        }
    },
    {
        method: 'PUT' ,
        path: buildRoutePath('/tasks/:id') ,
        handler: (req, res) => {
            const {id} = req.params
            if(req.body !== null && (req.body.title || req.body.description)){
                const index = taskList.listTask().findIndex(taskList => taskList.getId() === id)
                if(index > -1){
                    taskList.editTask(id,req.body)
                    return res.writeHead(204).end()
                }
            } else {
                return res.writeHead(400).end(`Corpo da requisição vazio.`)
            }
            return res.writeHead(404).end(`Task não encontrada.`)
        }
    },
    {
        method: 'DELETE' ,
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const index = taskList.listTask().findIndex(taskList => taskList.getId() === id)
            if(index > -1){
                taskList.deleteTask(id)
                return res.writeHead(200).end()
            }
            return res.writeHead(404).end(`Task não encontrada.`)
        }
    },
    {
        method: 'PATCH' ,
        path: buildRoutePath('/tasks/:id') ,
        handler: (req, res) => {
            const {id} = req.params
            const {completed} = req.body
            if(req.body !== null && completed){
                const index = taskList.listTask().findIndex(taskList => taskList.getId() === id)
                if(index > -1){
                    taskList.completeTask(id)
                    return res.writeHead(204).end()
                }
            }
            return res.writeHead(404).end(`Task não encontrada.`)
        }
    }
]