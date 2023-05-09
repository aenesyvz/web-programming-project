const previousProcess = document.querySelector('.previous__process')
const currentProcess = document.querySelector('.current__process')

const resultBtn = document.querySelector('.result__btn')
const clearBtn = document.querySelector('.clear__btn')
const backBtn = document.querySelector('.back__btn')

const operatorBtn = document.querySelectorAll('.operator__btn')
const numberBtn = document.querySelectorAll('.data-number')


class Calculator {
    constructor(previousProcess, currentProcess) {
        this.previousProcess = previousProcess;
        this.currentProcess = currentProcess;
        this.clear();
    }

    selectOperator(operator) {
        if (this.currentOperator === ''){ 
            return;
        }

        if (this.previousOperator !== '') {
            this.run();
        }
        
        this.previousOperator = this.currentOperator;
        this.currentOperator = '';
        this.operator = operator;
    }

    add(number) {
        if (number === '.' && this.currentOperator.includes('.')) 
        {
            return;
        }  
        this.currentOperator = this.currentOperator.toString() + number.toString();
    }

    delete() {
        this.currentOperator = this.currentOperator.toString().slice(0, -1);
    }

   
   
    run() {
        let result;
        const prevValue = parseFloat(this.previousOperator)
        const currentValue = parseFloat(this.currentOperator)
        if (isNaN(prevValue) || isNaN(currentValue)) {
            return
        }
        else if(this.operator === "%"){
            result = prevValue % currentValue;
        }
        else if(this.operator === "+"){
            result = prevValue + currentValue;
        }else if(this.operator === "x"){
            result = prevValue * currentValue;
        }
        else if(this.operator === "-"){
            result = prevValue - currentValue;
        }else if(this.operator === "/"){
            result = prevValue / currentValue;
        }
       
        this.currentOperator = result
        this.operator = undefined
        this.previousOperator = ''  
    }

    clear() {
        this.currentOperator = ''
        this.previousOperator = ''
        this.operator = undefined
    }

    getNumber(number) {
        const integerNumber = parseFloat(number.toString().split('.')[0])
        const decimalNumber = number.toString().split('.')[1]
        let showNumber;
        if (isNaN(integerNumber)) {
            showNumber = '';
        } else {
            showNumber = integerNumber.toLocaleString('tr', { maximumFractionDigits: 0 })
        }
        if (decimalNumber != null) {
            return `${showNumber}.${decimalNumber}`
        } else {
            return showNumber;
        }
    }

    show() {
        this.currentProcess.innerText =
            this.getNumber(this.currentOperator)
        if (this.operator != null) {
            this.previousProcess.innerText =
                `${this.getNumber(this.previousOperator)} ${this.operator}`
        } else {
            this.previousProcess.innerText = ''
        }
    }
}




const calculator = new Calculator(previousProcess, currentProcess)

resultBtn.addEventListener('click', () => {
    calculator.run();
    calculator.show();
});

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.show();
});


backBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.show();
});

operatorBtn.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.selectOperator(button.innerText);
        calculator.show();
    })
});

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.add(button.innerText);
        calculator.show();
    })
})


