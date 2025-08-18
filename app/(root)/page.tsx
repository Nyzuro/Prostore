import ProductList from "@/components/shared/product/product";
import { getLatestProducts } from "@/lib/actions/product.action";

const Homepage = async () => {
	const latestProducts = await getLatestProducts();

	return (
		<>
			<ProductList data={latestProducts} title="Newest arrivals" />
		</>
	);
};

export default Homepage;
