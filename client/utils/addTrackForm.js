const createElement = require('./elementCreation').createElement

function addTrackForm(currentTrack) {
  const $trackFormContainer = document.getElementById('track-form-container')
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
  appendDeleteButton(currentTrack)
}

function createTrackForm(currentTrack) {
  const trackFormFields = ['num', 'name', 'start', 'end']
  const $trackForm = createElement('tr', {class: 'track-form-' + currentTrack}, '', [])

  for (let i = 0; i < trackFormFields.length; i++) {
    const $tableCell = createElement('td', {}, '', [])
    const $trackFormField = createElement('input', {
      id: 'track-' + trackFormFields[i] + '-' + currentTrack,
      name: 'track-' + trackFormFields[i] + '-' + currentTrack
    }, '', [])
    if (trackFormFields[i] === 'num') {
      $trackFormField.setAttribute('maxlength', '2')
    }
    if (trackFormFields[i] === 'start' || trackFormFields[i] === 'end') {
      $trackFormField.setAttribute('maxlength', '8')
      $trackFormField.setAttribute('type', 'text')
      $trackFormField.setAttribute('pattern', '[0-9]{2}:[0-9]{2}:[0-9]{2}')
      $trackFormField.setAttribute('title', 'HH:MM:SS')
    }
    $tableCell.appendChild($trackFormField)
    $trackForm.appendChild($tableCell)
  }
  return $trackForm
}

function appendDeleteButton(currentTrack) {
  const $trackForm = document.querySelector('.track-form-' + currentTrack)
  const $deleteButton = createElement('td', {}, '', [
    createElement('button', {id: 'track-delete-' + currentTrack, class: 'delete-button', type: 'button'}, 'X', [])
  ])

  $trackForm.appendChild($deleteButton)
}

module.exports = addTrackForm
