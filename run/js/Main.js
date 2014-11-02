
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
