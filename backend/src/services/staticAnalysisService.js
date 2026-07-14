const { ESLint } = require("eslint");



async function analyzeCode(code, language) {
  if (language !== "JavaScript") {
    return {
      success: true,
      language,
      message: `Static analysis for ${language} will be supported in future.`,
      findings: [],
    };
  }

  const eslint = new ESLint();

const results = await eslint.lintText(code);

const findings = results[0].messages.map((item) => ({
  rule: item.ruleId,
  message: item.message,
  line: item.line,
  severity: item.severity === 2 ? "Error" : "Warning",
}));

return {
  success: true,
  language,
  message: "JavaScript code analyzed successfully.",
  totalIssues: findings.length,
  findings,
};
}

module.exports = {
  analyzeCode,
};