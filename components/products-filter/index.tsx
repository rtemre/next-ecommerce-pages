import { useState } from "react";
import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";
import Slider from "rc-slider";
import { useRouter } from "next/router";

// data
import productsTypes from "./../../utils/data/products-types";
import productsColors from "./../../utils/data/products-colors";
import productsSizes from "./../../utils/data/products-sizes";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();

  const addQueryParams = (updated: Record<string, any>) => {
    const nextQuery: any = { ...router.query, ...updated };
    Object.keys(nextQuery).forEach((k) => {
      if (nextQuery[k] === undefined || nextQuery[k] === "") delete nextQuery[k];
    });
    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
  };

  const onTypeChange = (label: string, checked: boolean) => {
    const current = (router.query.type as string) || "";
    const set = new Set(current ? current.split(",") : []);
    if (checked) set.add(label); else set.delete(label);
    const value = Array.from(set).join(",");
    addQueryParams({ type: value || undefined });
  };

  const onSizeChange = (label: string, checked: boolean) => {
    const current = (router.query.size as string) || "";
    const set = new Set(current ? current.split(",") : []);
    if (checked) set.add(label); else set.delete(label);
    const value = Array.from(set).join(",");
    addQueryParams({ size: value || undefined });
  };

  const onColorChange = (value: string) => {
    addQueryParams({ color: value });
  };

  const onPriceChange = (values: number[]) => {
    const [min, max] = values;
    addQueryParams({ priceMin: String(min), priceMax: String(max) });
  };

  return (
    <form className="products-filter">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${filtersOpen ? "products-filter__menu-btn--active" : ""}`}
      >
        Add Filter <i className="icon-down-open"></i>
      </button>

      <div
        className={`products-filter__wrapper ${filtersOpen ? "products-filter__wrapper--open" : ""}`}
      >
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            {productsTypes.map((type) => (
              <Checkbox key={type.id} name="product-type" label={type.name} onChange={(e?: any) => onTypeChange(type.name, e?.target?.checked)} />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              min={0}
              max={200}
              defaultValue={[0, 200]}
              tipFormatter={(value) => `$${value}`}
              onAfterChange={onPriceChange}
            />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {productsSizes.map((type) => (
              <Checkbox
                type="square"
                key={type.id}
                name="product-size"
                label={type.label}
                onChange={(e?: any) => onSizeChange(type.label, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Color</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              {productsColors.map((type) => (
                <CheckboxColor
                  key={type.id}
                  valueName={type.color}
                  name="product-color"
                  color={type.color}
                  onChange={onColorChange}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFiltersOpen(false)}
          className="btn btn-submit btn--rounded btn--yellow"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;
