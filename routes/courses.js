import express from "express";
import supabase from "../supabaseClient.js";
import validateEnrollment from "../middleware/validateEnrollment.js"

const router = express.Router();
router.get("/courses", async (req, res) => {
    try {
        const { data, error } = await supabase.from("courses").select("*");
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({
            status: true,
            message: "Courses fetched successfully",
            data
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: "Server error while fetching courses"
        });
    }
});

router.post("/courses", async (req, res) => {
    try {
        const { title, instructor } = req.body;
        if (!title || !instructor) {
            return res.status(400).json({
                error: "title and instructor are required"
            });
        }
        const { data, error } = await supabase
            .from("courses")
            .insert([{ title, instructor }])
            .select();
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({
            status: true,
            message: "Course added successfully",
            data
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: "Server error while creating course"
        });
    }

});

router.post("/enroll", validateEnrollment, async (req, res) => {
    try {
        const { student_name, course_id } = req.body;
        const { data: existingEnrollment, error: checkError } = await supabase
            .from("enrollments")
            .select("*")
            .eq("student_name", student_name)
            .eq("course_id", course_id)
            .single();
        if (existingEnrollment) {
            return res.status(400).json({
                status: false,
                message: "Student already enrolled in this course"
            });
        }
        const { data, error } = await supabase
            .from("enrollments")
            .insert([{ student_name, course_id }])
            .select();
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({
            status: true,
            message: "Student enrolled successfully",
            data
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: "Server error while enrolling student"
        });
    }
});

router.get("/courses/:id/enrollments", async (req, res) => {
    try {
        const courseId = req.params.id;
        const { data, error } = await supabase
            .from("enrollments")
            .select("*")
            .eq("course_id", courseId);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: "Server error while fetching enrollments"
        });
    }
});
export default router;