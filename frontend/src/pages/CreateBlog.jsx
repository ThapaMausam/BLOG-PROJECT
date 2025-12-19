import { useState } from "react";
import NavBar from "../components/NavBar";

export default function CreateBlog() {
    
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Create New Blog Post
                </h2>

                <form className="bg-white shadow-lg rounded-xl p-8 space-y-8">
                    {/* Title */}
                    <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Optional subtitle or tagline"
                        onChange={handleInputChange}
                    />
                    </div>

                    {/* Description */}
                    <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={8}
                        required
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
                    />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition transform hover:scale-105"
                    >
                        Create Post
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}