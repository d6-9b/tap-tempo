function MainPanel () {

    function tick () {
        blink.tick()
        tickTimeout = setTimeout(tick, averageInterval)
    }

    function updateBpm () {
        bpmField.setValue(60000 / averageInterval)
    }

    function updateInterval () {
        intervalField.setValue(averageInterval)
    }

    var classPrefix = 'MainPanel'

    var averageInterval = 500

    var bpmField = Field('BPM', function (bpm) {
        averageInterval = 60000 / bpm
        updateInterval()
    })
    bpmField.addClass(classPrefix + '-bpmField')

    var intervalField = Field('MS', function (interval) {
        averageInterval = interval
        updateBpm()
    })
    intervalField.addClass(classPrefix + '-intervalField')
    updateInterval()

    var blink = Blink()

    var lastTime = null
    var intervals = []
    var tickTimeout, resetTimeout

    var tapButton = TapButton(function () {
        var now = Date.now()
        if (lastTime !== null) {

            var interval = now - lastTime
            intervals.push(interval)
            if (intervals.length > 4) intervals.shift()
            var sum = intervals.reduce(function (a, b) {
                return a + b
            })
            averageInterval = sum / intervals.length

            updateBpm()
            updateInterval()

            clearTimeout(tickTimeout)
            tick()

            clearTimeout(resetTimeout)
            resetTimeout = setTimeout(function () {
                lastTime = null
                intervals.splice(0)
            }, 4 * averageInterval)

        }
        lastTime = now
    })

    var element = Div(classPrefix)
    element.appendChild(bpmField.element)
    element.appendChild(intervalField.element)
    element.appendChild(blink.element)
    element.appendChild(tapButton.element)

    updateBpm()
    tick()

    return { element: element }

}
