const puppeteer = require("puppeteer");
const { Client } = require("elasticsearch");
const publishersFunction = require("./publisher");

import credentialsToTest from "../utils/credentials.mock.js";

// Create a new instance of the ElasticSearch client using node as the connection mode
const esClient = new Client({ node: "http://localhost:9200" });

// Define the main crawler function
async function crawlerFunction(cpfNumber = "0") {
  try {
    // Launch a headless Chrome browser using Puppeteer
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
      headless: true,
      args: ["--no-sandbox"],
    });

    // Create a new page in the browser
    const page = await browser.newPage();

    // Go to the URL specified in the credentialsToTest object
    await page.goto(credentialsToTest.url);

    // Set the viewport size
    await page.setViewport({ width: 1024, height: 768 });

    // Wait for the login form to appear
    await page.waitForSelector(".form-container.sign-in-container", {
      visible: true,
    });

    // Fill in the login form using the credentials from the credentialsToTest object
    await page.evaluate((credentialsToTest) => {
      document.getElementById("user").value = credentialsToTest.username;
      document.getElementById("pass").value = credentialsToTest.password;
      document.getElementById("botao").click();
    }, credentialsToTest);

    /**
     For now the target page is not working, so we will use the HTML content like a response to the query with the correct credentials
      TODO: when the target page is working, we will use the code below to get the HTML content applying the correct credentials on a second page
      */
    console.log("CPF to query on the second step", { cpfNumber });

    // Get the HTML content of the page after login
    const pageResultHtml = await page.content();

    // Wait for 2 seconds before taking a screenshot to ensure that the page is fully loaded and take the screenshot to be used in the report
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    // Save the .png screenshot
    await page.screenshot({
      path: `screenshots/screenshot__${Date.now()}.png`,
    });

    // Close the browser
    await browser.close();

    // Call the publisher function and send the HTML content to the queue
    await publishersFunction(pageResultHtml);

    // Index the data into ElasticSearch
    await esClient.index({
      index: "web_data",
      body: {
        html_content: pageResultHtml,
        timestamp: new Date(),
      },
    });

    // Return the first 4096 characters of the HTML content (only for testing purposes)
    return pageResultHtml.substring(0, 4096) + "...";
  } catch (err) {
    // If an error occurs, log the error message and rethrow the error
    // Also, input the error message into the event_logs index in ElasticSearch
    await esClient.index({
      index: "event_logs",
      body: {
        error: err.message,
        timestamp: new Date(),
      },
    });
    console.error("Error while crawling the web:", err);
    throw err;
  }
}

module.exports = crawlerFunction;
