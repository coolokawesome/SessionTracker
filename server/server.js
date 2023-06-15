import express from 'express'
import cors from 'cors'
const app = express()

const port = process.env.PORT || 3000
app.use(cors())
app.get('/click/', (req, res) => {
    res.send('hi')
    res.end()
})


app.listen(port, () => {
    console.log('listening')
})