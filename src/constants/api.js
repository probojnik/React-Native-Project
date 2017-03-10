export default {
  hostname: 'http://localhost', // 

  endpoints: new Map([
    ['products', 'products'], // focus, age, http://localhost:4567/#get-all-products-or-a-filtered-product-list-using-query-parameters
    ['curatedProducts', 'products/customer'], // customerID, childID, page, per_page http://localhost:4567/#get-curated-list-of-products-for-all-or-one-of-the-buyer-kids
    ['createProduct', 'create-product'], //
    ['updateProduct', 'update-product'], //
    ['createBuyer', 'create-buyer'], //
    ['updateBuyer', 'update-buyer'], //

    ['amazonProducts', 'get-amazon-products'], // From Ira
  ]),

  // Which 'endpoint' key deals with our tokens?
  tokenKey: 'login',
}
