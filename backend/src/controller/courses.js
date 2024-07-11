const CoursesModel = require('../model/courses');

const getAllCourses = async (req, res) => {
    try {
        const [data] = await CoursesModel.getAllCourses();
    
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createNewCourse = async (req, res) => {
    const { body } = req;

    // Validasi input
    if (!body.course || !body.mentor || !body.title) {
        return res.status(400).json({
            message: 'Anda mengirimkan data yang salah',
            data: null,
        });
    }

    try {
        // Panggil fungsi untuk membuat kursus baru di model
        await CoursesModel.createNewCourse(body);

        // Respons sukses
        res.status(201).json({
            message: 'CREATE new course success',
            data: body
        });
    } catch (error) {
        // Logging kesalahan untuk debugging
        console.error('Error creating new course:', error);

        // Respons kesalahan
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message || 'Unknown server error', // Menggunakan pesan kesalahan atau pesan default
        });
    }
}

const updateCourse = async (req, res) => {
    const {idCourse} = req.params;
    const {body} = req;
    try {
        await CoursesModel.updateCourse(body, idCourse)
        res.json({
            message: 'UPDATE course success',
            data: {
                id: idCourse,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteCourse = async (req, res) => {
    const {idCourse} = req.params;
    try {
        await CoursesModel.deleteCourse(idCourse)
        res.json({
            message: 'DELETE user success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const getCourseById = async (req, res) => {
    const { idCourse } = req.params

    try {
        const course = await CoursesModel.getCourseById(idCourse)
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({
                message: `Course with id ${idCourse} not found`,
                data: null
            });
        }
    } catch (error) {
        console.error(`Error fetching course with id ${idCourse}:`, error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        })
    }
}

module.exports = {
    getAllCourses,
    createNewCourse,
    updateCourse,
    deleteCourse,
    getCourseById
}