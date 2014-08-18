function BpmField () {

    var classPrefix = 'BpmField'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('BPM:'))

    var valueElement = Div(classPrefix + '-value')

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return {
        element: element,
    }

}
