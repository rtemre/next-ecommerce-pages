import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";
import { useMemo } from "react";
import { useRouter } from "next/router";

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("/api/products", fetcher);
  const router = useRouter();
  const { q, sort, show, type, size, color, priceMin, priceMax } = router.query as Record<string, string>;

  const processed = useMemo(() => {
    if (!data) return [] as ProductTypeList[];
    let items: ProductTypeList[] = data.slice();

    // search
    if (q) {
      const term = q.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(term));
    }

    // price range
    const min = priceMin ? parseFloat(priceMin) : undefined;
    const max = priceMax ? parseFloat(priceMax) : undefined;
    if (min !== undefined) items = items.filter((p) => p.currentPrice >= min);
    if (max !== undefined) items = items.filter((p) => p.currentPrice <= max);

    // future-proof: type/size/color (ignored if missing on item)
    const types = type ? type.split(",") : [];
    if (types.length) items = items.filter((p: any) => (p.category ? types.includes(p.category) : true));

    const sizes = size ? size.split(",") : [];
    if (sizes.length) items = items.filter((p: any) => (p.sizes ? p.sizes.some((s: string) => sizes.includes(s)) : true));

    if (color) items = items.filter((p: any) => (p.colors ? p.colors.includes(color) : true));

    // sorting
    switch (sort) {
      case "price-asc":
        items.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "price-desc":
        items.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case "name-asc":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    const limit = show ? parseInt(show, 10) : undefined;
    if (limit && limit > 0) items = items.slice(0, limit);

    return items;
  }, [data, q, sort, show, type, size, color, priceMin, priceMax]);

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {processed.map((item: ProductTypeList) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
