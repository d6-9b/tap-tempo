function MainPanel () {

    var classPrefix = 'MainPanel'

    var bpmField = BpmField()

    var intervalField = IntervalField()

    var tapButton = TapButton()

    var element = Div(classPrefix)
    element.appendChild(bpmField.element)
    element.appendChild(intervalField.element)
    element.appendChild(tapButton.element)

    return { element: element }

}
