# Testing Strategy

Testing front-end applications is a complex topic. There are many different types of tests that can be written, and each has its own strengths and weaknesses. The key is to find the right balance between the different types of tests to ensure that the application is both well-tested and maintainable. In general, here's what I recommend :

- Unit Tests for components, hooks, utils, pages, etc. - If a component ends up navigating to another page and you want to test behavior after that navigation, I would recommend likely testing that in an integration test in the browser instead.
- Integration Tests with mocked APIs for happy path flows - Due to limitations with Mock Service Worker and server side requests, you will need to run your app while hitting the MSW server to mock server side requests. This is a limitation of SSR with MSW and will mean that you can not modify mocks while running tests in the browser.
- End-to-End Tests with real APIs for high level user flows - You can use Playwright or Cypress to test your application in a real browser environment. This is useful for testing the full user flow of your application. However, these tests can be slow and brittle so it's important to explicitly not have these baked into your PR checks. I would recommend kicking off a job in your CI/CD pipeline to run these tests after a successful build and deploy.
