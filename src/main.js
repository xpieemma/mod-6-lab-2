// main.js
import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  NetworkError
} from "./apiSimulator.js";

import { retryPromise } from "./retryPromise.js";

async function runDashboardSync() {
  try {
    console.log("Starting API calls...\n");

    // Fetch Catalog
    // We wait for this first because we need the product IDs
    const products = await retryPromise(() => fetchProductCatalog(), 3, 1000);
    console.log("Product Catalog Loaded:", products);

    // we have ids... Create an array of promises for fetching reviews
    const reviewTasks = products.map(async (product) => {
      try {
        const reviews = await retryPromise(() => fetchProductReviews(product.id), 3, 1000);
        console.log(`Reviews for ${product.name}:`, reviews.length);
        return reviews;
      } catch (err) {
        // Handle individual review failures 
        if (err instanceof NetworkError) {
          console.error(`Network issue for ${product.name}:`, err.message);
        } else {
          console.error(`Error for ${product.name}:`, err);
        }
        return []; // Return empty array on failure
      }
    });

    // Start the sales report fetch simultaneously with review fetching
    const salesTask = retryPromise(fetchSalesReport, 3, 1000);

    // Wait for all simultaneous tasks to complete
    const results = await Promise.all([...reviewTasks, salesTask]);
    
    // The sales report is the last item in the results array
    const salesReport = results[results.length - 1];
    
    console.log("Sales Report:", salesReport);

  } catch (err) {
    // if Catalog completely fails after 3 retries ... ref line 39
    console.error("Critical Failure in Dashboard Sync:", err);
  } finally {
    console.log("\nAll API calls attempted (with retries).");
  }
}

runDashboardSync();