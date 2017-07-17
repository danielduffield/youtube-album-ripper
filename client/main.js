const createFormTable = require('./utils/createFormTable.js')
const sendTracklistPostRequest = require('./utils/sendTracklistPostRequest.js')
const sendUrlPostRequest = require('./utils/sendUrlPostRequest.js')
const submitTracklist = require('./utils/submitTracklist.js')
const addTrackForm = require('./utils/addTrackForm.js')

const HashRouter = require('./utils/hashRouter.js')

function validateUrl(url) {
  return url.includes('https://www.youtube.com/')
}

function getYoutubeId(url) {
  const youtubeId = url.slice(24, url.length)
  return youtubeId
}

let currentTrack = 2
var albumMetadata = {}

document.body.appendChild(createFormTable())
const $urlInput = document.getElementById('url-submit-form')

const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)
router.listen()
router.match(window.location.hash)

const $submitButton = document.getElementById('url-submit-btn')
$submitButton.addEventListener('click', () => {
  const urlSubmission = {}
  if (validateUrl($urlInput.value)) {
    urlSubmission.url = $urlInput.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    sendUrlPostRequest(urlSubmission).then(keyData => {
      albumMetadata = keyData
      currentTrack = 1
      addTrackForm(currentTrack)
      currentTrack++
    })
  }
})

const $addTrackButton = document.getElementById('track-form-add-button')
$addTrackButton.addEventListener('click', () => {
  addTrackForm(currentTrack)
  currentTrack++
})

const $tracklistForm = document.getElementById('tracklist-form')
$tracklistForm.addEventListener('submit', event => {
  event.preventDefault()
  const trackData = new FormData($tracklistForm)
  const tracklist = submitTracklist(trackData, currentTrack)
  console.log(tracklist)
  const tracklistPost = {}
  tracklistPost.tracklist = tracklist
  tracklistPost.metaData = albumMetadata
  sendTracklistPostRequest(tracklistPost)
})