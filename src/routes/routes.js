const express = require("express");
const router = express.Router();
const crawlerFunction = require("../services/crawler");

// Route to receive user requests to start the workflow
router.post("/query/:cpfNumber", async (req, res) => {
  try {
    // Extract the cpfNumber parameter from the request URL
    const { cpfNumber } = req.params;

    // Call the crawler function with the provided cpfNumber
    const result = await crawlerFunction(cpfNumber);

    // Respond with the result from the crawler function
    res.json({ result });

    // Log a success message to the console
    console.log("Crawler finished successfully");
  } catch (err) {
    // If an error occurs, log the error message and respond with an error status and message
    console.error("Error while crawling the web:", err);
    res.status(500).json({ error: "Error while crawling the web" });
  }
});

// Export the router to be used in the main app.js file
module.exports = router;
