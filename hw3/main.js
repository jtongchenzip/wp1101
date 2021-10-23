function addItem(inputElement) {
    if(event.key === 'Enter') {
        checkIfListEmpty();     

        let list = document.getElementById('todo-list');
        let newItem = document.createElement("li");
        newItem.setAttribute("class", "todo-app__item");
        addCheckBox(newItem);
        addItemDetail(newItem, inputElement.value); // inputElement.value is the string that user keyed in
        addXImg(newItem);
        list.appendChild(newItem);

        document.getElementsByClassName("todo-app__input")[0].value = null; // reset input box to placeholder
        itemCount++;
        totalCnt++;
        setUnComCount(itemCount, completeCnt);       
        showAll(); // goes back to all page after adding new item
    }
}

function checkIfListEmpty() {
    if(itemCount == 0) {
        addTodoList();
        addFooter();
    }
}

function addCheckBox(li) {
    let checkBoxInput = document.createElement("input");
    checkBoxInput.type = "checkbox";
    checkBoxInput.setAttribute("id", String(`${totalCnt}`)); //use totalcount to create id
    checkBoxInput.onclick = function(){ changeItemDetailStyle(checkBoxInput) };
    
    let checkBoxLabel = document.createElement("label");
    checkBoxLabel.setAttribute("for", String(`${totalCnt}`));

    let checkBox = document.createElement("div");
    checkBox.setAttribute("class", "todo-app__checkbox"); 

    checkBox.appendChild(checkBoxInput);
    checkBox.appendChild(checkBoxLabel);

    li.appendChild(checkBox);
}

function addItemDetail(li, text) {
    let detail = document.createElement("h1");
    detail.setAttribute("class", "todo-app__item-detail");
    detail.innerText = text;
    li.appendChild(detail);
}

function addXImg(li) {
    let xImg = document.createElement("img");
    xImg.setAttribute("class", "todo-app__item-x");
    xImg.src="./img/x.png";
    xImg.onclick = function(){ removeItem(xImg) };
    li.appendChild(xImg);
}

function addTodoList() {
    let main = document.getElementsByClassName("todo-app__main")[0];

    let newList = document.createElement("ul");
    newList.setAttribute("class", "todo-app__list");
    newList.setAttribute("id", "todo-list");
    main.appendChild(newList);
}

function addFooter() {
    let total = document.createElement("div");
    total.setAttribute("class", "todo-app__total");
    total.innerHTML = "0 left";

    let viewButtons = document.createElement("ul");
    viewButtons.setAttribute("class", "todo-app__view-buttons");

    let allButton = document.createElement("button");
    allButton.innerHTML = "All";
    allButton.onclick = function() { showAll() };
    let activeButton = document.createElement("button");
    activeButton.innerHTML = "Active";
    activeButton.onclick = function(){ showActive() };
    let completedButton = document.createElement("button");
    completedButton.innerHTML = "Completed";
    completedButton.onclick = function(){ showCompleted() };

    viewButtons.appendChild(allButton);
    viewButtons.appendChild(activeButton);
    viewButtons.appendChild(completedButton);


    let clean = document.createElement("div");
    clean.setAttribute("class", "todo-app__clean");
    
    let cleanButton = document.createElement("button");
    cleanButton.innerHTML = "Clear completed";
    cleanButton.onclick = function() { rmComItems() }
    cleanButton.style.visibility = 'hidden';

    clean.appendChild(cleanButton);
    

    let footer = document.createElement("footer");
    footer.setAttribute("class", "todo-app__footer");
    footer.setAttribute("id", "todo-footer");

    footer.appendChild(total);
    footer.appendChild(viewButtons);
    footer.appendChild(clean);

    let root = document.getElementById("root");
    root.appendChild(footer);
}

function changeItemDetailStyle(checkBoxInput) {
    // remember to call checkBoxInput
    // get h1 by the relationship between checkbox and h1
    let h1 = checkBoxInput.parentElement.parentElement.getElementsByClassName("todo-app__item-detail")[0];

    // not the best way to see if the item is checked, but it works 
    if(h1.style.opacity === "" | h1.style.opacity == 1) {
        h1.style.textDecoration = "line-through";
        h1.style.opacity = "0.5";
        completeCnt++;
    }
    else {
        h1.style.textDecoration = "none";
        h1.style.opacity = "1";
        completeCnt--;
    }

    setUnComCount(itemCount, completeCnt);

    if(completeCnt > 0) { showClearComBut(); }
    else { rmClearComBut(); }
}

function setUnComCount(itemCount, completeCnt) {
    let total = document.getElementsByClassName("todo-app__total")[0];
    let unCompleteCnt = itemCount - completeCnt;
    total.innerHTML = `${unCompleteCnt}` + " left";
}

function removeItem(xImg) {
    let h1 = xImg.previousSibling;
    let item = xImg.parentElement;
    let list = item.parentElement;

    itemCount--;
    if(h1.style.opacity == 0.5) { completeCnt--; }
    
    list.removeChild(item);

    checkFooter(itemCount, completeCnt);
}

function showAll() {  
    let list = document.getElementById("todo-list"); 
    for(let i = 0; i < list.childNodes.length; i++) {
        list.children[i].style.display = '';
    }   
}

function showActive() {
    let list = document.getElementById("todo-list");   
    for(let i = 0; i < list.childNodes.length; i++) {
        let h1 = list.children[i].children[1];
        if(h1.style.opacity == 0.5) {
            list.children[i].style.display = 'none';
        }
        else {
            list.children[i].style.display = '';
        }
    }   
}

function showCompleted() {
    let list = document.getElementById("todo-list");   
    for(let i = 0; i < list.childNodes.length; i++) {
        let h1 = list.children[i].children[1];
        if(h1.style.opacity == 0.5) {
            list.children[i].style.display = '';
        }
        else {
            list.children[i].style.display = 'none';
        }
    } 
}

function showClearComBut() {
    let clearBut = document.getElementsByClassName("todo-app__clean")[0].children[0];
    clearBut.style.visibility = 'visible';
}

function rmClearComBut() {
    let clearBut = document.getElementsByClassName("todo-app__clean")[0].children[0];
    clearBut.style.visibility = 'hidden';
}

function rmComItems() {
    let list = document.getElementById("todo-list");
    const rmItem = [];

    for(let i = 0; i < list.childNodes.length; i++) {
        let h1 = list.children[i].children[1];
        if(h1.style.opacity == 0.5) {
            rmItem.push(i);
        }
    } 
    
    for(let i = rmItem.length - 1 ; i >= 0; i--) {
        let item = list.children[rmItem[i]];
        itemCount--;
        completeCnt--;
        list.removeChild(item);
    }
    checkFooter(itemCount, completeCnt);
}

function checkFooter(itemCount, completeCnt) {
    if(itemCount > 0) {
        setUnComCount(itemCount, completeCnt);
    }
    else {
        let footer = document.getElementById("todo-footer");
        let list = document.getElementById("todo-list");
        footer.parentElement.removeChild(footer);
        list.parentElement.removeChild(list);
        itemCount = 0;
        completeCnt = 0;
    }
}

var itemCount = 0;
var completeCnt = 0;
var totalCnt = 0;