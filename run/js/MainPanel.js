function MainPanel () {

    var classPrefix = 'MainPanel'

    var bpmLabelElement = Div(classPrefix + '-bpmLabel')
    bpmLabelElement.appendChild(TextNode('BPM:'))

    var intervalLabelElement = Div(classPrefix + '-intervalLabel')
    intervalLabelElement.appendChild(TextNode('INTERVAL:'))

    var tapButton = TapButton()

    var element = Div(classPrefix)
    element.appendChild(bpmLabelElement)
    element.appendChild(intervalLabelElement)
    element.appendChild(tapButton.element)

    return { element: element }

}
