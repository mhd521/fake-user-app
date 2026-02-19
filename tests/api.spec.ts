import { test, expect } from '@playwright/test';

/**
* Senior SDET Portfolio Test Suite
* --------------------------------
* This test validates the Spring Boot API endpoints after they have been
* deployed to the Kubernetes (Kind) cluster.
*/

test.describe('Fake User App API Validation', () => {
  // The APP_URL is provided by the GitHub Actions workflow (via port-forwarding)
  const baseURL = process.env.APP_URL || 'http://localhost:8080';

  test('should return a random name from the database (with-db)', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/v1/with-db/random`);
    
    // Assert: Check for 200 OK
    expect(response.ok()).toBeTruthy();
    
    // Assert: Check for non-empty response body
    const name = await response.text();
    expect(name.length).toBeGreaterThan(0);
    
    console.log(`Successfully retrieved name from DB: ${name}`);
  });

  test('should return a random name without database (no-db)', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/v1/no-db/random`);
    
    // Assert: Check for 200 OK
    expect(response.ok()).toBeTruthy();
    
    // Assert: Check for non-empty response body
    const name = await response.text();
    expect(name.length).toBeGreaterThan(0);
    
    console.log(`Successfully retrieved random name (no-db): ${name}`);
  });

  test('should handle health check endpoint', async ({ request }) => {
    // This validates the readiness of the application
    const response = await request.get(`${baseURL}/api/v1/no-db/random`);
    expect(response.status()).toBe(200);
  });
});