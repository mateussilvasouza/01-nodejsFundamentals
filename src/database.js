import {randomUUID} from 'node:crypto'
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json',import.meta.url)
export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasePath,'utf-8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search){
        let data = this.#database[table] ?? []

        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key,value])=>{
                    return row[key].includes(value)
                })
            })
        }

        return data
    }

    insert(table,data){
        const formatedData = {
            id: randomUUID(),
            ...data
        }
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(formatedData)
        } else {
            this.#database[table] = [formatedData]
        }
        this.#persist()
    }

    update(table,id,data){
        const index = this.#database[table].findIndex(data => data.id === id)
        if(index > -1){
            this.#database[table][index] = {id, ...data}
        }
        this.#persist()
    }

    delete(table,id){
        const data = this.#database[table].findIndex(data => data.id === id)
        if(data > -1){
            this.#database[table].splice(data,1)
            this.#persist()
        }
    }
}