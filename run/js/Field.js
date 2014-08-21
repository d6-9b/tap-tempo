function Field (minValue, maxValue, label, changeListener) {

    function beginPointer (_pointer) {
        pointer = _pointer
        classList.add('active')
        interval = setInterval(repeatChange, 50)
    }

    function endPointer () {
        clearInterval(interval)
        classList.remove('active')
    }

    function repeatChange () {
        var rect = valueElement.getBoundingClientRect(),
            width = valueElement.offsetWidth * scale,
            x = (pointer.clientX - rect.left - width / 2) * 2
        value += x * 0.001
        value = Math.max(minValue, Math.min(maxValue, value))
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

    var precisionNode = TextNode('')

    var precisionElement = Div(classPrefix + '-precision')
    precisionElement.appendChild(TextNode('.'))
    precisionElement.appendChild(precisionNode)

    var valueNode = TextNode('')

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
    element.addEventListener('mousedown', function (e) {

        function mouseMove (e) {
            e.preventDefault()
            pointer = e
        }

        function mouseUp (e) {
            e.preventDefault()
            endPointer()
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
        }

        e.preventDefault()
        if (touched) touched = false
        else {
            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)
            beginPointer(e)
        }

    })
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touched = true
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        beginPointer(touch)
    })
    element.addEventListener('touchmove', function (e) {
        e.preventDefault()
        touched = true
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
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                endPointer()
            }
        }
    })

    var classList = valueElement.classList

    var value, pointer, interval,
        touched = false,
        identifier = null,
        scale = 1

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        setScale: function (_scale) {
            scale = _scale
        },
        setValue: function (_value) {
            value = _value
            updateValue()
        },
    }

}
