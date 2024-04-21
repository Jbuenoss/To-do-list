const input = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const main = document.getElementById("listArea");

let contador = [];
for (let i = 1; i <= 100; i++) {
    contador.push(i);
}
let indice = 0;

function addTask(){
    if (indice < contador.length) {
        let text = input.value;

        if ((text !== "") && (text !== null) && (text !== undefined)) {
            //acute accent
            let newItem =
                `<div id=${contador[indice]} class="item">
                <div onclick="markTask(${contador[indice]})" class="itemIcon">
                    <span id=icon_${contador[indice]} class="material-symbols-outlined">radio_button_unchecked</span>
                </div>
                <div onclick="markTask(${contador[indice]})" class="itemName">
                    ${text}
                </div>

                <div class="toUp">
                    <button onclick="moveToUp(${contador[indice]})"><span class="material-symbols-outlined">expand_less</span></button>
                </div>
                <div class="toDown">
                    <button onclick="moveToDown(${contador[indice]})"><span class="material-symbols-outlined">expand_more</span></button>
                </div>

                <div class="itemButton">
                    <button onclick="deleteTask(${contador[indice]})" class="delete"><span class="material-symbols-outlined">delete</span>Delete</button>
                </div>
            </div>`

            main.innerHTML += newItem;
            saveTasks();

            indice++;

            input.value = "";
            //to add a new thing
            input.focus();
        }
    }
}

function deleteTask(id) {
    var task = document.getElementById(id);
    task.remove();
    saveTasks()
}

function moveToUp(id) {
    var task = document.getElementById(id);
    var previousTask = task.previousElementSibling;
    if (previousTask !== null) {
        previousTask.parentNode.insertBefore(task, previousTask)
    }

    saveTasks()
}

function moveToDown(id) {
    var task = document.getElementById(id);
    var nextTask = task.nextElementSibling;
    if (nextTask !== null) {
        nextTask.insertAdjacentElement('afterend', task);
    }

    saveTasks()
}

//to put button type
input.addEventListener("keyup", function (event) {
    //if type enter
    if (event.key === "Enter") {
        event.preventDefault(); //cancel the pattern
        btnAdd.click(); //same thing to click in the button
    }
})

function markTask(id) {
    var item = document.getElementById(id);
    var idClass = item.getAttribute('class');

    var icon = document.getElementById('icon_' + id);

    if (idClass == "item") {
        item.parentNode.appendChild(item); //take area

        item.classList.add('clicked');
        icon.textContent = "radio_button_checked"; //change the icone
    } else {
        item.classList.remove('clicked');
        icon.textContent = "radio_button_unchecked";
    }

    saveTasks()
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(main.innerHTML));
}

function loadTasks() {
    let current = JSON.parse(localStorage.getItem("tasks"));

    main.innerHTML = current;
}

function updateId() {
    const tasks = [...document.getElementsByClassName("item")];
    for (task of tasks) {
        contador.splice(task.id - 1, 1);
    }
}

window.onload = () => {
    // localStorage.clear();
    loadTasks();

    //update id element available
    updateId();
};