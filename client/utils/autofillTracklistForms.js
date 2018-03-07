const addTrackForm = require('./addTrackForm.js')
const { setOverwriteRef } = require('./elementRefs')

function autofillTracklistForms(scrapedTracklist) {

  const trackFormFields = [
    { name: 'num', property: 'trackNum' },
    { name: 'name', property: 'trackName' },
    { name: 'start', property: 'trackStart' },
    { name: 'end', property: 'trackEnd' }
  ]

  scrapedTracklist.forEach((track, trackIndex) => {
    const currentTrack = trackIndex + 1

    trackFormFields.forEach((field, fieldIndex) => {
      const $form = setOverwriteRef(`track-${field.name}-${currentTrack}`)
      $form.value = track[field.property]
    })

    if (scrapedTracklist[trackIndex + 1]) {
      addTrackForm(currentTrack + 1)
    }
  })
}

module.exports = autofillTracklistForms
