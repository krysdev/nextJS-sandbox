import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) {
  const feedbackID = req.query.feeedbackid; // 'feedbackid' is the name of the JS file
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackID
  );
  res.status(200).json({ feedback: selectedFeedback });
  return <div></div>;
}

export default handler;
