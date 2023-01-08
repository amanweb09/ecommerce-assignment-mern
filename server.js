const { PORT, COOKIE_SECRET, REACT_APP_URL } = require('./env')

const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)

const corsOptions = {
    origin: [REACT_APP_URL],
    credentials: true 
}
app.use(require('cors')(corsOptions))

require('./db/connection')()

app.use(require('cookie-parser')(COOKIE_SECRET))
app.use(express.json())
app.use('/api', require('./routes'))

const INDEX_PATH = path.resolve(__dirname, './client/dist', 'index.html')
const STATIC_PATH = path.resolve(__dirname, './client/dist')
app.use(express.static(STATIC_PATH))
app.use('*', (req, res) => {
    return res.status(200).sendFile(INDEX_PATH)
})

server.listen(PORT, () => console.log('Server running on port' + PORT))
