const express = require('express')
//compression = require("compression")

const ssr = require('./xssr'),
  app = express(),
  port = process.env.PORT || 8080

const serve = (path, cache) =>
  express.static(ssr.resolveWWW(path), {
    maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0
  })

app.use('/', serve('.', true))

// this should be last get(), rendering with SSR
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  ssr.renderToString({ req, res }, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url)
      } else if (err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        //res.status(500).send("500 | Internal Server Error")
        res.status(500).send(`<h1>Error 500</h1><pre>${err.stack}</pre>`)
        console.error(`500 on ${req.url}`)
        console.error(err)
        console.error(err.stack)
      }
    } else {
      res.send(html)
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
