function Blink () {

    var element = Div('Blink')

    var classList = element.classList

    var timeout

    return {
        element: element,
        tick: function () {
            classList.add('light')
            clearTimeout(timeout)
            timeout = setTimeout(function () {
                classList.remove('light')
            }, 100)
        },
    }

}
