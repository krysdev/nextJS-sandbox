import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = path.join(process.cwd(), "data", "storedfeedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "stored", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "it's working" });
  }
}

export default handler;

// files in the API folder are executed on the server side (not exposed to visitors)
