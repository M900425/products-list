import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const SearchBar = ({ searchText, setSearchText, inStockOnly, setInStockOnly }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
};

const ProductTable = ({ products, searchText, inStockOnly }) => {
  const renderFruits = () =>
    products
      .filter(p => p.category === 'Fruits')
      .filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
      .filter(p => !inStockOnly || p.stocked) // ховаємо червоні, якщо чекбокс включено
      .map(product => (
        <tr key={product.name}>
          <td style={{ color: product.stocked ? 'black' : 'red' }}>{product.name}</td>
          <td>{product.price}</td>
        </tr>
      ));

  const renderVegetables = () =>
    products
      .filter(p => p.category === 'Vegetables')
      .filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
      .filter(p => !inStockOnly || p.stocked)
      .map(product => (
        <tr key={product.name}>
          <td style={{ color: product.stocked ? 'black' : 'red' }}>{product.name}</td>
          <td>{product.price}</td>
        </tr>
      ));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan="2">Fruits</th>
        </tr>
        {renderFruits()}
        <tr>
          <th colSpan="2">Vegetables</th>
        </tr>
        {renderVegetables()}
      </tbody>
    </table>
  );
};

function FilterableProductTable({ products }) {
  const [searchText, setSearchText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable
        products={products}
        searchText={searchText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}