function Field (label, changeListener) {

    function repeatChange () {
        var rect = valueElement.getBoundingClientRect(),
            width = valueElement.offsetWidth,
            x = pointer.clientX - rect.left - width / 2
        value += x * 0.001
        updateValue()
        changeListener(value)
    }

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

    var leftArrowElement = Div(classPrefix + '-leftArrow')
    leftArrowElement.appendChild(TextNode('\u25c0'))

    var rightArrowElement = Div(classPrefix + '-rightArrow')
    rightArrowElement.appendChild(TextNode('\u25b6'))

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)
    valueElement.appendChild(precisionElement)
    valueElement.appendChild(leftArrowElement)
    valueElement.appendChild(rightArrowElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        classList.add('active')
        pointer = touch
        interval = setInterval(repeatChange, 50)
    })
    element.addEventListener('touchmove', function (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                pointer = touch
                break
            }
        }
    })
    element.addEventListener('touchend', function (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                clearInterval(interval)
                classList.remove('active')
            }
        }
    })

    var classList = valueElement.classList

    var value
    var identifier = null
    var pointer
    var interval

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
