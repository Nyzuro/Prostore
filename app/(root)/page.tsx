import ProductList from "@/components/shared/product/product";
import sampleData from "@/db/sample-data";

const Homepage = () => {
	return (
		<>
			<ProductList data={sampleData.products} title="Newest arrivals" limit={4} />
		</>
	);
};

export default Homepage;
