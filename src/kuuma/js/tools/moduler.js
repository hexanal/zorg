const moduler = {
  state: {},

  mount: function ( root ) {
    const elementsWithModule = root.querySelectorAll(`[data-component]`)

    elementsWithModule.forEach( element => {
      const { component } = element.dataset

      component
        .split(',')
        .map( module => this.mountModuleOnElement( element, module.trim() ) )
    })
  },

  kill: function () {
    // this.state = {}
    return Promise.resolve()
  },

  mountModuleOnElement: function( element, moduleId ) {
    if ( !moduleId ) return

    const children = {}

    element
      .querySelectorAll('[data-child]')
      .forEach( child => children[ child.dataset.child ] = child )

    import(`../../components/${ moduleId }.js`)
      .then( m => {
        m.default({ element, children })
      })
      .catch( err => {
        console.error( err.message )
      })
  }
}

export default moduler
