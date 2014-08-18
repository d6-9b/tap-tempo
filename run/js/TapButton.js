function TapButton () {

    function press () {
        classList.add('active')
    }

    function release () {
        classList.remove('active')
    }

    var element = Div('TapButton')
    element.appendChild(TextNode('TAP'))
    element.addEventListener('mousedown', function (e) {

        function mouseUp (e) {
            e.preventDefault()
            if (touched) touched = false
            else {
                release()
                removeEventListener('mouseup', mouseUp)
            }
        }

        e.preventDefault()
        if (touched) touched = false
        else {
            press()
            addEventListener('mouseup', mouseUp)
        }

    })
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touched = true
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        press()
    })
    element.addEventListener('touchend', function (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                release()
                break
            }
        }
    })

    var classList = element.classList

    var touched = false,
        identifier = null

    return { element: element }

}
