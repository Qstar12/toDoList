export default class ToDoList {
    constructor() {
        this._list = []
    }

    getList() {
        return this._list
        
    }

    clearList() {
        this._list
    }

    addItemToList(item) {
        this._list.push(item)
    }

    removeItemFromList(id) {
        const list = this._list
        for(let i = 0; i < list.length; i++) {
            if(list[i] == id){
                list.splice(i, 1)
                break;
            }
        }
    }
}