function MainPanel () {

    function scheduleTick () {
        setTimeout(function () {
            blink.tick()
            scheduleTick()
        }, averageInterval)
    }

    var classPrefix = 'MainPanel'

    var averageInterval = 500

    var bpmField = BpmField()
    bpmField.setValue(Math.round(60000 / averageInterval))

    var intervalField = IntervalField()
    intervalField.setValue(averageInterval)

    var lastTime = null
    var intervals = []

    var blink = Blink()

    var tapButton = TapButton(function () {
        var now = Date.now()
        if (lastTime !== null) {
            var interval = now - lastTime
            intervals.push(interval)
            if (intervals.length > 4) intervals.shift()
            var sum = intervals.reduce(function (a, b) {
                return a + b
            })
            averageInterval = Math.round(sum / intervals.length)
            intervalField.setValue(averageInterval)
            bpmField.setValue(Math.round(60000 / averageInterval))
        }
        lastTime = now
    })

    var element = Div(classPrefix)
    element.appendChild(bpmField.element)
    element.appendChild(intervalField.element)
    element.appendChild(blink.element)
    element.appendChild(tapButton.element)

    scheduleTick()

    return { element: element }

}
