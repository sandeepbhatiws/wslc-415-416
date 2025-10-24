import axios from 'axios'

let getCategories = () => {
    console.log(process.env);
    return axios.get(`${ process.env.API_URL }/categories.php`)
    .then((result) => {
        return result.data.data
    })
}

let brands = () => {
    return axios.get(`${ process.env.API_URL }/brands.php`)
    .then((result) => {
        return result.data.data
    })
}

let products = () => {
    
}

export { getCategories, brands, products }