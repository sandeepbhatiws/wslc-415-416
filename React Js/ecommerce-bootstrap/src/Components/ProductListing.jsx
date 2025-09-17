import Header from './Header'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ProductListing() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);

    const [brands, setBrands] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);

    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [sorting, setSorting] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=12&categories=furniture,home-decoration')

        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {
                page: currentPage,
                limit: 24,
                sorting: sorting,
                price_from: priceFrom,
                price_to: priceTo,
                categories: filterCategories.toString(),
                brands: filterBrands.toString(),
            }
        })
            .then((result) => {
                setProducts(result.data.data);
                setTotalPages(result.data.total_pages);
            })
            .catch(() => {
                toast.error('Something went wrong !', {

                });
            })
    }, [filterCategories, filterBrands, priceFrom, sorting, currentPage, totalPages]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
            .then((result) => {
                setCategories(result.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    const filterCategory = (slug) => {

        if (filterCategories.includes(slug)) {
            const data = filterCategories.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            setFilterCategories(data)
            console.log(data);
        } else {
            const data = [...filterCategories, slug];

            setFilterCategories(data)
            console.log(data);
        }


    }

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/brands.php')
            .then((result) => {
                setBrands(result.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    const filterBrand = (slug) => {

        if (filterBrands.includes(slug)) {
            const data = filterBrands.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            setFilterBrands(data)
            console.log(data);
        } else {
            const data = [...filterBrands, slug];

            setFilterBrands(data)
            console.log(data);
        }


    }

    const priceFilter = (from, to) => {
        setPriceFrom(from)
        setPriceTo(to)
    }

    const filterSorting = (sort) => {
        setSorting(sort)
    }

    return (
        <>

            <div class="overlay d-none"></div>
            <div class="search-section">
                <div class="container-fluid container-xl">
                    <div class="row main-content ml-md-0">
                        <div class="sidebar col-md-3 px-0">
                            <h1 class="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                                <span class="mr-2 filter-close-btn">
                                    X
                                </span>
                                Filters
                                <span class="ml-auto text-uppercase">Reset Filters</span>
                            </h1>
                            <div class="sidebar__inner ">
                                <div class="filter-body">
                                    <div>
                                        <h2 class="border-bottom filter-title">All Categories</h2>
                                        <div class="mb-30 filter-options">
                                            {
                                                categories.map((v, i) => {
                                                    return (
                                                        <div class="custom-control custom-checkbox mb-3" key={i} >
                                                            <input type="checkbox" class="custom-control-input me-2" onClick={() => filterCategory(v.slug)} id={v.id} />
                                                            <label class="custom-control-label" for={v.id}>{v.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/* <!--seating option end--> */}
                                        <h2 class="border-bottom filter-title">All Brands</h2>
                                        <div class="mb-30 filter-options">
                                            {
                                                brands.map((v, i) => {
                                                    return (
                                                        <div class="custom-control custom-checkbox mb-3" key={i} >
                                                            <input type="checkbox" class="custom-control-input me-2" onClick={() => filterBrand(v.slug)} id={v.slug} />
                                                            <label class="custom-control-label" for={v.slug}>{v.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        {/* <!-- cusine filters end --> */}
                                        {/* <h2 class="font-xbold body-font border-bottom filter-title">Price Range</h2>
                                        <div class="mb-3 theme-clr xs2-font d-flex justify-content-between">
                                            <span id="slider-range-value1">$100</span>
                                            <span id="slider-range-value2">$10,000</span>
                                        </div>
                                        <div class="mb-30 filter-options">
                                            <div>
                                                <div id="slider-range">
                                                    <form>
                                                        <div class="form-group">
                                                            <input type="range" class="form-control-range" id="" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div> */}
                                        <h2 class="border-bottom filter-title">Price Filter</h2>
                                        <div class="mb-3 filter-options" id="services-options">
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input me-2" onClick={() => priceFilter(0, 250)} id="Breakfast" />
                                                <label class="custom-control-label" for="Breakfast">Rs.0 - Rs.250</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input me-2" onClick={() => priceFilter(251, 500)} id="Lunch" />
                                                <label class="custom-control-label" for="Lunch">Rs.251 - Rs.500</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input me-2" onClick={() => priceFilter(551, 750)} id="Donner" />
                                                <label class="custom-control-label" for="Donner">Rs.551 - Rs.750</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input me-2" onClick={() => priceFilter(751, 1000)} id="Cafe" />
                                                <label class="custom-control-label" for="Cafe">Rs.751 - Rs.1000</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input me-2" onClick={() => priceFilter(1000, '')} id="Brunch" />
                                                <label class="custom-control-label" for="Brunch">Rs.1000 and Above</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content col-md-9">
                            <div class="d-flex justify-content-between border-bottom align-items-center">
                                <h2 class="title">Products</h2>
                                <div class="filters-actions">
                                    <div>
                                        <button class="btn filter-btn d-md-none"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                                            Filter</button>
                                    </div>
                                    <div class="d-flex align-items-center">

                                        <div class="dropdown position-relative sort-drop">
                                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Sorting By -
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><button class="dropdown-item" type="button" onClick={() => filterSorting(1)} >ASC by Name (A-Z)</button></li>
                                                <li><button class="dropdown-item" type="button" onClick={() => filterSorting(2)}>DESC by Name (Z-A)</button></li>
                                                <li><button class="dropdown-item" type="button" onClick={() => filterSorting(3)}>ASC by Price (Low to High)</button></li>
                                                <li><button class="dropdown-item" type="button" onClick={() => filterSorting(4)}>DESC by Price (High to Low)</button></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="row row-grid row-gap-3 mb-4">
                                {
                                    products.map((items, index) => {
                                        return (
                                            <ProductCard key={index} items={items} type="2" />
                                        )
                                    })
                                }
                            </div>

                            <ResponsivePagination
                                current={currentPage}
                                total={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
