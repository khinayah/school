const db = require('../config/database')
const getMentorFees = async () => {
    const query = `
        SELECT 
            c.mentor,
            COUNT(uc.user_id) AS number_of_students,
            COUNT(uc.user_id) * 2000000 AS total_fee
        FROM 
            userCourse uc
        JOIN 
            courses c ON uc.course_id = c.id
        GROUP BY 
            c.mentor, c.title;
    `;

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw err;
    }
}

const getCourseStudentCount = async () => {
    const query = `
        SELECT 
            c.course,
            c.mentor,
            c.title, 
            COUNT(uc.user_id) AS number_of_students
        FROM 
            userCourse uc
        JOIN 
            courses c ON uc.course_id = c.id
        GROUP BY 
            c.course;
    `

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw err;
    }
}

const getMentorSarjana = async () => {
    const query = `
        SELECT 
            u.id,
            u.username AS user_name, 
            c.course,
            c.mentor,
            c.title
        FROM 
            userCourse uc
        JOIN 
            users u ON uc.user_id = u.id
        JOIN 
            courses c ON uc.course_id = c.id
        WHERE 
            c.title LIKE 'S%';
    `

    try {
        const [results] = await db.query(query);
        return results
    } catch (err) {
        throw err
    }
}

const getMentorNotSarjana = async () => {
    const query = `
        SELECT 
            u.id,
            u.username AS user_name, 
            c.course,
            c.mentor,
            c.title
        FROM 
            userCourse uc
        JOIN 
            users u ON uc.user_id = u.id
        JOIN 
            courses c ON uc.course_id = c.id
        WHERE 
            c.title NOT LIKE 'S%';
    `

    try {
        const [results] = await db.query(query);
        return results
    } catch (err) {
        throw err
    }
}


module.exports = {
    getMentorFees,
    getCourseStudentCount,
    getMentorSarjana,
    getMentorNotSarjana
}