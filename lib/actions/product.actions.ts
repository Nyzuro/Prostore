import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject, formatNumberWithDecimal } from "../utils";

// Get latest products
export async function getLatestProducts() {
	const data = await prisma.product.findMany({
		take: LATEST_PRODUCTS_LIMIT,
		orderBy: { createdAt: "desc" },
	});

	return data.map((product) => ({
		...convertToPlainObject(product),
		price: formatNumberWithDecimal(Number(product.price)),
		rating: formatNumberWithDecimal(Number(product.rating)),
	}));
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
	const product = await prisma.product.findFirst({
		where: { slug: slug },
	});

	if (!product) return null;

	return {
		...convertToPlainObject(product),
		price: formatNumberWithDecimal(Number(product.price)),
		rating: formatNumberWithDecimal(Number(product.rating)),
	};
}
