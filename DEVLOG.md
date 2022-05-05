# Developer Log

## May 5, 2022

* ok, to review:
    - we've got:
    - zorg that's basically `gulp` but homemade, and less powerful...
    - it's a function that accepts one argument
        -> the zorg configuration object
    - zorg then runs tasks
* also, we have `chunky`, which is the thing I'm really building... shit
    - it's a framework for building a website and providing the UI to feed it content
    - a CMS
    - cool
* reviewing todos now ;)

## April 27, 2022

* taking shape!
* `convert ./sites/kuuma/assets/images/favicon.png -define icon:auto-resize=64,48,32,16 favicon.ico`
    * create favicon from png!!!

## April 25, 2022

* what I want to build is something that allows users and devs to "stitch" data and modules together to build webpages and apps
* go through the json
* each json file can reference a "component"
* this component handles data massaging/stitching/templating/outputtin
* I'm in need of something that handles all the data fetching/ -> of the json
* it can't be too "static" anymore

* parse json
* get root component
* pass data to function
* component(data, config)
    - or component(props, config)
    - or... component({ props, config, ...other })

* react mount?
* component that can manage their content
* component is massaging its own data
* component is also managing its data..?

* refresh from server
* hooks events...