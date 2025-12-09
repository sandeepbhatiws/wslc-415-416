import React, { useEffect, useState } from 'react'
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductDetails() {

  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_PRODUCT}colors`)
      .then((result) => {
        if (result.data._status == true) {
          setColors(result.data._data);
        } else {
          setColors([]);
        }
      })
      .catch(() => {
        toast.error('Something went wrong !')
      })

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_PRODUCT}materials`)
      .then((result) => {
        if (result.data._status == true) {
          setMaterials(result.data._data);
        } else {
          setMaterials([]);
        }
      })
      .catch(() => {
        toast.error('Something went wrong !')
      })

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_PRODUCT}view-categories`)
      .then((result) => {
        if (result.data._status == true) {
          setParentCategories(result.data._data);
        } else {
          setParentCategories([]);
        }
      })
      .catch(() => {
        toast.error('Something went wrong !')
      })
  }, [])

  const [parentCategory, setParentCategory] = useState('');

  const getParentCategory = (event) => {
    setParentCategory(event.target.value);
    setSubCategories([]);
    setSubSubCategories([]);
  }

  useEffect(() => {
    if (parentCategory != '') {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_PRODUCT}view-sub-categories`, {
        parent_category_id: parentCategory
      })
        .then((result) => {
          if (result.data._status == true) {
            setSubCategories(result.data._data);
          } else {
            setSubCategories([]);
          }
        })
        .catch(() => {
          toast.error('Something went wrong !')
        })
    }
  }, [parentCategory])

  const [subCategory, setSubCategory] = useState('');

  const getSubCategory = (event) => {
    setSubCategory(event.target.value);
    setSubSubCategories([]);
  }

  useEffect(() => {
    if (subCategory != '') {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_PRODUCT}view-sub-sub-categories`, {
        parent_category_id: parentCategory,
        sub_category_id: subCategory
      })
        .then((result) => {
          if (result.data._status == true) {
            setSubSubCategories(result.data._data);
          } else {
            setSubSubCategories([]);
          }
        })
        .catch(() => {
          toast.error('Something went wrong !')
        })
    }
  }, [subCategory])

  const [imagePath, setImagePath] = useState('')

  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop ",
        replace: "Drag and drop ",
        remove: "Remove",
        error: "Oops, something went wrong"
      }
    });
  }, []);

  useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imagePath}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imagePath]);

  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const [updateIdState,setUpdateIdState]=useState(false)
  const [productDetails, setProductDetails] = useState('');

  useEffect(() => {
    if(params.id != '' && params.id != undefined){
      setUpdateIdState(params.id);

      axios.post(`${ import.meta.env.VITE_API_BASE_URL }/${ import.meta.env.VITE_PRODUCT }details/${params.id}`)
      .then((result) => {
          if (result.data._status == true) {
              setProductDetails(result.data._data);
              setValue(result.data._data.description)
              setParentCategory(result.data._data.parent_category_id);
              setSubCategory(result.data._data.sub_category_id);
              setImagePath(result.data._image_path+result.data._data.image)
          } else {
              setProductDetails('');
          }
      })
      .catch(() => {
          toast.error('Something went wrong !!')
      })
    }
  },[params]);

  const formHandler = (event) => {
    event.preventDefault();

    var dataSave = new FormData(event.target);
    dataSave.append('description', value);

    if(updateIdState != ''){
      //Update API
      axios.put(`${ import.meta.env.VITE_API_BASE_URL }/${ import.meta.env.VITE_PRODUCT }update/${params.id}`, dataSave)
      .then((result) => {
        if(result.data._status == true){
          event.target.reset();
          toast.success(result.data._message);
          navigate('/product/view')
        } else {
          toast.error(result.data._message);
        }
      })
      .catch(() => {
          toast.error('Something went wrong !');
      })


    } else {
      // Create API
      axios.post(`${ import.meta.env.VITE_API_BASE_URL }/${ import.meta.env.VITE_PRODUCT }create`, dataSave)
      .then((result) => {
        if(result.data._status == true){
          event.target.reset();
          toast.success(result.data._message);
          navigate('/product/view')
        } else {
          toast.error(result.data._message);
        }
      })
      .catch(() => {
          toast.error('Something went wrong !');
      })
    }
  };
  return (
    <section className="w-full">

      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateIdState ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className='w-full px-6 py-6  '>
        <form onSubmit={formHandler} autoComplete='off'>
          <div className="grid grid-cols-3 gap-[10px] ">
            {/* for left */}
            <div className="for-images ">
              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  className="dropify"
                  data-height="260"
                />
              </div>

              <div className="">
                <label
                  htmlFor="GalleryImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Gallery Image
                </label>
                <input
                  type="file"
                  name='images'
                  id="images"
                  accept="image/*"
                  className="dropify"
                  data-height="260"
                  multiple
                />
              </div>
            </div>

            {/* for midd */}
            <div className="middle">
              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Prodct Name
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.name}
                  name='name'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Prodct Name'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Code
                </label>
                <input
                  type="text"
                  name='product_code'
                  defaultValue={productDetails.product_code}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Product Code'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select
                  onChange={getSubCategory}
                  name='sub_category_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Sub Category</option>

                  {
                    subCategories.map((v, i) => {
                      return (
                        <option value={v._id} selected={ productDetails.sub_category_id == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Meterial
                </label>
                <select
                  name='material_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">

                  <option value="">Select Material</option>

                  {
                    materials.map((v, i) => {
                      return (
                        <option value={v._id} selected={ productDetails.material_id == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Featured
                </label>
                <select
                  name='is_featured'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_featured == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_featured == 2 ? 'selected' : '' }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is New Arrivals
                </label>
                <select
                  name='is_new_arrivals'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_new_arrivals == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_new_arrivals == 2 ? 'selected' : '' }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is On Sale
                </label>
                <select
                  name='is_on_sale'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_on_sale == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_on_sale == 2 ? 'selected' : '' }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.actual_price}
                  name='actual_price'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Actual Price'
                />
              </div>
            </div>

            {/* for right */}
            <div className="right-items">
              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Parent Category
                </label>
                <select
                  onChange={getParentCategory}
                  name='parent_category_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Parent Category</option>

                  {
                    parentCategories.map((v, i) => {
                      return (
                        <option value={v._id} selected={ productDetails.parent_category_id == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Sub Category
                </label>
                <select
                  name='sub_sub_category_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Sub Sub Category</option>

                  {
                    subSubCategories.map((v, i) => {
                      return (
                        <option value={v._id} selected={ productDetails.sub_sub_category_id == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select
                  name='color_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Color</option>

                  {
                    colors.map((v, i) => {
                      return (
                        <option value={v._id} selected={ productDetails.color_id == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Best Selling
                </label>
                <select
                  name='is_best_sellings'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_best_sellings == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_best_sellings == 2 ? 'selected' : '' }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Upsell
                </label>
                <select
                  name='is_up_sell'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_up_sell == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_up_sell == 2 ? 'selected' : '' }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Dimesnsion
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.dimesnsion}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Dimesnsion'
                  name='dimesnsion'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Delivery Days
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.delivery_days}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Delivery Days'
                  name='delivery_days'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.sale_price}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Sale Price'
                  name='sale_price'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.order}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Order'
                  name="order"
                />
              </div>


            </div>
          </div>

          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Short Description
            </label>
            <textarea name='short_description' className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3' defaultValue={productDetails.short_description}></textarea>

          </div>

          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Description
            </label>
            <ReactQuill theme="snow" value={value} onChange={setValue} className='h-[200px]' />

          </div>

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateIdState ? "Update Product " : "Add Product"}
          </button>

        </form>

      </div>
    </section>
  )
}

