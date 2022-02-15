import "./SortByPrice.css";

const SortByPrice = ({ sortByPrice, setSortByPrice }) => {
  const handleSortByPriceChange = () => {
    if (sortByPrice === "price-asc") {
      // default value
      setSortByPrice("price-desc");
    } else {
      setSortByPrice("price-asc");
    }
  };
  return (
    <div className="sort-by-price">
      <span>Trier par prix</span>
      <label className="switch-asc-desc">
        <input type="checkbox" onChange={handleSortByPriceChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default SortByPrice;
