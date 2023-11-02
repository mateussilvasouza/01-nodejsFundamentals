import {randomUUID} from 'node:crypto'

class Task{
    _id = null;
    _title = null;
    _description = null;
    _completed_at = null;
    _created_at = null;
    _updated_at = null;

    constructor(params){
        if(params._id){
            this._id = params._id,
            this._title = params._title,
            this._description = params._description,
            this._completed_at = params._completed_at,
            this._created_at = params._created_at,
            this._updated_at = params._updated_at  
        } else {
            this._id = randomUUID(),
            this._title = params.title,
            this._description = params.description,
            this._completed_at = null,
            this._created_at = new Date(),
            this._updated_at = new Date()
        }
    }

    id(){
        return this._id
    }

    completeTask(){
        this._completed_at = new Date()
        this._updated_at = new Date()
    }

    editTask(params){
        if(params.title||params.description){
            if(params.title){
                this._title = params.title,
                this._updated_at = new Date()
            }
            if(params.description){
                this._description = params.description
                this._updated_at = new Date()
            }
        }
    }

    getId(){
        return this._id
    }

    getTask(){
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            completed_at: this._completed_at,
            created_at: this._created_at,
            updated_at: this._updated_at
        }
    }


}

export default Task