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
  function evaluateExpression (expr) {
    const normalize = normaliseExpr(expr)
    const arrOfChar = strToArr(normalize)
    const calMultDiv = perfMultDiv(arrOfChar)
    const calAddSub = perfAddSub(calMultDiv)
    return calAddSub[0]
  }

  function normaliseExpr (expr) {
    const x = expr.replace(/\+-/g, '-')
    return x
  }

  function strToArr (expr) {
    const x = expr.match(/\d+(\.\d+)?|[+\-*%/()]/g)
    const normArr = []
    for (let i = 0; i < x.length; i++) {
      if (i === 0 && x[i] === '-') {
        const negNum = '-' + x[i + 1]
        normArr.push(Number(negNum))
        i++
      } else if ((x[i] === '*' || x[i] === '/') && x[i + 1] === '-' && !isNaN(x[i + 2])) {
        normArr.push(x[i])
        const negNum = '-' + x[i + 2]
        normArr.push(Number(negNum))
        i += 2
      } else if (!isNaN(x[i])) {
        normArr.push(Number(x[i]))
      } else {
        normArr.push(x[i])
      }
    }
    return normArr
  }

  function perfMultDiv (x) {
    let i = 0
    while (i < x.length) {
      if (x[i] === '*') {
        const multValue = x[i - 1] * x[i + 1]
        x.splice(i - 1, 3, multValue)
      } else if (x[i] === '/') {
        const diValue = x[i - 1] / x[i + 1]
        x.splice(i - 1, 3, diValue)
      } else if (x[i] === '%') {
        if (x[i + 1] !== undefined || x[i + 1] !== null) {
          const modValue = (x[i - 1] / 100) * (x[i + 1])
          x.splice(i - 1, 3, modValue)
        } else {
          const modValue = x[i - 1] / 100
          x.splice(i - 1, 2, modValue)
        }
      } else {
        i++
      }
    }
    return x
  }

  function perfAddSub (x) {
    let i = 0
    while (i < x.length) {
      if (x[i] === '+') {
        const addValue = x[i - 1] + x[i + 1]
        x.splice(i - 1, 3, addValue)
      } else if (x[i] === '-') {
        const subValue = x[i - 1] - x[i + 1]
        x.splice(i - 1, 3, subValue)
      } else {
        i++
      }
    }
    return x
  }
  return result
}
