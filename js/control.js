let contador = 0;
const input = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const main = document.getElementById("listArea");

function addTask() {
    let text = input.value;

    if ((text !== "") && (text !== null) && (text !== undefined)) {
        ++contador;

        //crase 
        let newItem = `<div id=${contador} class="item">
        <div onclick="markTask(${contador})" class="itemIcon">
            <span id=icon_${contador} class="material-symbols-outlined">radio_button_unchecked</span>
        </div>
        <div onclick="markTask(${contador})" class="itemName">
            ${text}
        </div>
        <div class="itemButton">
            <button onclick="deleteTask(${contador})" class="delete"><span class="material-symbols-outlined">delete</span>Delete</button>
        </div>
    </div>`;

        main.innerHTML += newItem;
        input.value = "";
        //to add a new thing
        input.focus();

    }
}

function deleteTask(id){
    var task = document.getElementById(id);
    task.remove();
}

//to put button type
input.addEventListener("keyup", function(event){
    //if type enter
    if(event.key === "Enter"){
        event.preventDefault(); //cancel the pattern
        btnAdd.click(); //samething to click in the button
    }
})

function markTask(id){
    var item = document.getElementById(id);
    var idClass = item.getAttribute('class');

    var icon = document.getElementById('icon_'+id);

    if(idClass == "item"){
        item.parentNode.appendChild(item); //take area

        item.classList.add('clicked');
        icon.textContent = "radio_button_checked"; //change the icone
    } else{
        item.classList.remove('clicked');
        icon.textContent = "radio_button_unchecked";
    }
}