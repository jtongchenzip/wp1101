export default function ViewButtons() {
    const showAll = () => {
        let list = document.getElementById("todo-list"); 
        for(let i = 0; i < list.childNodes.length; i++) {
            list.children[i].style.display = '';
        }
    }

    const showActive = () => { 
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

    const showCompleted = () => { 
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

    return (
        <>
            <button onClick={ showAll }>All</button>
            <button onClick={ showActive }>Active</button>
            <button onClick={ showCompleted }>Complete</button>
        </>
    );
}