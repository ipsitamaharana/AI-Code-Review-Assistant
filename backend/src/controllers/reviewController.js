const supabase = require("../config/supabase");
const { analyzeCode } = require("../services/staticAnalysisService");
const prepareReview = async (req, res) => {
  try {
    const { submissionId } = req.params;
    console.log("Submission ID:", submissionId);

    const { data: submission, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (error || !submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    console.log("Looking for file with submission_id:", submissionId);

const { data: fileData, error: fileError } = await supabase
  .from("submission_files")
  .select("*")
  .eq("submission_id", submissionId);

console.log("File Data:", fileData);
console.log("File Error:", fileError);
if (fileError || fileData.length === 0) {
  return res.status(404).json({
    message: "Submitted file not found",
  });
}
const analysisResult = await analyzeCode(
  fileData[0].file_content,
  fileData[0].language
);

    return res.status(200).json({
  message: "Submission fetched successfully",
  submission,
  file: fileData[0],
  analysis: analysisResult,
});
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  prepareReview,
};