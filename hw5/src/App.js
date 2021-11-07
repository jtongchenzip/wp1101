import './App.css';
import Output from './components/Output.js';
import CalPanel from './components/CalPanel.js';
import { useState, useEffect } from 'react';

export default function App() {
    const [currentValue, setCurrentValue] = useState("0");
    const [nextValue, setNextValue] = useState("0");
    const [operation, setOperation] = useState(null);

    useEffect(() => {}, [currentValue, nextValue, operation]);

    return (
      <div className="calContainer">
        <Output value={ nextValue || currentValue || "0" } />
        <CalPanel 
          currentValue = { currentValue }
          nextValue = { nextValue }
          operation = { operation }
          setCurrentValue = { setCurrentValue } 
          setNextValue = { setNextValue }
          setOperation = { setOperation }
        />
      </div>
    );
}