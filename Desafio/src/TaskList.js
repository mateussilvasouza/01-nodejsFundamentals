import fs from 'node:fs/promises'
import Task from "./Task.js"

export class TaskList{
    #list = []

    constructor(){
        fs.readFile('task.json','utf-8').then(data=>{
            JSON.parse(data).map(task =>
                this.#list.push(new Task(task)))
        }).catch(() => {
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile('task.json',JSON.stringify(this.#list))
    }

    completeTask(id){
        const task = this.#list.findIndex(task => task.getId() === id)
        if(task > -1){
            this.#list[task].completeTask()
            this.#persist()
        }
    }

    createTask(title,description){
        const params = {
            title:title,
            description: description
        }
        const task = new Task(params)

        if(task){
            this.#list.push(task)
            this.#persist()            
        }
    }

    deleteTask(id){
        const task = this.#list.findIndex(task => task.getId() === id)
        if(task > -1){
            this.#list.splice(task,1)
            this.#persist()
        }
    }

    editTask(id,params){
        const task = this.#list.findIndex(task => task.getId() === id)
        if(task > -1){
            this.#list[task].editTask(params)
            this.#persist()
        }
    }

    listTask(){
        return this.#list
    }
}