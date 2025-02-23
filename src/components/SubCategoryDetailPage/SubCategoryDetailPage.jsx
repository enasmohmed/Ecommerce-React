import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

async function getSubCategoryDetails(subCategoryId) {
  const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`);
  return response.data;
}

export default function SubCategoryDetailPage() {
  const { subcategoryId } = useParams(); 

  const { data, isLoading, error } = useQuery({
    queryKey: ["subCategoryDetail", subcategoryId],
    queryFn: () => getSubCategoryDetails(subcategoryId),
  });

  if (isLoading) return <p className="text-center text-green-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {data?.data?.name}
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        {data?.data?.image && (
          <img src={data?.data?.image} alt={data?.data?.name} className="w-full h-60 object-cover rounded-md mb-4 mx-auto" />
        )}
        <p className="text-lg text-gray-500 mt-2">
          <span className="text-green-600 font-semibold">Category: {data?.data?.category}</span>
        </p>
      </div>
    </div>
  );
}
