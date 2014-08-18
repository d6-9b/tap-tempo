function Field (label) {

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

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        setValue: function (value) {

            valueNode.nodeValue = Math.floor(value)

            var precision = Math.floor((value % 1) * 100)
            if (precision < 10) precision = '0' + precision
            precisionNode.nodeValue = precision

        },
    }

}
