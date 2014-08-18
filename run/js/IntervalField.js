function IntervalField () {

    var classPrefix = 'IntervalField'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('MS:'))

    var valueNode = TextNode('0')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return {
        element: element,
        setValue: function (value) {
            valueNode.nodeValue = value
        },
    }

}
