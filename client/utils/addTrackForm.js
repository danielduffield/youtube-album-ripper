const createElement = require('./elementCreation').createElement

function addTrackForm(currentTrack) {
  const $trackFormContainer = document.getElementById('track-form-container')
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
  appendDeleteButton(currentTrack)
}

function createTrackForm(currentTrack) {
  const trackFormFields = ['num', 'name', 'start', 'end']
  const $trackForm = createElement('tr', {class: 'track-form-' + currentTrack}, '', [])

  const startEndAttributes = [
    { key: 'maxlength', value: '8' },
    { key: 'type', value: 'text' },
    { key: 'pattern', value: '[0-9]{2}:[0-9]{2}:[0-9]{2}' },
    { key: 'title', value: 'HH:MM:SS' },
  ]

  const $trackFormFields = trackFormFields.map((field, i) => {
    const $tableCell = createElement('td', {}, '', [])
    const $trackFormField = createElement('input', {
      id: `track-${field}-${currentTrack}`,
      name: `track-${field}-${currentTrack}`,
    }, '', [])

    if (field === 'num') $trackFormField.setAttribute('maxlength', '2')
    if (field === 'start' || field === 'end') {
      startEndAttributes.forEach(att => { $trackFormField.setAttribute(att.key, att.value) })
    }
    $tableCell.appendChild($trackFormField)
    return $tableCell
  })

  $trackFormFields.forEach($tableCell => { $trackForm.appendChild($tableCell) })
}

function appendDeleteButton(currentTrack) {
  const $trackForm = document.querySelector('.track-form-' + currentTrack)
  const $deleteButton = createElement('td', {}, '', [
    createElement('button', {id: 'track-delete-' + currentTrack, class: 'delete-button', type: 'button'}, 'X', [])
  ])

  $trackForm.appendChild($deleteButton)
}

module.exports = addTrackForm
