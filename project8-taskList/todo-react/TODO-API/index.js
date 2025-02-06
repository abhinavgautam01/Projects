import express from 'express'

const app = express()
const port = 3300
app.get('/', (req, res)=>{
    res.send('Express + TypeScript Server')
})

app.listen(port, ()=>{
    console.log(`Your Poge is listening on http://localhost:${port}`)
})