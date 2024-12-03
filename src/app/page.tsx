import NoProductsFound from "@/components/noProductFound";
import ProductCard from "@/components/product-card";
import Search from "@/components/search";
import { db } from "@/lib/db";

interface HomeProps {
  searchParams: {
    title?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const title = (await searchParams.title) || "";

  const products = await db.product.findMany({
    where: title
      ? {
          name: {
            contains: title,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="dark:bg-black bg-white container mx-auto flex flex-col gap-[12px]">
      <Search />
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <NoProductsFound />
      )}
    </div>
  );
}
