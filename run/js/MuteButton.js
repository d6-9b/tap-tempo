function MuteButton () {

    function press () {
        that.muted = !that.muted
        if (that.muted) textNode.nodeValue = 'UNMUTE'
        else textNode.nodeValue = 'MUTE'
        classList.add('active')
    }

    function release () {
        classList.remove('active')
    }

    var textNode = TextNode('MUTE')

    var element = Div('MuteButton')
    element.appendChild(textNode)
    element.addEventListener('mousedown', function (e) {

        function mouseUp (e) {
            e.preventDefault()
            release()
            removeEventListener('mouseup', mouseUp)
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
            }
        }
    })

    var classList = element.classList

    var touched = false,
        identifier = null

    var that = {
        element: element,
        muted: false,
    }

    return that

}
