function IntervalField () {

    var classPrefix = 'IntervalField'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('INTERVAL:'))

    var valueElement = Div(classPrefix + '-value')

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return {
        element: element,
    }

}
