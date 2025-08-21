import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const SearchBar = ({ searchText, setSearchText, inStockOnly, setInStockOnly, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  return (
    <form>
      {}
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />

      {}
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        Only show products in stock
      </label>
      <br />

      {}
      <label>
        Min price:
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Max price:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>
    </form>
  );
};

const ProductTable = ({ products, searchText, inStockOnly, minPrice, maxPrice }) => {
  const categories = [...new Set(products.map((p) => p.category))];

  const filterProducts = (category) => {
    return products
      .filter((p) => p.category === category)
      .filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
      .filter((p) => !inStockOnly || p.stocked)
      .filter((p) => {
        const priceNum = Number(p.price.replace("$", ""));
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        return priceNum >= min && priceNum <= max;
      })
      .map((product) => (
        <tr key={product.name}>
          <td style={{ color: product.stocked ? "black" : "red" }}>
            {product.name}
          </td>
          <td>{product.price}</td>
        </tr>
      ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => [
          <tr key={cat + "-header"}>
            <th colSpan="2">{cat}</th>
          </tr>,
          ...filterProducts(cat)
        ])}
      </tbody>
    </table>
  );
};

function FilterableProductTable({ products }) {
  const [searchText, setSearchText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <ProductTable
        products={products}
        searchText={searchText}
        inStockOnly={inStockOnly}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "Meat", price: "$10", stocked: true, name: "Chicken" },
  { category: "Meat", price: "$15", stocked: false, name: "Beef" },
  { category: "Drinks", price: "$2", stocked: true, name: "Cola" },
  { category: "Drinks", price: "$3", stocked: true, name: "Juice" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}