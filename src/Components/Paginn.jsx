import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/Main.css";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/productsSlice";

function PaginatedItems() {
  const [page, setPage] = useState(0);
  
  const [selectedCategory, setSelectedCategory] = useState("any");
  const [selectedName, setSelectedName] = useState("any");
  const [selectedPriceRange, setSelectedPriceRange] = useState("any");
  const [stockInput, setStockInput] = useState("");
  
  const [names, setNames] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const step = 12;

  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);

  const priceRanges = [
    { label: "0.99-25.99", min: 0.99, max: 25.99 },
    { label: "25.99-50.99", min: 25.99, max: 50.99 },
    { label: "50.99-100.99", min: 50.99, max: 100.99 },
    { label: ">100.99", min: 100.99, max: Infinity }
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log(product);

    const uniqueTitles = [...new Set(product.map(prod => prod.title))];
    const uniqueCategories = [...new Set(product.map(prod => prod.category))];
    
    console.log(uniqueTitles);

    setCategory(uniqueCategories);
    setNames(uniqueTitles);
  }, [product]);


  useEffect(() => {
    let filtered = product;
    if (selectedCategory != "any") {
      filtered = filtered.filter((item) => item.category == selectedCategory);
    }
    if (selectedName != "any") {
      filtered = filtered.filter((item) => item.title == selectedName);
    }
    if (selectedPriceRange != "any") {
      const range = priceRanges.find(r => r.label == selectedPriceRange);
      if (range) {
        filtered = filtered.filter((item) => 
          item.price >= range.min && (range.max == Infinity ? true : item.price <= range.max)
        );
      }
    }

  if (stockInput != "") {
      const stockValue = parseFloat(stockInput);
      if (!isNaN(stockValue)) {
        filtered = filtered.filter((item) => 
          item.stock >= stockValue
        );
      }
    }

    setFilteredProducts(filtered);
    setPage(0); 
  }, [selectedCategory, selectedName, selectedPriceRange, stockInput, product]);

  useEffect(() => {
    const offset = page * step;
    setCurrentItems(filteredProducts.slice(offset, offset + step));
  }, [page, filteredProducts]);

  const pageMoving = (e) => {
    setPage(e.selected);
  };


  const resetFilters = () => {
    setSelectedCategory("any");
    setSelectedName("any");
    setSelectedPriceRange("any");
    setStockInput("");
  };

  if (status === "loading") {
    return <div>Загрузка....</div>;
  }

  if (status === "failed") {
    return <div>Ошибка {error}</div>;
  }

  const pageCount = Math.ceil(filteredProducts.length / step);

  return (
    <div className="container main">
      <header className="selections">
        <section className='select'>
          <label>Категория:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className='categories'
          >
            <option value="any">Все категории</option>
            {category.map((categ, index) => (
              <option key={index} value={categ}>
                {categ}
              </option>
            ))}
          </select>
        </section>

        <section className='select'>
          <label>Название:</label>
          <select 
            value={selectedName} 
            onChange={(e) => setSelectedName(e.target.value)} 
            className='categories'
          >
            <option value="any">Все продукты</option>
            {names.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </section>

        <section className='select'>
          <label>Диапазон цен:</label>
          <select 
            value={selectedPriceRange} 
            onChange={(e) => setSelectedPriceRange(e.target.value)} 
            className='categories'
          >
            <option value="any">Все цены</option>
            {priceRanges.map((range, index) => (
              <option key={index} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </section>

        <section className='select'>
          <label>Минимальное количество на складе:</label>
          <input
            type="number"
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            placeholder="Введите минимальное количество"
            className='categories stock'
            min="0"
            step="1"
          />
        </section>

        <button className='categories' onClick={resetFilters}>Сброс фильтров</button>
      </header>

      <ul className="Ul">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Link key={item.id} className="link" to={`/detail/${item.id}`}>
              <p>{item.title}</p>
              <img src={item.thumbnail} alt={item.title} />
            </Link>
          ))
        ) : (
          <p>Увы нихера нету, гуляй вася</p>
        )}
      </ul>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Назад"}
          nextLabel={"Вперед →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={pageMoving}
          containerClassName={"pagination"}
          activeClassName={"active"}
          forcePage={page}
        />
      )}
    </div>
  );
}

export default PaginatedItems;