# Node CrawlerThon 🕷 : Crawler API Documentation

## Overview

This is the documentation for the Crawler API, a Node.js application that performs web scraping using Puppeteer and stores the results in Elasticsearch. The API allows users to provide a CPF number (Brazilian identification number) as input and crawls a specific website to retrieve data related to the given CPF. The retrieved data is stored in Elasticsearch and also published to a RabbitMQ queue.

## Workflow and Diagram

The Crawler API follows a simple and straightforward workflow:

- 1. The user makes a POST request to the /query/:cpfNumber endpoint, providing a CPF number as input.
- 2. The API uses Puppeteer to perform web scraping on a specific website associated with the provided CPF number.
- 3 .The scraped data is stored in Elasticsearch for future analysis and retrieval.
- 4. Simultaneously, the API publishes the crawled data to a RabbitMQ queue using the publisher.js module.
- 5. Users can retrieve the HTML content of the page associated with the given CPF number from the API's response.

![Example Image](https://cdn-cashy-static-assets.lucidchart.com/marketing/chart/homepage/flowchart-dagram.png)

To get a more detailed visual representation of the app's workflow, you can view the diagram on LucidChart on the following link. The diagram illustrates the step-by-step process that occurs when a user interacts with the Crawler API, from the initial request to the final data storage and publication steps.

https://lucid.app/lucidchart/56f78b2c-6a00-49e7-987c-f803abd82bd8/edit?invitationId=inv_9410d1f2-89fd-4eed-ac9b-2dd370c96b7c

## Getting Started

To run the Crawler API, follow the steps below:

### Prerequisites

Before running the API, make sure you have the following installed:

- Docker (https://www.docker.com/get-started)

### Running the API

1. Clone the project repository:

```bash
git clone <repository_url>
cd crawler-api
```

2. Build the Docker image and run the container:

```bash
docker build --platform linux/amd64 -t node_crawlerthon-api:latest .
docker-compose up -d
```

### Features

#### API Endpoints

##### POST /query/:cpfNumber

This endpoint allows users to initiate a web scraping process for a specific CPF number. Replace `:cpfNumber` with the CPF number you want to query.

Example: curl -X POST http://localhost:3030/query/12345678900

##### Response

Upon a successful request, the API will perform web scraping for the provided CPF number and return the HTML content of the page associated with the CPF.

Example response:

```
{
"data": "<html><head>...</head><body>...</body></html>"
}
```

In case of any errors during the web scraping process, the API will respond with a 500 status code and an error message.

Example error response:

```
{
"error": "Error while crawling the web"
}
```

## Folder Structure

- `src`: Contains the source code for the API.
  - `app.js`: Entry point for the application.
  - `routes/routes.js`: Defines the API endpoints.
  - `services/crawler.js`: The main function that performs web scraping.
  - `services/publisher.js`: Publishes the crawled data to a RabbitMQ queue.
- `utils/credentials.mock.js`: Mocked credentials for the website login.

## Technologies Used

- Node.js
- Express.js
- Puppeteer
- Elasticsearch
- Kibana
- RabbitMQ

## Accessing resources

- API: localhost:3030
- Kibana (Elasticsearch data visualization): localhost:5601
- RabbitMQ (Admin panel): localhost:15672 (default login: user=guest / password: guest )

## Testing with Jest

Jest is a popular testing framework for JavaScript applications that provides a simple and powerful way to write tests and check for expected behavior. In the Crawler API project, we have added Jest to enable testing of the API's functionality.

### Writing Tests

Tests in Jest are organized into test files that usually have the suffix .test.js or .spec.js. We have already created a test file for the crawlerFunction in the services folder. This test file is named crawler.test.js and can be found under the ./tests directory.

To write tests for other parts of the application, create new test files following the same naming convention and place them in the appropriate folder.

### Running Tests

To run the tests, follow these steps:

Ensure that the Crawler API and its Docker container are running.

Open your terminal and navigate to the root directory of the project.

Use the following command to run all the tests:

```
docker exec -it node_crawlerthon-api-container npm test --runInBand
```

Or, into the root folder:

```
npm run test
```

The npm test command will execute Jest in the Docker container and run all the test files it finds. The --runInBand option runs the tests in a serial mode, which is useful in a containerized environment.

### Test Coverage

Jest also provides code coverage reports to help you identify areas of your code that are not covered by tests. To generate a code coverage report, use the following command:

```
docker exec -it node_crawlerthon-api-container npm test -- --coverage
```

This command will run all the tests and display a summary of code coverage. Additionally, Jest will generate a detailed code coverage report in the coverage folder. Open the index.html file in your browser to view the report.

### Continuous Integration

Jest tests are configured to run automatically when you push changes to your Git repository. Continuous Integration (CI) services like GitHub Actions or Travis CI can be used to trigger the test suite upon each push. By setting up CI, you ensure that all new changes are tested automatically, making it easier to identify and fix issues early in the development process.

With Jest integrated into the Crawler API project, writing and running tests becomes a straightforward process that helps ensure the reliability and correctness of the application. Happy testing! 🚀

# Front-end

## Overview

The front-end of this project is built using React, a popular JavaScript library for building user interfaces. The React web app is available in a separate Git repository, which you can access at link-to-your-git-repo.

## Getting Started

To run the front-end app, follow the steps below:

### Prerequisites

Before running the API, make sure you have the following installed:

- Node.js (https://nodejs.org/en)

### Running the React Web App Locally

1. Clone the project repository:

```bash
git clone <repository_url>
cd your-react-web-app-repo
npm install
```

2. Run the App

```bash
npm start
```

This will launch the React web app in your default browser, and it will be accessible at http://localhost:3000.

## Project Structure

- `public`: Contains the static assets and the index.html file, which serves as the entry point for the app.
- `src`: Contains the main source code of the React app.
  - `index.js`: The entry point of the React app, where it renders the root component.
  - `components`: Directory for reusable React components.
  - `pages`: Contains the app's main pages or views.
  - `services`: Includes services for interacting with the API or other external services.
  - `utils`: Utility functions or helper files.

Please follow the instructions above to set up and run the React web app locally and interact with the API for web scraping tasks. For more information on React development, refer to the documentation at React Official Documentation.

# Next Steps and Improvements

- Implement tests using Cypress and Jest for improved code quality and reliability.
- Introduce TypeScript for better type safety and maintainability of the codebase.
- Explore using another framework, such as Nest.js, to enhance the scalability and organization of the API.
- Create an alternative API using Python as the stack to compare performance and explore different technologies.

These improvements will further enhance the functionality and robustness of the Crawler API and provide a better user experience for web scraping tasks.
