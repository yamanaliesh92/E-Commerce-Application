import NoProductsFound from "@/components/noProductFound";
import ProductCard from "@/components/product-card";
import { db } from "@/lib/db";

export default async function HomePage({ params }: { params: { id: number } }) {
  const userId = Number(params.id);

  const [products, count] = await db.$transaction([
    db.product.findMany({ where: { userId } }),
    db.product.count({ where: { userId } }),
  ]);

  return (
    <div className="dark:bg-black bg-white container mx-auto h-[100vh]  flex flex-col gap-[12px]">
      <h1 className="text-2xl text-gray-600 dark:text-white font-bold">
        All ({count})
      </h1>
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