import ToDoList from "./todoList.js";
import ToDoItem from "./todoItem.js";

const toDoList = new ToDoList();

//Launch app
document.addEventListener("readystatechange", (e)=>{
    if(e.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //Add Listeners
    const itemsForm = document.getElementById('itemsForm');
    itemsForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        processSubmission();
    })
    //Procedural
    //Load List Object
    //Refresh Page

    refreshThePage();
}

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();
}

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
}

const renderList = () => {
    const list = toDoList.getList();
    list.forEach((item) => {
        buildListItem(item);
    })
}

const buildListItem = (item) => {
    const div = document.createElement('div')
    div.className = item;
    const check = document.createElement('input');
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckBox(check)
    const label = document.createElement('label')
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById('listItems');
    container.appendChild(div);
}

const addClickListenerToCheckBox = (checkbox) => {
    checkbox.addEventListener('click', (e)=>{
        toDoList.removeItemFromList(checkbox.id);
        //TODO remove from persistent data
        setTimeout(()=>{
            refreshThePage()
        }, 1000)
    })
}

const clearItemEntryField = () => {
    document.getElementById('description').value = '';
}

const setFocusOnItemEntry = () => {
    document.getElementById('description').focus();
}

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText)
    toDoList.addItemToList(toDoItem)
    //TODO update persistent data
    refreshThePage();
}

const getNewEntry = () => {
    return document.getElementById('description').value.trim();
    
}

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if (list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
}

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
}