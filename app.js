/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let num1 = null
let num2 = null
let operator = null

/*------------------------ Cached Element References ------------------------*/
const BtnElements = document.querySelectorAll('.button');
const numberBtnElements = document.querySelectorAll('.number');
const operatorBtnElements = document.querySelectorAll('.operator');
const equalsBtnElement = document.querySelector('.equals');
const displayElement = document.querySelector('.display');

console.log(BtnElements)
console.log(numberBtnElements)
console.log(operatorBtnElements)
console.log(equalsBtnElement)
console.log(displayElement)

/*----------------------------- Event Listeners -----------------------------*/
/* for(let btn of BtnElements){
    btn.addEventListener('click', calculate)
} */

for(let btn of BtnElements){
    btn.addEventListener('click', calculateAll)
}

/*-------------------------------- Functions --------------------------------*/
function calculate (event){
    console.log(event.target.className)
    console.log(event.target)

    if(event.target.className === 'button number'){
        if(!num1){
            num1 = event.target.textContent
            displayElement.textContent = num1
        }
        else if (!operator){
            num1 += event.target.textContent
            displayElement.textContent = num1
        }
        else if (!num2){
            num2 = event.target.textContent
            displayElement.textContent = num1 + operator + num2
        }
        else{
            num2 += event.target.textContent
            displayElement.textContent = num1 + operator + num2
        }

    }
    else if(event.target.className === 'button operator'){
        if(event.target.textContent === 'C'){
            num1 = null
            num2 = null
            operator = null
            displayElement.textContent = ''
        }
        else{
            if(num1){
                operator = event.target.textContent
                console.log(operator)
                displayElement.textContent = num1 + operator
            }
        }
    }
    else{
        if(num1 && operator && num2){
            if(operator === '+'){
                displayElement.textContent = Number(num1) + Number(num2)
            }
            else if(operator === '-'){
                displayElement.textContent = Number(num1) - Number(num2)
            }
            else if(operator === '/'){
                displayElement.textContent = Number(num1) / Number(num2)
            }
            else if(operator === '*'){
                displayElement.textContent = Number(num1) * Number(num2)
            }
            num1 = displayElement.textContent
            num2 = null
            operator = null
        }
    }
}

let calculation = ''
let cal = []
function calculateAll(event){
    if(event.target.className === 'button number'){
        cal =   String (calculation).split('')
        if(calculation.length === 0 || cal[0] === '0'){
            calculation = event.target.textContent
            displayElement.textContent = calculation
        }
        else{
            calculation = calculation + event.target.textContent 
            displayElement.textContent = calculation
        }
    }
    else if(event.target.className === 'button operator'){
        if(event.target.textContent === 'C'){
            calculation = ''
            cal = []
            displayElement.textContent = ''
        }
        else{
            calculation = calculation + ' ' + event.target.textContent + ' '
            displayElement.textContent = calculation
        }
    }
    else{
        cal = calculation.split(' ')

        for(let i = 0; i < cal.length; i++){
            if (cal.includes('*') || cal.includes('/') ){
                if(cal[i] === '*'){
                    cal.splice(i-1, 3, Number(cal[i-1]) * Number(cal[i+1]))
                    i = 0
                }
                else if(cal[i] === '/'){
                    cal.splice(i-1, 3, Number(cal[i-1]) / Number(cal[i+1]))
                    i = 0
                }
            }
            else{
                if(cal[i] === '+'){
                    cal.splice(i-1, 3, Number(cal[i-1]) + Number(cal[i+1]))
                    i = 0
                }
                else if(cal[i] === '-'){
                    cal.splice(i-1, 3, Number(cal[i-1]) - Number(cal[i+1]))
                    i = 0
                }
            }
        }
        displayElement.textContent = cal[0]
        calculation = cal[0]
        cal = []
    }
}