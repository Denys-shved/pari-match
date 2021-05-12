import '../scss/app.scss'

import TWEEN from '@tweenjs/tween.js'
import MicroModal from 'micromodal'

const spinBtn = document.getElementById('spin-button')
const wheel = document.getElementById('animated-wheel')
const attemptsText = document.getElementById('attempts-number')
const twistMoreBtn = document.getElementById('twist-more-btn')
const prizeBtn = document.getElementById('prize-btn')

let attempts = 2
const rotateMaxDegrees = 3600
const animationDuration = 2500

const onSpinComplete = () => {
  MicroModal.show(attempts === 2 ? 'modal-first' : 'modal-second')
  attempts--
  attemptsText.innerText = attempts
}

const animate = (time) => {
  requestAnimationFrame(animate)
  TWEEN.update(time)
}

const spinWheel = () => {
  const finalWheelPosition = attempts === 2 ? rotateMaxDegrees + 65 : rotateMaxDegrees + 25

  new TWEEN.Tween({ rotation: 0 })
    .to({ rotation: finalWheelPosition }, animationDuration)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(({rotation}) => {
      let transform = `rotate(${rotation}deg)`
      wheel.style.transform = transform
    })
    .onComplete(onSpinComplete)
    .start()
}

document.addEventListener('DOMContentLoaded', function () {
  MicroModal.init()
  attemptsText.innerText = attempts

  spinBtn.addEventListener('click', () => {
    if (attempts <= 0) {
      alert('You have used all your attempts(')
    } else {
      spinWheel()
      animate()
    }
  })  

  twistMoreBtn.addEventListener('click', () => {
    MicroModal.close('modal-first')

    setTimeout(() => {
      if (attempts <= 0) return
      spinWheel()
      animate()
    }, 350)
  })

  prizeBtn.addEventListener('click', () => {
    MicroModal.close('modal-second')

    setTimeout(() => {
      alert('To be implemented!')
    }, 350)
  })
})