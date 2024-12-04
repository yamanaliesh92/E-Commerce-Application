import NoProductsFound from "@/components/noProductFound";
import ProductCard from "@/components/productCard";
import Search from "@/components/search";
import { db } from "@/lib/db";
import { Product } from "@/lib/type";

interface HomeProps {
  searchParams: Promise<{
    title?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const title = searchParams.title || "";

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
          {products.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <NoProductsFound />
      )}
    </div>
  );
}
