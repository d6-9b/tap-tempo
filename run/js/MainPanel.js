function MainPanel (playPulse) {

    function tick () {
        blink.tick()
        tickTimeout = setTimeout(tick, averageInterval)
        if (!muteButton.muted) playPulse()
    }

    function updateBpm () {
        bpmField.setValue(60000 / averageInterval)
    }

    function updateInterval () {
        intervalField.setValue(averageInterval)
    }

    var classPrefix = 'MainPanel'

    var averageInterval = 500

    var minBpm = 1,
        maxBpm = 240,
        minInterval = 60000 / maxBpm,
        maxInterval = 60000 / minBpm

    var bpmField = Field(minBpm, maxBpm, 'BPM', function (bpm) {
        averageInterval = 60000 / bpm
        updateInterval()
    })
    bpmField.addClass(classPrefix + '-bpmField')

    var intervalField = Field(minInterval, maxInterval, 'MS', function (interval) {
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
            averageInterval = Math.max(minInterval, Math.min(maxInterval, averageInterval))

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

    var muteButton = MuteButton()

    var buttonsElement = Div(classPrefix + '-buttons')
    buttonsElement.appendChild(blink.element)
    buttonsElement.appendChild(muteButton.element)

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(bpmField.element)
    centerElement.appendChild(intervalField.element)
    centerElement.appendChild(buttonsElement)
    centerElement.appendChild(tapButton.element)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    updateBpm()
    tick()

    return {
        element: element,
        resize: function () {

            var scale,
                width = innerWidth,
                height = innerHeight

            if (width < height) {
                scale = width / 320
                if (scale * 480 > height) scale = height / 480
            } else {
                scale = width / 480
                if (scale * 320 > height) scale = height / 320
            }

            element.style.transform = 'scale(' + scale +  ')'
            bpmField.setScale(scale)
            intervalField.setScale(scale)

        },
    }

}
