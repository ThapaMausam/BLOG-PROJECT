import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditBlog() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: name === "image" ? e.target.files[0] : value
        })
    }

    const fetchBlogData = async () => {
        const response = await axios.get("http://localhost:3000/blog/" + id)
        setData(response.data.data)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const response = await axios.patch("http://localhost:3000/blog/" + id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        
        if (response.status === 200) {
            navigate("/blog/" + id)
        } else {
            alert("Something went wrong.")
        }
    }

    useEffect(() => {
        fetchBlogData()
    }, [])

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Edit Blog Post
                </h2>

                <form className="bg-white shadow-lg rounded-xl p-8 space-y-8" onSubmit={submitForm}>
                    {/* Title */}
                    <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Enter a catchy title"
                        onChange={handleInputChange}
                    />
                    </div>

                    {/* Subtitle */}
                    <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle
                    </label>
                    <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={data.subtitle}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Optional subtitle or tagline"
                        onChange={handleInputChange}
                    />
                    </div>

                    {/* Description */}
                    <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                        placeholder="Write your blog content here..."
                        onChange={handleInputChange}
                    />
                    </div>

                    {/* Image Upload */}
                    <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-3 file:px-6
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100
                        cursor-pointer transition"
                        onChange={handleInputChange}
                    />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition transform hover:scale-105"
                    >
                        Edit Post
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}