const express = require('express')

const app = express()

app.use(express.static('Fable'))

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})

// const port = 80

// app.get('/', (req, res) => {
//   res.send('Fable')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })