import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddSubSubCategory() {

  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_SUB_SUB_CATEGORY}view-categories`)
      .then((result) => {
        setCategories(result.data._data);
      })
      .catch(() => {
        toast.error('Something went wrong !')
      })
  }, [])

  useEffect(() => {
    if(parentCategory){
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_SUB_SUB_CATEGORY}view-sub-categories`, {
        parent_category_id: parentCategory
      })
        .then((result) => {
          setSubCategories(result.data._data);
        })
        .catch(() => {
          toast.error('Something went wrong !')
        })
    } else {
      setSubCategories([]);
    }
    
  }, [parentCategory])

  const changeCategory = (event) => {
    setParentCategory(event.target.value) 
  }




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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

  };
  // update work
  const [updateIdState, setUpdateIdState] = useState(false)
  let updateId = useParams().id
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    }
    else {
      setUpdateIdState(true)
    }
  }, [updateId])

  return (
    <section className="w-full">
      <Breadcrumb path={"Sub Category"} path2={"Add Sub Category"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("categoryImage", { required: "Category image is required" })}
                  id="categoryImage"
                  className="dropify"
                  data-height="260"
                />
                {errors.categoryImage && <p className="text-red-500">{errors.categoryImage.message}</p>}
              </div>

              <div className="w-2/3">

                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    onClick={ changeCategory  }
                    name="parentCatSelectBox"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {
                      categories.map((item, index) => {
                        return (
                          <option key={index} value={item._id}> {item.name} </option>
                        )
                      })
                    }
                  </select>
                </div>
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Sub Category Name
                  </label>
                  <select
                    name="parentCatSelectBox"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {
                      subCategories.map((item, index) => {
                        return (
                          <option key={index} value={item._id}> {item.name} </option>
                        )
                      })
                    }
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    {...register("categoryName", { required: "Category name is required" })}
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                  {errors.categoryName && <p className="text-red-500">{errors.categoryName.message}</p>}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    {...register("order", { required: "Order is required" })}
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                  {errors.order && <p className="text-red-500">{errors.order.message}</p>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
