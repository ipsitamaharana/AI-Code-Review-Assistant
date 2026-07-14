const supabase = require("../config/supabase");
const fs = require("fs");

const uploadCodeSubmission = async (req, res) => {
    try {
        console.log("Upload API was called");

       const {
    title,
    submission_type,
    language,
    pasted_code
} = req.body;

const uploadedFile = req.file;
let fileContent = null;

if (uploadedFile) {
    fileContent = fs.readFileSync(uploadedFile.path, "utf8");
}

const user_id = req.user.id;

if (!title || !submission_type || !language) {
    return res.status(400).json({
        message: "Title, submission type, and language are required"
    });
}

if (!pasted_code && !uploadedFile) {
    return res.status(400).json({
        message: "Please provide either pasted code or upload a code file"
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
    .select()
    .single();  

if (uploadedFile) {
    const { error: fileError } = await supabase
        .from("submission_files")
        .insert([
            {
                submission_id: data.id,
                file_name: uploadedFile.originalname,
                file_extension: uploadedFile.originalname.split(".").pop(),
                language,
                file_content: fileContent
            }
        ]);

    if (fileError) {
        return res.status(500).json({
            message: fileError.message
        });
    }
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