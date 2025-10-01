import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'
import axios from 'axios'
import ProductCard from './ProductCard'
import ResponsivePagination from 'react-responsive-pagination';

const sortOptions = [
    { name: 'Name (A-Z)', value: '1', current: false },
    { name: 'Name (Z-A)', value: '2', current: false },
    { name: 'Price: Low to High', value: '3', current: false },
    { name: 'Price: High to Low', value: '4', current: false },
    { name: 'Discounted Price: Low to High', value: '5', current: false },
    { name: 'Discounted Price: High to Low', value: '6', current: false },
    { name: 'Rating: Low to High', value: '7', current: false },
    { name: 'Rating: High to Low', value: '8', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

const priceValues = [
    { from : 0, to: 250, name : 'Rs.0 - Rs.250' },
    { from : 251, to: 500, name : 'Rs.251 - Rs.500' },
    { from : 501, to: 750, name : 'Rs.501 - Rs.750' },
    { from : 751, to: 1000, name : 'Rs.751 - Rs.1000' },
    { from : 1001, to: 2000, name : 'Rs.1001 - Rs.2000' },
    { from : 2001, to: 5000, name : 'Rs.2001 - Rs.5000' },
    { from : 5001, to: 10000, name : 'Rs.5001 - Rs.10000' },
    { from : 10001, to: 2000000000, name : 'Rs.10001 and Above' }
]

const discountedValues = [
    { from : 1, to: 10, name : '0% - 10%' },
    { from : 11, to: 20, name : '11% - 20%' },
    { from : 21, to: 30, name : '21% - 30%' },
    { from : 31, to: 40, name : '31% - 40%' },
    { from : 41, to: 50, name : '41% - 50%' },
    { from : 51, to: 60, name : '51% - 60%' },
    { from : 61, to: 70, name : '61% - 70%' },
    { from : 71, to: 80, name : '71% - 80%' },
    { from : 81, to: 90, name : '81% - 90%' },
    { from : 91, to: 100, name : '91% - 100%' }
]

const ratingValues = [
    { value : 1, name : '1 Star and Above' },
    { value : 2, name : '2 Star and Above' },
    { value : 3, name : '3 Star and Above' },
    { value : 4, name : '4 Star and Above' },
    { value : 5, name : '5 Star' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductListing() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(24);
    const [sorting, setSorting] = useState('');
    const [name, setName] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [discountFrom, setDiscountFrom] = useState('');
    const [discountTo, setDiscountTo] = useState('');
    const [rating, setRating] = useState('');
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
            .then((result) => {
                setCategories(result.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/brands.php')
            .then((result) => {
                setBrands(result.data.data);
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {
                page: currentPage,
                limit: limit,
                sorting: sorting,
                name: name,
                price_from: priceFrom,
                price_to: priceTo,
                discount_from: discountFrom,
                discount_to: discountTo,
                rating: rating,
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
    }, [currentPage,totalPages,limit,sorting, name, priceFrom, priceTo, discountFrom, discountTo, rating, filterCategories, filterBrands]);

    const filterSorting = (sort) => {
        setSorting(sort)
        setCurrentPage(1)
    }

    const filterCategory = (slug) => {
        setCurrentPage(1)
        if (filterCategories.includes(slug)) {
            const data = filterCategories.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            setFilterCategories(data)
        } else {
            const data = [...filterCategories, slug];
            setFilterCategories(data)
        }
    }

    const filterBrand = (slug) => {
        setCurrentPage(1)
        if (filterBrands.includes(slug)) {
            const data = filterBrands.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            setFilterBrands(data)
        } else {
            const data = [...filterBrands, slug];
            setFilterBrands(data)
        }
    }


    const priceFilter = (from, to) => {
        setPriceFrom(from)
        setPriceTo(to)
        setCurrentPage(1)
    }

    const discountedFilter = (from, to) => {
        setDiscountFrom(from)
        setDiscountTo(to)
        setCurrentPage(1)
    }

    const ratingFilter = (rate) => {
        setRating(rate);
    }

    return (
        <>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                        {subCategories.map((category) => (
                                            <li key={category.name}>
                                                <a href={category.href} className="block px-2 py-3">
                                                    {category.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex gap-3">
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        defaultValue={option.value}
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        type="checkbox"
                                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-checked:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <MenuItem key={option.name}>
                                                    <a
                                                        onClick={ () => filterSorting(option.value) }
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>

                                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon aria-hidden="true" className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon aria-hidden="true" className="size-5" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pt-6 pb-24">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">

                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Categories</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {categories.map((option, optionIdx) => (
                                                    <div key={option.slug} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    onClick={() => filterCategory(option.slug)}
                                                                    id={`filter-${option.slug}`}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-checked:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label htmlFor={`filter-${option.slug}`} className="text-sm text-gray-600">
                                                            {option.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>

                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Brands</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {brands.map((option, optionIdx) => (
                                                    option.name != ''
                                                        ?
                                                        <div key={option.slug} className="flex gap-3">
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        onClick={() => filterBrand(option.slug)}
                                                                        id={`filter-${option.slug}`}
                                                                        type="checkbox"
                                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-checked:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <label htmlFor={`filter-${option.slug}`} className="text-sm text-gray-600">
                                                                {option.name}
                                                            </label>
                                                        </div>
                                                        :
                                                        ''
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>

                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Price Filter</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {priceValues.map((option, optionIdx) => (
                                                    <div key={optionIdx} class="flex items-center gap-x-3">
                                                        <input onClick={ () => priceFilter(option.from,option.to) } id={option.from} type="radio" name="price-filter" class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                        <label for={option.from} class="block text-sm/6 font-medium text-gray-900">{option.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>

                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Discounted Filter</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {discountedValues.map((option, optionIdx) => (
                                                    <div key={optionIdx} class="flex items-center gap-x-3">
                                                        <input onClick={ () => discountedFilter(option.from,option.to) } id={option.from} type="radio" name="discount-filter" class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                        <label for={option.from} class="block text-sm/6 font-medium text-gray-900">{option.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>

                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Rating Filter</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {ratingValues.map((option, optionIdx) => (
                                                    <div key={optionIdx} class="flex items-center gap-x-3">
                                                        <input onClick={ () => ratingFilter(option.value) } id={option.value} type="radio" name="rating-filter" class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                        <label for={option.value} class="block text-sm/6 font-medium text-gray-900">{option.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3">


                                    {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
                                    <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                                            
                                            {
                                                products.map((item, index) => {
                                                    return(
                                                        <ProductCard key={index} item={item} />
                                                    )
                                                })
                                            }
                                        

                                    </section>

                                    <ResponsivePagination
                                        current={currentPage}
                                        total={totalPages}
                                        onPageChange={setCurrentPage}
                                        />

                                    {/* <!-- 🛑 Grid Section - Ends Here --> */}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}
