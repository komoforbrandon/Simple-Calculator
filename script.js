const btns = document.querySelectorAll('.btn')
const display = document.getElementById('input')
const answerElt = document.getElementById('answer')
let num1 = 0
let num2 = 0
let operator = 0
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const newValue = btn.dataset.value
    if (newValue === 'AC') {
      display.textContent = 0
      answerElt.textContent = 0
      num1 = num2 = 0
    } else if (newValue === '=') {
      num2 = Number(answerElt.textContent)
      console.log('Information', num1, num2, operator)
      const answer = OpertnFunc(num1, num2, operator)
      answerElt.textContent = answer
      num1 = Number(answerElt.textContent)
      display.textContent = parseFloat(answerElt.textContent)
    } else if (newValue === 'del') {
      const delVal = delFunc(answerElt.textContent)
      answerElt.textContent = delVal
    } else if (newValue === '+/-') {
      if (answerElt.textContent[0] === '-') {
        answerElt.textContent = answerElt.textContent.slice(1)
      } else {
        answerElt.textContent = '-' + answerElt.textContent
      }
    } else if (/[+\-*%/]/.test(newValue)) {
      if (num1 === 0) {
        num1 = Number(answerElt.textContent)
      }
      operator = newValue
      answerElt.textContent = ''
    } else {
      const displayVal = readValue(newValue, answerElt.textContent)
      answerElt.textContent = displayVal
    }
  })
})

function delFunc (delval) {
  if (delval.length === 1) {
    delval = 0
    return delval
  } else {
    const displayValue = delval.slice(0, -1)
    delval = displayValue
    return delval
  }
}

function readValue (newval, dispVal) {
  if (dispVal === '0') {
    return newval
  } else {
    dispVal += newval
    return dispVal
  }
}

function OpertnFunc (num1, num2, operator) {
  if (operator === '+') {
    return num1 + num2
  } else if (operator === '-') {
    return num1 - num2
  } else if (operator === '*') {
    return num1 * num2
  } else if (operator === '/') {
    return num1 / num2
  } else if (operator === '%') {
    return num1 % num2
  }
}
