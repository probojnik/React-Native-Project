import _ from 'lodash'

const testProductBody = {
SellerID: "48725a6b-8a2c-0ea9-c85f-d823a35fe28a",
ProductName: "1111222",
Description: "This fantastic toy is the one your child needs!",
Condition: "Gently Loved",
Availability: true,
Price: 15.00,
OriginalUrl: "http://amazon.com/productdetailhere",
OriginalDescription: "This is where the brilliant text from the original site would be.",
OriginalPrice: 30.00,
OriginalImages: [
     {
       URL: "http://amazon.com/productimagehere.jpg",
       Caption: "blah, blah, blah",
      Primary: true
     },
     {
       URL: "http://amazon.com/productimagehere.jpg",
       Caption: "blah, blah, blah",
       Primary: false
     }],
   ProductAgeRange: [
     "Infant",
     "Toddler"],
   ProductTags: [
    "Girl",
    "Boy",
    "Pretend Play"]
}

export default class Client {
  constructor(token) {
    this.host = 'http://localhost'
    this.port = 3700 //8081
    this.method = 'POST'
    this.headers = {
      "cache-control": "no-cache",
        // 'Authorization': `bearer ${token}`
    }
  }

  checkStatus(response) {
    // console.log('checkStatus', response.status);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  parseJSON(response, type) {
    console.log('parseJSON', response, type)
    if(type && type.includes('json')) return response.json()
    else return response
  }
  request({endpoint, method = this.method, acceptType = 'application/json', body}, func) {
    const url = this.host + ':' + this.port + '/' + endpoint
    let property = {
        method: method,
        headers: this.headers,
        redirect: 'error',
        // mode: 'cors',
        cache: 'default'
      }
    if(body !== undefined) {
      if(typeof(body) === "object") {
        property.body = JSON.stringify(body)
      } else {
        property.body = body
      }
      property.headers['Content-Length'] = property.body.length.toString()
      property.headers['Content-Type'] = 'application/json'
    }
    property.headers['Accept'] = acceptType

    const reqT = {url: url, method: property.method, headers: property.headers, data: property.body, params: null}
    console.log('request', reqT, acceptType);

    fetch(url, property)
    .then(this.checkStatus)
    .then(res => this.parseJSON(res, acceptType))
    .then(func)
    .catch(e => console.warn('my request', e))
  }

  createProduct(json = testProductBody, callback){
    // http://localhost:3700/create-product
    this.request({endpoint:'create-product', body: json, acceptType: 'text/plain'}, (result) => {
      console.log('createProduct', result)
      if(result.ok) {
        callback(result)
      } else {
        console.warn('createProduct', result)
      }
    })
  }

  deleteProduct(id){
    // http://localhost:3700/delete-product?id={id}

  }

  fetchProduct(id){
    // http://localhost:3700/fetch-product?id={id}

  }

// http://localhost:3700/fetch-all-products
  fetchProducts(){
    this.request({endpoint: 'fetch-all-products', method: 'GET'}, (result) => {
      // console.log('fetchProducts', result)

    })
  }

  updateProduct(id){
    // http://localhost:3700/update-product?id={id}

  }

  fetchAmazonProducts(param: string, callback: (x: string) => void){
    // http://localhost:3700/get-amazon-products
    this.request(
      {endpoint:'get-amazon-products', body: {term: param}},
      (result) => {
        console.log('fetchAmazonProducts', result)
        callback(result)
      }
    )
  }

}
