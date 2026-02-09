
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

export class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataError";
  }
}



export const fetchProductCatalog = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      if (Math.random() < 0.8) {
        resolve([
          { id: 1, name: "Laptop", price: 1200 },
          { id: 2, name: "Headphones", price: 200 },
          { id: 3, name: "Mechanical Keyboard", price: 150 },
          { id: 4, name: "4K Monitor", price: 400 }
        ]);
      } else {
        reject(new NetworkError("Failed to fetch product catalog"));
      }
    }, 1000);
  });
};

export const fetchProductReviews = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      if (Math.random() < 0.8) {
        resolve([
          { reviewer: "Alice", rating: 5, comment: "Excellent product!" },
          { reviewer: "John", rating: 4, comment: "Very good, worth the price." },
          { reviewer: "Maria", rating: 3, comment: "It's okay, could be better." }
        ]);
      } else {
        reject(new NetworkError(`Failed to fetch reviews for product ID ${productId}`));
      }
    }, 1500);
  });
};

export const fetchSalesReport = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      if (Math.random() < 0.85) {
        const totalSales = 50000;
        const unitsSold = 320;

        if (!totalSales || !unitsSold) {
          reject(new DataError("Sales report data is incomplete"));
          return;
        }

        const averagePrice = Math.round(totalSales / unitsSold);

        resolve({
          totalSales,
          unitsSold,
          averagePrice
        });
      } else {
        reject(new NetworkError("Failed to fetch sales report"));
      }
    }, 1000);
  });
};