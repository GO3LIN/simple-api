const db = require('./db')
const middleware = require('./middleware')

module.exports = {
  getHealth,
  saveStudent
}

async function getHealth (req, res, next) {
  res.json({ success: true })
}

async function saveStudent (req, res, next) {
  // Throw 400 if studentIf is not alphanum
  if (/[^A-Za-z0-9 ]/.test(req.params.studentId)) middleware.handleError({ statusCode: 400 }, req, res, next)

  let student = db.getStudentById(req.params.studentId)
  const paramsArray = req.params[0].split('/')
  const nestedObject = paramsArray.reduceRight((prev, current) => (
	    { [current]: { ...prev } }
  ), req.body)

  student = { ...student, ...nestedObject }
  db.saveStudentById(req.params.studentId, student)

  res.json({ success: true })
}
