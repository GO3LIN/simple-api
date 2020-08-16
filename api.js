const db = require('./db')
const middleware = require('./middleware')

module.exports = {
  getHealth,
  saveStudent,
  getStudentById,
  deleteStudentById
}

async function getHealth (req, res, next) {
  res.json({ success: true })
}

async function saveStudent (req, res, next) {
  secureStudentIdParam(req, res, next)

  let student = db.getStudentById(req.params.studentId)
  const paramsArray = req.params[0].split('/')
  const nestedObject = paramsArray.reduceRight((prev, current) => (
	    { [current]: { ...prev } }
  ), req.body)

  student = { ...student, ...nestedObject }
  db.saveStudentById(req.params.studentId, student)

  res.json({ success: true })
}

async function getStudentById (req, res, next) {
  secureStudentIdParam(req, res, next)
  if (!db.isStudentExists(req.params.studentId)) return middleware.handleError({ statusCode: 404 }, req, res, next)

  let student = require(`./data/${req.params.studentId}.json`)
  const paramsArray = req.params[0].split('/')
  for (let i = 0; i < paramsArray.length; i++) {
  	student = student[paramsArray[i]] ?? {}
  }

  res.json({ success: true, response: student })
}

async function deleteStudentById (req, res, next) {
  secureStudentIdParam(req, res, next)
  if (!db.isStudentExists(req.params.studentId)) return middleware.handleError({ statusCode: 404 }, req, res, next)

  let student = require(`./data/${req.params.studentId}.json`)
  student = deleteKey(student, req.params[0])

  db.saveStudentById(req.params.studentId, student)
  res.json({ success: true, response: student })
}

function secureStudentIdParam (req, res, next) {
  // Throw 400 if studentId is not alphanum
  if (/[^A-Za-z0-9 ]/.test(req.params.studentId)) return middleware.handleError({ statusCode: 400 }, req, res, next)
}

const deleteKey = (obj, path) => {
    const _obj = JSON.parse(JSON.stringify(obj));
    const keys = path.split('/');

    keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
            delete acc[key];
            return true;
        }
        return acc[key];
    }, _obj);

    return _obj;
}
