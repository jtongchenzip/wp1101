import React, { useState } from 'react';

export default function Item( { items, handleDelete }) {
    const [checkbox, setCheckbox] = useState({checked: false});
    const [detailStatus, setDetailStatus] = useState({opacity: 1, textDecoration: "none"});
    
    const changeDetailStatus = (target) => {
        let h1 = target.parentElement.parentElement.getElementsByClassName("todo-app__item-detail")[0];
        if(target.checked == true) { 
            h1.style.textDecoration = "line-through";
            h1.style.opacity = "0.5";
            global.completeCnt++;
        }
        else { 
            h1.style.textDecoration = "none";
            h1.style.opacity = "1";
            global.completeCnt--;
        }
        console.log(global.completeCnt);
        setUnComCount();

        if(global.completeCnt > 0) { showClearComBut(); }
        else { rmClearComBut(); }
    }

    const setUnComCount = () => {
        let total = document.getElementsByClassName("todo-app__total")[0];
        let unCompleteCnt = global.itemCount - global.completeCnt;
        console.log(global.itemCount , global.completeCnt);
        total.innerHTML = `${unCompleteCnt}` + " left";
    }

    const showClearComBut = () => {
        let clearBut = document.getElementsByClassName("todo-app__clean")[0];
        clearBut.style.visibility = 'visible';
    }

    const rmClearComBut = () => {
        let clearBut = document.getElementsByClassName("todo-app__clean")[0];
        clearBut.style.visibility = 'hidden';
    }

    return (
        <>
            {items.map((item) => (
                <li className="todo-app__item" key={ item.id }>
                    <div className="todo-app__checkbox">
                        <input 
                            type="checkbox"
                            id={ item.id }
                            onChange={ e => setCheckbox(e.target), e => changeDetailStatus(e.target)}>
                        </input>
                        <label htmlFor={ item.id }></label>
                    </div>
                    <h1 className="todo-app__item-detail" style={ detailStatus }>{ item.detail }</h1>
                    <img className="todo-app__item-x" src="img/x.png" onClick={() => handleDelete(item.id)}></img>
                </li>
            ))}
        </>
    )
}

