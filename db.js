const fs = require('fs')

module.exports = {
  getStudentById,
  saveStudentById
}

function getStudentById (studentId) {
  const studentPath = getStudentPathById(studentId)
  if (!fs.existsSync(studentPath)) {
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

const getStudentPathById = (studentId) => `./data/${studentId}.json`
