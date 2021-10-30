import React, { useState, useEffect } from 'react';
import List from './list'

export default function Main() {
    const [items, setItems] = useState([]);
    const [placeHolder, setPlaceHolder] = useState('What needs to be done?');
   
    const handleEnter = (event) => {
        if(event.key === 'Enter'){
            addItem(event.target.value);
        }
    }
    
    const addItem = (content) => {
        checkIfListEmpty();

        setItems([...items, {
            id: global.totalCnt,
            detail: content
        }])  
        global.itemCount++;
        global.totalCnt++; 
        setUnComCount();
    }

    const checkIfListEmpty = () => {
        if(global.itemCount == 0) {
            let list = document.getElementById("todo-list")
            list.style.visibility = 'visible';
            let footer = document.getElementsByClassName("todo-app__footer")[0];
            footer.style.visibility = 'visible';
        }
    }

    const handleDelete = (id) => {
        const newItems = items.filter(items => items.id !== id);
        setItems(newItems);
        global.itemCount--;

        let checkbox = document.getElementById(id)
        let h1 = checkbox.parentElement.nextSibling
  
        if(h1.style.opacity == 0.5) { global.completeCnt--; }
        checkIfListEmpty();
        checkFooter();

        if(global.completeCnt > 0) { showClearComBut(); }
        else { rmClearComBut(); }
    }

    const showClearComBut = () => {
        let clearBut = document.getElementsByClassName("todo-app__clean")[0];
        clearBut.style.visibility = 'visible';
    }

    const rmClearComBut = () => {
        let clearBut = document.getElementsByClassName("todo-app__clean")[0];
        clearBut.style.visibility = 'hidden';
    }

    const setUnComCount = () => {
        let total = document.getElementsByClassName("todo-app__total")[0];
        let unCompleteCnt = global.itemCount - global.completeCnt;
        console.log("itemCnt, completeCnt", global.itemCount , global.completeCnt);
        total.innerHTML = `${unCompleteCnt}` + " left";
    }

    const checkFooter = () => {
        if(global.itemCount > 0) {
            setUnComCount();
        }
        else {

            
            let footer = document.getElementsByClassName("todo-app__footer")[0];
            footer.style.visibility = 'hidden';
            
            // let main = document.getElementsByClassName("todo-app__main")[0]
            // main.removeChild(main.children[1])
            let list = document.getElementById("todo-list")
            list.style.visibility = 'hidden';

            global.itemCount = 0;
            global.completeCnt = 0;
        }
    }

    useEffect(() => {
        // little trick to clear placeholder, a better way should exist
        document.getElementsByClassName("todo-app__input")[0].value = null;
    }, [items]);
 
    return (
        <>
            <section className="todo-app__main">
                <input 
                    className="todo-app__input"
                    placeholder={ placeHolder }
                    onKeyPress={ handleEnter }
                />
                <List items={ items } handleDelete={ handleDelete }/>
            </section>
        </>
    )
}


