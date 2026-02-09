// retryPromise.js

export const retryPromise = async (fn, retries, delay) => {
  try {
    return await fn();
  } catch (error) {
    // Stop retrying if we hit the limit
    if (retries <= 1) {
      throw error instanceof Error ? error : new Error(String(error));
    }

    console.warn(`Retrying... attempts left: ${retries - 1}`);
    
    // Wait for the delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Recursive call
    return retryPromise(fn, retries - 1, delay);
  }
};