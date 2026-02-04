const btns = document.querySelectorAll('.btn')
const display = document.getElementById('input')
const answerElt = document.getElementById('answer')

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const newValue = btn.dataset.value;
    if (newValue === 'AC') {
      display.textContent = 0
      answerElt.textContent = 0
    } else if (newValue == '=') {
        answerElt.textContent = eval(display.textContent)
        display.textContent = answerElt.textContent
    } else if(newValue === 'del'){
      let displayValue=(display.textContent).slice(0,-1)
      display.textContent=displayValue
    }
    else {
      display.textContent += newValue
    }
  })
})
