const fs = require('fs')

module.exports = {
  getStudentById,
  saveStudentById,
  isStudentExists
}

function getStudentById (studentId) {
  const studentPath = getStudentPathById(studentId)
  if (!isStudentExists(studentId)) {
  	const student = { studentId: studentId }
  	fs.writeFile(studentPath, JSON.stringify(student), (err) => {
  		if (err) throw err
  	})
  	return student
  }
  const student = require(studentPath)
  return student
}

function saveStudentById (studentId, student) {
  const studentPath = getStudentPathById(studentId)
  fs.writeFile(studentPath, JSON.stringify(student), (err) => {
  	if (err) throw err
  })
  return true
}

function isStudentExists (studentId) {
  const studentPath = getStudentPathById(studentId)
  return fs.existsSync(studentPath)
}

const getStudentPathById = (studentId) => `./data/${studentId}.json`
