function TapButton () {

    var element = Div('TapButton')
    element.appendChild(TextNode('TAP'))
    element.addEventListener('touchstart', function (e) {
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        classList.add('active')
    })
    element.addEventListener('touchend', function (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                classList.remove('active')
                break
            }
        }
    })

    var classList = element.classList

    var identifier = null

    return { element: element }

}
