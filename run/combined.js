(function () {
function Blink () {

    var element = Div('Blink')

    var classList = element.classList

    var timeout

    return {
        element: element,
        tick: function () {
            classList.add('light')
            clearTimeout(timeout)
            timeout = setTimeout(function () {
                classList.remove('light')
            }, 100)
        },
    }

}
;
function Field (minValue, maxValue, label, changeListener) {

    function beginPointer (_pointer) {
        pointer = _pointer
        classList.add('active')
        interval = setInterval(repeatChange, 50)
    }

    function endPointer () {
        clearInterval(interval)
        classList.remove('active')
    }

    function repeatChange () {
        var rect = valueElement.getBoundingClientRect(),
            width = valueElement.offsetWidth * scale,
            x = (pointer.clientX - rect.left - width / 2) * 2
        value += x * 0.001
        value = Math.max(minValue, Math.min(maxValue, value))
        updateValue()
        changeListener(value)
    }

    function updateValue () {
        valueNode.nodeValue = Math.floor(value)
        var precision = Math.floor((value % 1) * 100)
        if (precision < 10) precision = '0' + precision
        precisionNode.nodeValue = precision
    }

    var classPrefix = 'Field'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode(label + ':'))

    var precisionNode = TextNode('')

    var precisionElement = Div(classPrefix + '-precision')
    precisionElement.appendChild(TextNode('.'))
    precisionElement.appendChild(precisionNode)

    var valueNode = TextNode('')

    var leftArrowElement = Div(classPrefix + '-leftArrow')
    leftArrowElement.appendChild(TextNode('\u25c0'))

    var rightArrowElement = Div(classPrefix + '-rightArrow')
    rightArrowElement.appendChild(TextNode('\u25b6'))

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)
    valueElement.appendChild(precisionElement)
    valueElement.appendChild(leftArrowElement)
    valueElement.appendChild(rightArrowElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)
    element.addEventListener('mousedown', function (e) {

        function mouseMove (e) {
            e.preventDefault()
            pointer = e
        }

        function mouseUp (e) {
            e.preventDefault()
            endPointer()
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
        }

        e.preventDefault()
        if (touched) touched = false
        else {
            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)
            beginPointer(e)
        }

    })
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touched = true
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        beginPointer(touch)
    })
    element.addEventListener('touchmove', function (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                pointer = touch
                break
            }
        }
    })
    element.addEventListener('touchend', function (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                endPointer()
            }
        }
    })

    var classList = valueElement.classList

    var value, pointer, interval,
        touched = false,
        identifier = null,
        scale = 1

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        setScale: function (_scale) {
            scale = _scale
        },
        setValue: function (_value) {
            value = _value
            updateValue()
        },
    }

}
;
function Div (className) {
    var div = document.createElement('div')
    div.className = className
    return div
}
;
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
;
function MuteButton () {

    function updateText () {
        if (that.muted) textNode.nodeValue = 'UNMUTE'
        else textNode.nodeValue = 'MUTE'
    }

    function press () {
        that.muted = !that.muted
        localStorage.muted = JSON.stringify(that.muted)
        updateText()
        classList.add('active')
    }

    function release () {
        classList.remove('active')
    }

    var textNode = TextNode('')

    var element = Div('MuteButton')
    element.appendChild(textNode)
    element.addEventListener('mousedown', function (e) {

        function mouseUp (e) {
            e.preventDefault()
            release()
            removeEventListener('mouseup', mouseUp)
        }

        e.preventDefault()
        if (touched) touched = false
        else {
            press()
            addEventListener('mouseup', mouseUp)
        }

    })
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touched = true
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        press()
    })
    element.addEventListener('touchend', function (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                release()
            }
        }
    })

    var classList = element.classList

    var touched = false,
        identifier = null

    var that = {
        element: element,
        muted: (function () {
            try {
                return JSON.parse(localStorage.muted)
            } catch (e) {
                return false
            }
        })(),
    }

    updateText()

    return that

}
;
function TapButton (tapListener) {

    function press () {
        tapListener()
        classList.add('active')
    }

    function release () {
        classList.remove('active')
    }

    var element = Div('TapButton')
    element.appendChild(TextNode('TAP'))
    element.addEventListener('mousedown', function (e) {

        function mouseUp (e) {
            e.preventDefault()
            if (touched) touched = false
            else {
                release()
                removeEventListener('mouseup', mouseUp)
            }
        }

        e.preventDefault()
        if (touched) touched = false
        else {
            press()
            addEventListener('mouseup', mouseUp)
        }

    })
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touched = true
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        press()
    })
    element.addEventListener('touchend', function (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                release()
                break
            }
        }
    })

    var classList = element.classList

    var touched = false,
        identifier = null

    return { element: element }

}
;
function TextNode (text) {
    return document.createTextNode(text)
}
;

(function () {

    function initResize () {
        var resize = mainPanel.resize
        addEventListener('resize', resize)
        resize()
    }

    ;(function () {
        var style = document.createElement('style')
        style.innerHTML =
            '@font-face {' +
                'font-family: FreeMono;' +
                'src: url(fonts/FreeMono.ttf);' +
                'src: local("FreeMono") url(fonts/FreeMono.ttf);' +
            '}'
        document.head.appendChild(style)
    })()

    var body = document.body

    var mainPanel

    if (window.AudioContext) {

        var classPrefix = 'Main'

        var loadingElement = Div(classPrefix + '-loading')
        loadingElement.appendChild(TextNode('LOADING'))

        var alignerElement = Div(classPrefix + '-aligner')

        body.appendChild(loadingElement)
        body.appendChild(alignerElement)

        var request = new XMLHttpRequest
        request.open('get', 'pulse.ogg')
        request.responseType = 'arraybuffer'
        request.send()
        request.onload = function () {

            var audioBufferSource

            var audioContext = new AudioContext
            audioContext.decodeAudioData(request.response, function (audioBuffer) {

                mainPanel = MainPanel(function () {
                    if (audioBufferSource) audioBufferSource.stop()
                    audioBufferSource = audioContext.createBufferSource()
                    audioBufferSource.buffer = audioBuffer
                    audioBufferSource.connect(audioContext.destination)
                    audioBufferSource.start()
                })

                body.removeChild(loadingElement)
                body.removeChild(alignerElement)
                body.appendChild(mainPanel.element)

                initResize()

            })

        }

    } else {
        var audios = []
        mainPanel = MainPanel(function () {
            if (!audios.length) audios.push(new Audio('pulse.ogg'))
            var audio = audios.shift()
            audio.play()
            audio.addEventListener('ended', function ended () {
                audio.removeEventListener('ended', ended)
                audios.push(audio)
            })
        })
        body.appendChild(mainPanel.element)
        initResize()
    }

})()
;

})()