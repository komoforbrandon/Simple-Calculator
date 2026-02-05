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
      let answer = OpertnFunc(display.textContent);
      answerElt.textContent = answer
      display.textContent = parseInt(answerElt.textContent)
    } else if (newValue === 'del') {
      let del_val = delFunc(display.textContent);
      display.textContent = del_val
    } else {
      let display_val = readValue(newValue, display.textContent)
      display.textContent = display_val
    }
  })
})

function delFunc(delval) {
  if (delval.length === 1) {
    return delval = 0
  } else {
    const displayValue = delval.slice(0, -1)
    return delval = displayValue
  }
}

function readValue(newval, disp_val) {
  if (disp_val === '0') {
    return newval
  } else {
    return disp_val += newval;
  }
}

function OpertnFunc(ans) {
  let express = ans
  return new Function(`return ${express}`)()
}

