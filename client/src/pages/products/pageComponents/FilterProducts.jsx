import { useRef, useState } from "react";
import "./filterProducts.css";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import PriceFilter from "./PriceFilter";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function FilterProducts({ setProductsList, categoryId }) {
  const [showFilter, setShowFilter] = useState(false);
  const [queryParam, setQueryParam] = useSearchParams({});
  const [subCategoryId, setSubCategoryId] = useState(null)
  const formRef = useRef(null);

  const handleCategory = (e) => {
    setQueryParam((queryParam) => {
      queryParam.set("subCategory", e.target.id);
      return queryParam;
    });
    setSubCategoryId(e.target.value)
  };

  const handlePrice = (e) => {

    if (e.target.id === "min-price") {
      setQueryParam((queryParam) => {
        queryParam.set("minPrice", e.target.value);
        return queryParam;
      });

    } else {
      setQueryParam((queryParam) => {
        queryParam.set("maxPrice", e.target.value);
        return queryParam;
      });
    }
  };

  const handleSortBy = (e) => {
    setQueryParam((queryParam) => {
      queryParam.set("sort", e.target.value);
      return queryParam;
    });
  };

  const hanldeApply = async (e) => {
    e.preventDefault();
    if (!categoryId) return toast.warning("please select the main category first");

    const url = new URL(`http://localhost:5000/api/v1/product?category=${categoryId}`);
    const searchParams = new URLSearchParams(queryParam);
    if (searchParams.get("subCategory")) {
      searchParams.set("subCategory", subCategoryId)
    }
    url.search = searchParams;

    const res = await fetch(url);
    if (!res.ok) return toast.error("something went wrong , please try again");
    const data = await res.json();
    setProductsList(data.products);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    let data;

    if (!categoryId) {
        const res = await fetch(`http://localhost:5000/api/v1/product`);
        if (!res.ok) return toast.error("something went wrong , please try again");
        data = await res.json();

    } else {
        const res = await fetch(`http://localhost:5000/api/v1/product?category=${categoryId}`);
        if (!res.ok) return toast.error("something went wrong , please try again");
        data = await res.json();
    }

    if (!data) return toast.error("something went wrong , please try again");

    setProductsList(data.products);
    setQueryParam((queryParam) => {
      queryParam.delete("subCategory");
      queryParam.delete("minPrice");
      queryParam.delete("maxPrice");
      queryParam.delete("sort");
      return queryParam;
    });

    formRef.current.sort.forEach((e) => {
      e.checked = false;
    });
    formRef.current.subCategory.forEach((e) => {
      e.checked = false;
    });
    formRef.current.minPrice.value = "";
    formRef.current.maxPrice.value = "";

  }

  console.log("rerendered");

  return (
    <>
      <span
        style={{ position: "fixed" }}
        onClick={() => setShowFilter(true)}
        className="material-symbols-outlined"
      >
        tune
      </span>
      <form onReset={handleReset} onSubmit={hanldeApply} ref={formRef} className={`filter-cont ${showFilter ? "active" : ""}`}>
        <span
          onClick={() => setShowFilter(false)}
          className={`material-symbols-outlined ${showFilter ? "active" : ""}`}
        >
          close
        </span>

        <CategoryFilter categoryId={categoryId} handleCategory={handleCategory} />

        <PriceFilter handlePrice={handlePrice} />

        <SortFilter handleSortBy={handleSortBy} />

        <div className="filter-buttons">
          <button
            type="reset"
          >
            Reset
          </button>
          <button type="submit" >Apply</button>
        </div>
      </form>
    </>
  );
}

export default FilterProducts;
