const previousExpression = document.querySelector('.previous__expression')
const currentExpression = document.querySelector('.current__expression')

const resultBtn = document.querySelector('.result__btn')
const clearBtn = document.querySelector('.clear__btn')
const backBtn = document.querySelector('.back__btn')

const operatorBtn = document.querySelectorAll('.operator__btn')
const numberBtn = document.querySelectorAll('.data-number')


class Calculator {
    constructor(previousExpression, currentExpression) {
        this.previousExpression = previousExpression;
        this.currentExpression = currentExpression;
        this.clear();
    }

    selectOperator(operator) {
        if (this.currentProcess === ''){ 
            return;
        }

        if (this.previousProcess !== '') {
            this.run();
        }
        
        this.previousProcess = this.currentProcess;
        this.currentProcess = '';
        this.operator = operator;
    }

    add(number) {
        if (number === '.' && this.currentProcess.includes('.')) 
        {
            return;
        }  
        this.currentProcess = this.currentProcess.toString() + number.toString();
    }

    delete() {
        this.currentProcess = this.currentProcess.toString().slice(0, -1);
    }

   
   
    run() {
        let result;
        const firstValue = parseFloat(this.previousProcess)
        const secondValue = parseFloat(this.currentProcess)
        if (isNaN(firstValue) || isNaN(secondValue)) {
            return
        }
        else if(this.operator === "%"){
            result = firstValue % secondValue;
        }
        else if(this.operator === "+"){
            result = firstValue + secondValue;
        }else if(this.operator === "x"){
            result = firstValue * secondValue;
        }
        else if(this.operator === "-"){
            result = firstValue - secondValue;
        }else if(this.operator === "/"){
            result = firstValue / secondValue;
        }else if(this.operator === "^"){
            result = Math.pow(firstValue,secondValue);
        }
       
        this.currentProcess = result
        this.operator = undefined
        this.previousProcess = ''  
    }

    clear() {
        this.currentProcess = ''
        this.previousProcess = ''
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
        this.currentExpression.innerText = this.getNumber(this.currentProcess)
        if (this.operator != null) {
            this.previousExpression.innerText = `${this.getNumber(this.previousProcess)} ${this.operator}`
        } else {
            this.previousExpression.innerText = ''
        }
    }
}




const calculator = new Calculator(previousExpression, currentExpression)

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

operatorBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.selectOperator(btn.innerText);
        calculator.show();
    })
});

numberBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.add(btn.innerText);
        calculator.show();
    })
})


