
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/Main.css";
import categories from "../data/data";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/productsSlice";

function PaginatedItems() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState("any");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const step = 12;

  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const filtered = selected == "any" ? product : product.filter((item) => item.category == selected);
    setFilteredProducts(filtered);
  }, [selected, product]);

  useEffect(() => {
    const offset = page * step;
    setCurrentItems(filteredProducts.slice(offset, offset + step));
  }, [page, filteredProducts]);

  const pageMoving = (e) => {
    setPage(e.selected);
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
      <section className='select'>
        <label>Категория:</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className='categories'>
          <option value="any" ><span>Все категории</span></option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

      </section>

      <ul className="Ul">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Link key={item.id} className="link" to={`/detail/${item.id}`}>
              <p>{item.title}</p>
              <img src={item.thumbnail} alt={item.title} width={100} />
            </Link>
          ))
        ) : (
          <p>Увы нихера нету, гуляй вася</p>
        )}
      </ul>
      {pageCount >= 1 && (
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