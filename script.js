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
    dispVal = dispVal.slice(0, -1) + newval
    return dispVal
  } else {
    dispVal += newval
    return dispVal
  }
}

function OpertnFunc (ans) {
  console.log(ans.split(''))
  // eslint-disable-next-line no-eval
  const express = eval(ans)
  return express
}
