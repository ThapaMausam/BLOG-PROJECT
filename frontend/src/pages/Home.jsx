import { useEffect, useState } from "react"
import Card from "../components/Card"
import NavBar from "../components/NavBar"
import axios from "axios"

function Home() {

    const [data, setData] = useState([]);

    const fetchBlogs = async () => {
        const result = await axios.get("http://192.168.1.70:3000/blog");
        setData(result.data.data); // JSON is always stored in result.data
    }

    console.log(data);
    
    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <>
            <NavBar />

            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Optional: Section Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
                    <p className="text-gray-600">Discover our latest articles and insights</p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map((blog) => (
                    <Card blog={blog} />
                    ))}
                </div>

                {/* Optional: Empty State */}
                {data.length === 0 && (
                    <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No blog posts available yet.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home