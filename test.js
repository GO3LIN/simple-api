const tape = require('tape')
const jsonist = require('jsonist')

const studentFixture = require('./student.json')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

tape('save student', async function (t) {
  const url = `${endpoint}/studentid123/property1/property2/property3/property4`
  jsonist.put(url, studentFixture, (err, body) => {
  	if (err) t.error(err)
  	t.ok(body.success, 'should have successful student save')
  	t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
