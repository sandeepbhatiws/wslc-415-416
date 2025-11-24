import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import { toast } from "react-toastify";

export default function AddColor() {

  const [updateIdState,setUpdateIdState]=useState(false)
  const [colorDetails, setColorDetails]=useState('')
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if(params.id != '' && params.id != undefined){
      setUpdateIdState(true)

      axios.post(`${ import.meta.env.VITE_API_BASE_URL }/${ import.meta.env.VITE_COLOR }details/${params.id}`)
      .then((result) => {
          if (result.data._status == true) {
              setColorDetails(result.data._data);
          } else {
              setColorDetails('');
          }
      })
      .catch(() => {
          toast.error('Something went wrong !!')
      })

    } else {
      setUpdateIdState(false)
    }
  },[params]);

  const formHandler = (event) => {
    event.preventDefault();

    const data = event.target

    if(params.id != '' && params.id != undefined){
      // Update Record
      axios.put(`${ import.meta.env.VITE_API_BASE_URL }/${ import.meta.env.VITE_COLOR }update/${params.id}`, formToJSON(event.target))
      .then((result) => {
        if(result.data._status == true){
          event.target.reset();
          toast.success(result.data._message);
          navigate('/color/view')
        } else {
          toast.error(result.data._message);
        }
      })
      .catch(() => {
          toast.error('Something went wrong !');
      })

    } else {
      // Create Record
      axios.post(`${ import.meta.env.VITE_API_BASE_URL }/${ import.meta.env.VITE_COLOR }create`, formToJSON(event.target))
      .then((result) => {
        if(result.data._status == true){
          event.target.reset();
          toast.success(result.data._message);
          navigate('/color/view')
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
      <Breadcrumb path={"Color"} path2= {updateIdState ? "Update" : "Add"}  slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Color" : "Add Color"}  
          </h3>
          <form onSubmit={ formHandler } autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            
              <div className="">
                <div className="mb-5">
                  <label
                    htmlFor="Name"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Color Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="name"
                    defaultValue={ colorDetails.name }
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Color Name"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="Code"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Color Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    defaultValue={ colorDetails.code }
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Color Code"
                  />
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
                    id="order"
                    defaultValue={colorDetails.order}
                    name="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                </div>
              </div>
           
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
             {updateIdState ? "Update Color" : "Add Color"}  
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
