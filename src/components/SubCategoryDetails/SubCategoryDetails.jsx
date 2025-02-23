import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


export default function SubCategoryDetails() {
    let { categoryId } = useParams(); 

    async function getSpecificSubCategory(categoryId) {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    return response.data;
    }

    let { data, isLoading, error } = useQuery({
    queryKey: ["subCategory", categoryId],
    queryFn: () => getSpecificSubCategory(categoryId),
    });

    if (isLoading) return <p className="text-center text-green-500 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">Error: {error.message}</p>;

    return (
    <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All SubCategories for this Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.map((subCategory) => (
            <Link to={`/subcategory/${subCategory._id}`} key={subCategory._id}>
                <div key={subCategory._id} className="bg-white shadow-lg rounded-lg p-6 text-center">
                    
                    <h3 className="text-lg font-semibold text-gray-800">{subCategory.name}</h3>
                </div>
            </Link>
            ))}
        </div>
    </div>
    );
}
