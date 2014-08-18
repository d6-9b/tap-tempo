function MainPanel () {

    var classPrefix = 'MainPanel'

    var bpmLabelElement = Div(classPrefix + '-bpmLabel')
    bpmLabelElement.appendChild(TextNode('BPM:'))

    var intervalLabelElement = Div(classPrefix + '-intervalLabel')
    intervalLabelElement.appendChild(TextNode('INTERVAL:'))

    var tapElement = Div(classPrefix + '-tap')
    tapElement.appendChild(TextNode('TAP'))
    tapElement.addEventListener('touchstart', function (e) {
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        tapElement.classList.add('active')
    })
    tapElement.addEventListener('touchend', function (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                tapElement.classList.remove('active')
                break
            }
        }
    })

    var identifier = null

    var element = Div(classPrefix)
    element.appendChild(bpmLabelElement)
    element.appendChild(intervalLabelElement)
    element.appendChild(tapElement)

    return { element: element }

}
