const SelectModel = require('../model/select')

const getMentorFees = async (req, res) => {
    try {
        const data = await SelectModel.getMentorFees();
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching mentor fees:', error);
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        })
    }
}

const getCourseStudentCount = async (req, res) => {
    try {
        const data = await SelectModel.getCourseStudentCount();
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching course student count:', error);
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message
        })
    }
}


const getMentorSarjana = async (req, res) => {
    try {
        const data = await SelectModel.getMentorSarjana()
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching users with courses:', error);
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        })
    }
}

const getMentorNotSarjana = async (req, res) => {
    try {
        const data = await SelectModel.getMentorNotSarjana()
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching users with courses:', error);
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        })
    }
}


module.exports = { 
    getMentorFees,
    getCourseStudentCount,
    getMentorSarjana,
    getMentorNotSarjana
 }