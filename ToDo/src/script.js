let count = 0;
let todoItems = [];
const input = document.getElementById('taskInput');
const itemList = document.getElementById('todo-items');

function addTask() {
    if (input.value) {
        const item = document.createElement('div');
        item.classList = "flex mb-4 items-center";
        const itemTitle = document.createElement('p');
        itemTitle.classList = "w-full text-grey-darkest";
        const itemDoneBtn = document.createElement('button');
        itemDoneBtn.classList = "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-gray-400 hover:text-black text-green hover:border-green-400";
        const itemRemoveBtn = document.createElement('button');
        itemRemoveBtn.classList = "flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red text-gray-400 hover:text-black hover:border-red-400";
        
        item.id = "item" + count;
        itemTitle.innerHTML = input.value;
        itemDoneBtn.innerHTML = 'Done';
        itemRemoveBtn.innerHTML = 'Remove';
    
        // Append the items children to the main item div
        item.appendChild(itemTitle);
        item.appendChild(itemDoneBtn);
        item.appendChild(itemRemoveBtn);
        itemList.appendChild(item);
        count += 1;

        const itemObj = {
            id: item.id,
            title: itemTitle.innerHTML,
            done: false
        }

        todoItems.push(itemObj);

        itemRemoveBtn.addEventListener("click", function(){
            const itemToRemove = document.getElementById(item.id);
            itemList.removeChild(itemToRemove);
            const findItemInArray = itemObj;
            todoItems.splice(todoItems.findIndex(a => a.id === findItemInArray.id) , 1)
            localStorage.setItem('todos', JSON.stringify(todoItems));
        });

        itemDoneBtn.addEventListener("click", function() {
            const itemToMarkAsDone = document.getElementById(item.id);
            const objectIndex = todoItems.findIndex((obj => obj.id == itemObj.id));

            if(todoItems[objectIndex].done === true) {
                itemToMarkAsDone.firstChild.classList.remove('line-through');
                todoItems[objectIndex].done = false;
            }
            else
            {
                itemToMarkAsDone.firstChild.classList.add('line-through');
                todoItems[objectIndex].done = true;
            }
        });

        input.value = '';

        localStorage.setItem('todos', JSON.stringify(todoItems));
    }
    else {
        alert('You must enter a task name before you can add a task.')
    }
}