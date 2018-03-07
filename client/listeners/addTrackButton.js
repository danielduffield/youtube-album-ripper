const { addLoadRef } = require('./../state/elementRefs')
const state = require('./../state/state.js')

const addTrackForm = require('./../utils/addTrackForm.js')

function attachAddTrackButtonListener() {
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $addTrackButton = addLoadRef('track-form-add-button')

  return $addTrackButton.addEventListener('click', () => {
    $tracklistError.textContent = ''
    addTrackForm(state.currentTrack)
    state.currentTrack += 1
  })
}

module.exports = attachAddTrackButtonListener