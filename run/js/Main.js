(function () {
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
            document.body.appendChild(mainPanel.element)

            var resize = mainPanel.resize
            addEventListener('resize', resize)
            resize()

        })

    }
})()
