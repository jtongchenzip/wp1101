import React from 'react';

export default function ClearButton() {
    const rmComItems = () => {
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
            global.itemCount--;
            global.completeCnt--;
            list.removeChild(item);
        }
        checkFooter();
        console.log("here")
        let clearBut = document.getElementsByClassName("todo-app__clean")[0];
        clearBut.style.visibility = 'hidden';
    }

    const checkFooter = () => {
        if(global.itemCount > 0) {
            setUnComCount();
        }
        else {
            let footer = document.getElementsByClassName("todo-app__footer")[0];
            footer.style.visibility = 'hidden';
            
            let list = document.getElementById("todo-list")
            list.style.visibility = 'hidden';

            global.itemCount = 0;
            global.completeCnt = 0;
        }
    }

    const setUnComCount = () => {
        let total = document.getElementsByClassName("todo-app__total")[0];
        let unCompleteCnt = global.itemCount - global.completeCnt;
        console.log(global.itemCount , global.completeCnt);
        total.innerHTML = `${unCompleteCnt}` + " left";
    }

    return (
            <button onClick= { rmComItems }>Clear completed</button>
    );
}