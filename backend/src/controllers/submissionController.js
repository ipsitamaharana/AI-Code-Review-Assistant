const supabase = require("../config/supabase");

const uploadCodeSubmission = async (req, res) => {
    try {
        console.log("Upload API was called");

       const {
    title,
    submission_type,
    language,
    pasted_code
} = req.body;
const user_id = req.user.id;

 if (!title || !submission_type || !language || !pasted_code) {
    return res.status(400).json({
        message: "All fields are required"
    });
}

        const { data, error } = await supabase
    .from("submissions")
    .insert([
    {
        user_id,
        title,
        submission_type,
        language,
        pasted_code
    }
])
    .select();

if (error) {
    return res.status(500).json({
        message: error.message
    });
}

res.status(201).json({
    message: "Submission uploaded successfully",
    data
});

 } catch (error) {
    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    });
}
};

module.exports = {
    uploadCodeSubmission
};