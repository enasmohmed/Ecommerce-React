import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";




export default function AllSubCategories() {

    async function getAllSubCategories() {
    
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/subcategories");    
        return response.data; 
    }


    let { data, isLoading, error } = useQuery({
        queryKey: ["allSubCategories"],
        queryFn: getAllSubCategories,
    });


    // useEffect(() => {
    //     console.log("SubCategories Data:", data);
    // }, [data]);

    if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return <>
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
                All SubCategories
            </h2>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.data.map((subcategory) => (
                <li
                    key={subcategory._id}
                    className="relative bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                    <Link to={`/subcategory/${subcategory._id}`} className="w-full h-full flex flex-col items-center">
                        <h3 className="text-lg font-medium truncate w-full text-center">{subcategory.name}</h3>
                    </Link>
                    
                </li>
                ))}
            </ul>
        </div>
    </>
}
