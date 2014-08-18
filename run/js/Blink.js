function Blink () {

    var element = Div('Blink')

    var classList = element.classList

    return {
        element: element,
        tick: function () {
            classList.add('light')
            setTimeout(function () {
                classList.remove('light')
            }, 100)
        },
    }

}
