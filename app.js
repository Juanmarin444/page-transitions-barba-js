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
    tlLeave.fromTo(circles, { y:0, opacity: 1 }, { y: -200, opacity: 0, stagger: .15, ease: 'back.out(1.7)', duration: 1 }, '<'),
    tlLeave.fromTo(product, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, '<'),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { y: 100, opacity: 0, onComplete: done }, '<')
  )
}

const enterAnimation = (next, done, gradient) => {
  const arrow = next.querySelector('.showcase-arrow')
  const product = next.querySelector('.image-container')
  const text = next.querySelector('.showcase-text')
  const circles = next.querySelectorAll('.circle')

  return (
    tlEnter.fromTo(arrow, { y: -50, opacity: 0 }, { y: 0, opacity: 1 }),
    tlEnter.fromTo(circles, { y: 200, opacity: 0 }, { y: 0, opacity: 1, stagger: .15, ease: 'back.out(1.7)', duration: 1 }, '<'),
    tlEnter.fromTo(text, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, '<'),
    tlEnter.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, '<'),
    tlEnter.to('body', { background: gradient, onComplete: done }, '<')
  )
}

const productEnterAnimation = (next, done) => {
  const cards = next.querySelectorAll('.card')

  return (
    tlEnter.fromTo(next, { y: '100%' }, { y: '0%' }),
    tlEnter.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: .1, onComplete: done })
  )
}

const productLeaveAnimation = (current, done) => {

  return (
    tlLeave.fromTo(current, { y: '0%' }, { y: '100%', onComplete: done })
  )
}

// Changing gradient on Showcase
const getGradient = (name) => {
  switch(name) {
    case 'handbag':
      return 'linear-gradient(260deg, #b75d62, #754d4f)'
    case 'boot':
      return 'linear-gradient(260deg, #5d8cb7, #4c4f70)'
    case 'hat':
      return 'linear-gradient(260deg, #b27a5c, #7f5450)'
  }
}

// Run animations
barba.init({
  preventRunning: true,
  transitions: [
    // Showcase transitions
    {
      name: 'default',
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set('body', { background: gradient });
        enterAnimation(next, done, gradient)
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        // gsap.fromTo(current, { opacity: 1 }, { opacity: 0, duration: 1, onComplete: done });
        leaveAnimation(current, done)
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace)
        // gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: done });
        enterAnimation(next, done, gradient)
      }
    },
    // Handbag to Product-page transitions
    {
      name: 'product-transition',
      from: { namespace: [ 'handbag', 'product' ] },
      to: { namespace: [ 'product', 'handbag' ] },
      sync: true,
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done)
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done)
      }
    },
    // Hat to Product-page transitions
    {
      name: 'product-transition',
      from: { namespace: [ 'hat', 'product' ] },
      to: { namespace: [ 'product', 'hat' ] },
      sync: true,
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done)
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done)
      }
    },
    // Boot to Product-page transitions
    {
      name: 'product-transition',
      from: { namespace: [ 'boot', 'product' ] },
      to: { namespace: [ 'product', 'boot' ] },
      sync: true,
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done)
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done)
      }
    }
  ]
});
