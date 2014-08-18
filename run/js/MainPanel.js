function MainPanel () {

    var classPrefix = 'MainPanel'

    var bpmField = BpmField()

    var intervalField = IntervalField()

    var lastTime = null
    var intervals = []

    var tapButton = TapButton(function () {
        var now = Date.now()
        if (lastTime !== null) {
            intervals.push(now - lastTime)
            if (intervals.length > 4) intervals.shift()
            var sum = intervals.reduce(function (a, b) {
                return a + b
            })
            var averageInterval = sum / intervals.length
            intervalField.setValue(Math.round(averageInterval))
            bpmField.setValue(Math.round(60000 / averageInterval))
        }
        lastTime = now
    })

    var element = Div(classPrefix)
    element.appendChild(bpmField.element)
    element.appendChild(intervalField.element)
    element.appendChild(tapButton.element)

    return { element: element }

}
