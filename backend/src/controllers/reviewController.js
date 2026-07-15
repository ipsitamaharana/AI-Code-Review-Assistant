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

// Check if a review already exists for this submission
const { data: existingReview } = await supabase
  .from("reviews")
  .select("*")
  .eq("submission_id", submission.id)
  .maybeSingle();

let review;

if (existingReview) {
  review = existingReview;
} else {
  const { data: newReview, error: reviewError } = await supabase
    .from("reviews")
    .insert([
      {
        submission_id: submission.id,
        overall_score: 100 - analysisResult.totalIssues * 5,
        summary: "Static analysis completed.",
        code_explanation: "Generated from ESLint analysis.",
        generated_documentation: "Documentation will be generated later.",
        completed_at: new Date(),
      },
    ])
    .select()
    .single();

  if (reviewError) {
    return res.status(500).json({
      message: "Failed to save review.",
      error: reviewError.message,
    });
  }

    review = newReview;
}
const findingsToInsert = analysisResult.findings.map((finding) => ({
  review_id: review.id,
  source: "ESLint",
  category: finding.rule,
  severity: finding.severity,
  issue: finding.message,
  explanation: finding.message,
  suggested_fix: "Fix according to the ESLint rule.",
  file_name: fileData[0].file_name,
  line_number: finding.line,
}));

// Delete old findings for this review
await supabase
  .from("review_findings")
  .delete()
  .eq("review_id", review.id);

// Insert the latest findings
const { data: savedFindings, error: findingsError } = await supabase
  .from("review_findings")
  .insert(findingsToInsert)
  .select();

if (findingsError) {
  return res.status(500).json({
    message: "Failed to save review findings.",
    error: findingsError.message,
  });
}

return res.status(200).json({
  message: "Submission fetched successfully",
  submission,
  file: fileData[0],
  analysis: analysisResult,
  review,
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