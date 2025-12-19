// We should use useParams hook for the path that is dynamic such as /blog/:id only

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from 'lucide-react';

export default function SinglePageBlog() {

    const data = useParams(); // Returns object
    const navigate = useNavigate();

    const [blog, setBlog] = useState({})

    const fetchSingleBlog = async () => {
        const response = await axios.get(`http://192.168.1.70:3000/blog/${data.id}`)
        setBlog(response.data.data)
    }

    console.log(blog);

    const deleteBlog = async () => {
      await axios.delete(`http://192.168.1.70:3000/blog/${data.id}`)
      alert("Deleted Successfully.")
      navigate('/')
    }

    useEffect(() => {
        fetchSingleBlog();
    }, [])
    return (
    <>
      <NavBar />
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            {blog.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 font-light border-l-4 border-blue-500 pl-4 py-1">
            {blog.subtitle}
          </h2>
          <div className="mt-8 pt-6 border-t border-gray-200">
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-linear-to-r from-blue-50 to-gray-100 aspect-video flex items-center justify-center">
            <img 
              src={`http://192.168.1.70:3000/${blog.image}`}
              alt="Image" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Content Section */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
            <div className="text-gray-700 leading-relaxed text-lg space-y-6">
              <p>
                {blog.description}
              </p>
            </div>
          </div>
        </article>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-end">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Pencil size={20} />
            <span className="font-medium">Edit</span>
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer" onClick={deleteBlog}
          >
            <Trash2 size={20} />
            <span className="font-medium">Delete</span>
          </button>
        </div>
      </main>
      </div>
    </>
    )
}