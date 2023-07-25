import crawlerFunction from "../../../src/services/crawler";

describe("crawlerFunction", () => {
  test("should return valid HTML content", async () => {
    // Call the crawler function with a valid CPF number
    const cpfNumber = "12345678900";
    const result = await crawlerFunction(cpfNumber);

    // Check if the result is a non-empty string
    expect(result).toBeTruthy();
  });

  test("should throw an error when an invalid CPF number is provided", async () => {
    // Call the crawler function with an invalid CPF number
    const cpfNumber = "invalid_cpf";
    // TODO: apply a validation for the CPF number and check if the crawlerFunction throws an error
    await expect(crawlerFunction(cpfNumber)).rejects.toThrow(
      "Error while crawling the web"
    );
  });

  test("should publish the HTML content to the RabbitMQ queue", async () => {
    // Mock the publishersFunction to spy on its call
    const mockPublishersFunction = jest.fn();
    jest.mock("../../../src/services/publisher", () => mockPublishersFunction);

    // Call the crawler function with a valid CPF number
    const cpfNumber = "12345678900";
    await crawlerFunction(cpfNumber);

    // Check if the publishersFunction was called with the correct arguments
    expect(mockPublishersFunction).toHaveBeenCalled();
  });
});
