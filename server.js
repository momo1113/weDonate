const express = require('express')
const app = express();
const PORT = 8000;
const db = require('./db')

app.get('/', (req, res) => {
    db((err, results) => {
        if (err) {
            res.send(err)
        } else {
            const result = [];
            for (var i = 0; i < results.length; i++) {
                let { id, username, product, location, email, url } = results[i];
                result.push({ id, username, product, location, email, url })

            }
            console.log(result)
            res.send(result)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})