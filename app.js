const tlLeave = gsap.timeline({
  defaults: {
    duration: .75,
    ease: 'Power2.out'
  }
})

const tlEnter = gsap.timeline({
  defaults: {
    duration: .75,
    ease: 'Power2.out'
  }
})


// Timeline functions

const leaveAnimation = (current, done) => {
  const arrow = current.querySelector('.showcase-arrow')
  const product = current.querySelector('.image-container')
  const text = current.querySelector('.showcase-text')
  const circles = current.querySelectorAll('.circle')
  
  return (
    tlLeave.fromTo(arrow, { y: 0, opacity: 1 }, { y: 50, opacity: 0 }),
    tlLeave.fromTo(product, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, '<'),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, '<'),
    tlLeave.fromTo(circles, { y:0, opacity: 1 }, { y: -200, opacity: 0, stagger: .15, ease: 'back.out(1.7)', duration: 1, onComplete: done }, '<')
  )
}

const enterAnimation = (next, done) => {
  const arrow = next.querySelector('.showcase-arrow')
  const product = next.querySelector('.image-container')
  const text = next.querySelector('.showcase-text')
  const circles = next.querySelectorAll('.circle')

  return (
    tlEnter.fromTo(arrow, { y: -50, opacity: 0 }, { y: 0, opacity: 1 }),
    tlEnter.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1, onComplete: done }, '<'),
    tlEnter.fromTo(text, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, '<'),
    tlEnter.fromTo(circles, { y: 200, opacity: 0 }, { y: 0, opacity: 1, stagger: .15, ease: 'back.out(1.7)', duration: 1, onComplete: done }, '<')
  )
}

// Run animations

barba.init({
  preventRunning: true,
  transitions: [
    // Showcase transitions
    {
      name: 'default',
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        // gsap.fromTo(current, { opacity: 1 }, { opacity: 0, duration: 1, onComplete: done });
        leaveAnimation(current, done)
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        // gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: done });
        enterAnimation(next, done)
      }
    }
  ]
});
