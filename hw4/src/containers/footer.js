import React, { useState } from 'react';
import ClearButton from '../components/clearButton';
import ViewButtons from '../components/view-Buttons';

export default function Footer() {
    const [showClearButton, setClearButton] = useState({visibility: 'hidden'});
    const [showFooter, setShowFooter] = useState({visibility: 'hidden'});
    

    return (
        <footer className="todo-app__footer" style={showFooter}>
            <div className="todo-app__total">0 left</div>
            <ul className="todo-app__view-buttons">
                <ViewButtons />
            </ul>
            <div className="todo-app__clean" style={showClearButton}>
                <ClearButton />
            </div>
        </footer>
    )  
}