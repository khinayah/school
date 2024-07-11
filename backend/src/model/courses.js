const dbPool = require('../config/database');

const getAllCourses = () => {
    const SQLQuery = 'SELECT * FROM courses';

    return dbPool.execute(SQLQuery);
}

const createNewCourse = (body) => {
    const SQLQuery = `  INSERT INTO courses (course, mentor, title) 
                        VALUES ('${body.course}', '${body.mentor}', '${body.title}')`;

    return dbPool.execute(SQLQuery);
}

const updateCourse = (body, idCourse) => {
    const SQLQuery = `  UPDATE courses 
                        SET course='${body.course}', mentor='${body.mentor}', title='${body.title}' 
                        WHERE id=${idCourse}`

    return dbPool.execute(SQLQuery)
}

const deleteCourse = (idCourse) => {
    const SQLQuery = `DELETE FROM courses WHERE id=${idCourse}`;

    return dbPool.execute(SQLQuery);
}

const getCourseById = async (idCourse) => {
    const query = `SELECT * FROM courses WHERE id = ?`;
    try {
        const [results] = await dbPool.query(query, [idCourse]);
        return results[0]
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCourses,
    createNewCourse,
    updateCourse,
    deleteCourse,
    getCourseById
}