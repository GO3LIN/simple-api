const { STATUS_CODES } = require('http')

module.exports = {
  notFound,
  handleError,
  secureStudentIdParam
}

function handleError (err, req, res, next) {
  if (res.headersSent) return next(err)

  if (!err.statusCode) console.error(err)
  const statusCode = err.statusCode || 500
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'
  res.status(statusCode).json({ error: errorMessage })
}

function notFound (req, res) {
  res.status(404).json({ error: 'Not Found' })
}

function secureStudentIdParam (req, res, next) {
  if (req.params.studentId && /[^A-Za-z0-9 ]/.test(req.params.studentId)) return middleware.handleError({ statusCode: 400 }, req, res, next)
  next()
}

// Throw 400 if studentIf is not alphanum
