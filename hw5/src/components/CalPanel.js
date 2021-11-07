import CalButtons from './CalButtons.js';
import './CalPanel.css';

export default function CalPanel ({ currentValue, nextValue, operation, setCurrentValue, setNextValue, setOperation }) { 
    const handleNum = (input) => {
        let num = parseFloat(input);
        if(nextValue === "0") {
            setNextValue(String(num));
        }
        else{
            setNextValue(nextValue + num);
        }
    };

    const handleOperation = (input) => {
        if (operation === null) {
            setOperation(input);
            setCurrentValue(nextValue);
            setNextValue("");
        }
        if (operation) {
            setOperation(input);
        }
        if (currentValue && operation && nextValue) {
            let temp = ""
            if(operation === '+') {
                temp = parseFloat(currentValue) + parseFloat(nextValue);
            }
            else if(operation === '-') {
                temp = parseFloat(currentValue) - parseFloat(nextValue);
            }
            else if(operation === '*') {
                temp = parseFloat(currentValue) * parseFloat(nextValue);
            }
            else if(operation === '/') {
                temp = parseFloat(currentValue) / parseFloat(nextValue);
            }
            setOperation(null);
            setNextValue(String(temp));
            setCurrentValue(null);
        }
    }

    const handleSpecial = (input) => {
        let temp = ""
        if(input === 'ln') {
            temp = Math.log(parseFloat(nextValue));
        }
        else if(input === '+/-') {
            temp = parseFloat(nextValue) * (-1);
        }
        else if(input === '%') {
            temp = parseFloat(nextValue) / 100.0;
        }
        else if(input === 'AC') {
            setCurrentValue("0");
            setNextValue("0");
            setOperation(null);
            temp = ""
        }
        setOperation(null);
        setNextValue(String(temp));
        setCurrentValue(null);
    }

    const handleDot = (input) => {
        let temp = ""
        if((input === '.') && (parseFloat(nextValue) % 1 === 0)) {
            temp = nextValue + '.'
        }
        setNextValue(String(temp));
    }
    
    return (
        <div className ='buttonsWrapper'>
            <div className = 'buttonRow1'>
                <CalButtons value={"ln"} onClick={handleSpecial}/>
                <CalButtons value={"+/-"} onClick={handleSpecial}/>
                <CalButtons value={"%"} onClick={handleSpecial}/>
                <CalButtons value={"AC"} onClick={handleSpecial}/>
            </div>
            <div className = 'buttonRow2'>
                <CalButtons value={"7"} onClick={handleNum}/>
                <CalButtons value={"8"} onClick={handleNum}/>
                <CalButtons value={"9"} onClick={handleNum}/>
                <CalButtons value={"/"} onClick={handleOperation}/>
            </div>
            <div className = 'buttonRow3'>
                <CalButtons value={"4"} onClick={handleNum}/>
                <CalButtons value={"5"} onClick={handleNum}/>
                <CalButtons value={"6"} onClick={handleNum}/>
                <CalButtons value={"*"} onClick={handleOperation}/>
            </div>
            <div className = 'buttonRow4'>
                <CalButtons value={"1"} onClick={handleNum}/>
                <CalButtons value={"2"} onClick={handleNum}/>
                <CalButtons value={"3"} onClick={handleNum}/>
                <CalButtons value={"-"} onClick={handleOperation}/>
            </div>
            <div className = 'buttonRow5'>
                <CalButtons value={"0"} onClick={handleNum}/>
                <CalButtons value={"."} onClick={handleDot}/>
                <CalButtons value={"="} onClick={handleOperation}/>
                <CalButtons value={"+"} onClick={handleOperation}/>
            </div>
        </div> 
    )
}