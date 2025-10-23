import axios from 'axios'

let getCategories = () => {
    return axios.get('https://wscubetech.co/ecommerce-api/categories.php')
    .then((result) => {
        return result.data.data
    })
}

let brands = () => {
    return axios.get('https://wscubetech.co/ecommerce-api/brands.php')
    .then((result) => {
        return result.data.data
    })
}

let products = () => {
    
}

export { getCategories, brands, products }