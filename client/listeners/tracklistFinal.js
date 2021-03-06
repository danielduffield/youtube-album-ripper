const { loadRef } = require('./../state/elementRefs')
const state = require('./../state/state.js')

function attachTracklistFinalListener() {
  const $trackFinalContainer = loadRef('track-final-container')
  const { $audioPlayer, $nowPlaying } = state.audio.exportPlayerRefs()

  $trackFinalContainer.addEventListener('click', e => {
    state.selectedTrack = state.tracklist[(parseInt(e.target.dataset.tracknum, 10) - 1)]
    if (!state.selectedTrack) return
    state.audio.selectTrack(state.selectedTrack)
    const $selected = loadRef(`track-final-${e.target.dataset.tracknum}`)
    for (let i = 1; i <= state.tracklist.length; i++) {
      const $track = loadRef(`track-final-${i}`)
      if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
    }
    $selected.setAttribute('class', 'track-final selected')

    $nowPlaying.textContent = state.selectedTrack.trackName
    const trackFileName = state.selectedTrack.trackName.split(' ').join('-')

    const trackPath = `/download/${state.albumMetadata.videoId}/tracks/${state.socketId}/${trackFileName}.mp3`
    $audioPlayer.pause()
    $audioPlayer.src = trackPath
    $audioPlayer.play()
  })
}

module.exports = attachTracklistFinalListener
