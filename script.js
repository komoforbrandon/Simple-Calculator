const btns = document.querySelectorAll('.btn')
const display = document.getElementById('input')
const answerElt = document.getElementById('answer')
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const newValue = btn.dataset.value
    if (newValue === 'AC') {
      display.textContent = 0
      answerElt.textContent = 0
    } else if (newValue === '=') {
      const answer = OpertnFunc(display.textContent)
      answerElt.textContent = answer
      display.textContent = parseFloat(answerElt.textContent)
    } else if (newValue === 'del') {
      const delVal = delFunc(display.textContent)
      display.textContent = delVal
    } else if (newValue === '+/-') {
      if (display.textContent[0] === '-') {
        display.textContent = display.textContent.slice(1)
      } else {
        display.textContent = '-' + display.textContent
      }
    } else {
      const displayVal = readValue(newValue, display.textContent)
      display.textContent = displayVal
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
  } else if (/[+\-*/]/.test(newval) && /[+\-*/]/.test(dispVal.at(-1))) {
    if (/[+*/]/.test(dispVal.at(-1)) && newval === '-') {
      dispVal += newval
      return dispVal
    } else {
      if (/[+\-*/]/.test(dispVal.at(-2))) {
        dispVal = dispVal.slice(0, -2) + newval
      } else {
        dispVal = dispVal.slice(0, -1) + newval
      }
      return dispVal
    }
  } else {
    dispVal += newval
    return dispVal
  }
}

function OpertnFunc (expression) {
  const result = evaluateExpression(expression)
  function evaluateExpression(expr) {
    const tokens = tokenize(expr)
    const postfix = infixToPostfix(tokens)
    return evaluatePostfix(postfix)
  }

  function tokenize(expr) {
    return expr.match(/\d+(\.\d+)?|[+\-*/()]/g)
  }

  function infixToPostfix (tokens) {
    const output = []
    const operators = []
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 }

    tokens.forEach(token => {
      if (!isNaN(token)) {
        output.push(token)
      } else if (token in precedence) {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop())
        }
        operators.push(token)
      } 
    });

    while (operators.length) {
      output.push(operators.pop())
    }

    return output;
  }

  function evaluatePostfix (postfix) {
    const stack = []

    postfix.forEach(token => {
      if (!isNaN(token)) {
        stack.push(parseFloat(token))
      } else {
        const b = stack.pop()
        const a = stack.pop()
        switch (token) {
          case '+': stack.push(a + b); break
          case '-': stack.push(a - b); break
          case '*': stack.push(a * b); break
          case '/': stack.push(a / b); break
        }
      }
    })

    return stack.pop()
  }
  return result
}
