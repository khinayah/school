const dbPool = require('../config/database');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `  INSERT INTO users (course, mentor, title) 
                        VALUES ('${body.username}', '${body.email}', '${body.password}')`;

    return dbPool.execute(SQLQuery);
}

const updateUser = (body, idUser) => {
    const SQLQuery = `  UPDATE users 
                        SET username='${body.username}', email='${body.email}', password='${body.password}' 
                        WHERE id=${idUser}`

    return dbPool.execute(SQLQuery)
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;

    return dbPool.execute(SQLQuery)
}

module.exports = {
    getAllUsers,
    createNewUser
}