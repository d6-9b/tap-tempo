function Field (label, changeListener) {

    function updateValue () {
        valueNode.nodeValue = Math.floor(value)
        var precision = Math.floor((value % 1) * 100)
        if (precision < 10) precision = '0' + precision
        precisionNode.nodeValue = precision
    }

    var classPrefix = 'Field'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode(label + ':'))

    var precisionNode = TextNode('0')

    var precisionElement = Div(classPrefix + '-precision')
    precisionElement.appendChild(TextNode('.'))
    precisionElement.appendChild(precisionNode)

    var valueNode = TextNode('0')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)
    valueElement.appendChild(precisionElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        oldX = touch.clientX
    })
    element.addEventListener('touchmove', function (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                var newX = touch.clientX
                value += (newX - oldX) * 0.01
                oldX = newX
                updateValue()
                changeListener(value)
            }
        }
    })
    element.addEventListener('touchend', function (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
            }
        }
    })

    var value
    var identifier = null
    var oldX

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        setValue: function (_value) {
            value = _value
            updateValue()
        },
    }

}
