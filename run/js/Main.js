(function () {

    var classPrefix = 'Main'

    var loadingElement = Div(classPrefix + '-loading')
    loadingElement.appendChild(TextNode('LOADING'))

    var alignerElement = Div(classPrefix + '-aligner')

    var body = document.body
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

            var mainPanel = MainPanel(function () {
                if (audioBufferSource) audioBufferSource.stop()
                audioBufferSource = audioContext.createBufferSource()
                audioBufferSource.buffer = audioBuffer
                audioBufferSource.connect(audioContext.destination)
                audioBufferSource.start()
            })

            body.removeChild(loadingElement)
            body.removeChild(alignerElement)
            body.appendChild(mainPanel.element)

            var resize = mainPanel.resize
            addEventListener('resize', resize)
            resize()

        })

    }

})()
