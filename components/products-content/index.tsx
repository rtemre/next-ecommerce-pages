import { useEffect, useMemo, useState } from "react";
import List from "./list";
import { useRouter } from "next/router";

const ProductsContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState<string>(typeof router.query.q === "string" ? router.query.q : "");
  const [sort, setSort] = useState<string>(typeof router.query.sort === "string" ? router.query.sort : "popular");
  const [show, setShow] = useState<number>(
    typeof router.query.show === "string" ? parseInt(router.query.show, 10) || 12 : 12
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextQuery: any = { ...router.query };
      if (search) nextQuery.q = search; else delete nextQuery.q;
      if (sort && sort !== "popular") nextQuery.sort = sort; else delete nextQuery.sort;
      if (show !== 12) nextQuery.show = String(show); else delete nextQuery.show;
      router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, sort, show, router]);

  const showOptions = useMemo(() => [12, 24, 36], []);

  const clearSearch = () => setSearch("");

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>
          Men&apos;s Tops
        </h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters"></i>
        </button>
        <form
          className={`products-content__filter ${orderProductsOpen ? "products-order-open" : ""}`}
        >
          <div className="products__filter__select">
            <h4>Search: </h4>
            <div className="select-wrapper select-wrapper--search">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
              {search && (
                <button type="button" className="clear-input-btn" onClick={clearSearch} aria-label="Clear search">
                  <i className="icon-cancel"></i>
                </button>
              )}
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select value={show} onChange={(e) => setShow(parseInt(e.target.value, 10))}>
                {showOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List />
    </section>
  );
};

export default ProductsContent;
