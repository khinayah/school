const express = require('express')

const { login } = require('../controller/auth.js')
const SelectedData = require('../controller/select.js')
const UserController = require('../controller/users.js')
const CourseController = require('../controller/courses.js')
const { jwtAuth, jwtAuthAdmin } = require('../middleware/auth')

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to API")
})
router.post('/login', login)
router.get('/users', jwtAuthAdmin, UserController.getAllUsers)
router.post('/users', jwtAuthAdmin, UserController.createNewUser)

router.get('/mentor-fee', SelectedData.getMentorFees)
router.get('/count-student', SelectedData.getCourseStudentCount)
router.get('/mentor-sarjana', SelectedData.getMentorSarjana)
router.get('/mentor-not-sarjana', SelectedData.getMentorNotSarjana)

router.get('/courses', CourseController.getAllCourses)
router.get('/courses/:idCourse', CourseController.getCourseById)
router.post('/courses', jwtAuth, CourseController.createNewCourse)
router.patch('/courses/:idCourse', jwtAuth, CourseController.updateCourse)
router.delete('/courses/:idCourse', jwtAuth, CourseController.deleteCourse)



module.exports = router;