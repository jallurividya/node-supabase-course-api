const validateEnrollment = (req, res, next) => {
    const { student_name, course_id } = req.body;
    if (!student_name || !course_id) {
        return res.status(400).json({
            error: "student name and course id are required"
        })
    }
    next()
}
export default validateEnrollment