const express = require('express')
const app = express()
const server = require('http').Server(app)

const io = require('socket.io').listen(server)

module.exports = { express, app, server, io }
