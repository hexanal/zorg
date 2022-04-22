export default (focusable, parent) => {
    const interactives = parent.querySelectorAll('a, input, select, button')

    interactives.forEach( interactive => {
        if (focusable) {
            interactive.removeAttribute('tabindex')
            return
        }

        interactive.setAttribute('tabindex', '-1')
    })
}