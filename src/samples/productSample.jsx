import { useParams } from "react-router-dom";
import './sample.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productsSlice";
import ReactPaginate from "react-paginate";

function ProductSample() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { product, status, error } = useSelector((state) => state.product);
  const { id } = useParams();
  const numericId = parseInt(id, 10);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  const current = Array.isArray(product) ? product[numericId - 1] : undefined;

  if (!current) return <div>Товар не найден</div>;
  if (status === "loading") return <div>Загрузка....</div>;
  if (status === "failed") return <div>Ошибка {error}</div>;

  const PageChange = ({ selected }) => setPage(selected);

  return (
    <section className="Sample container">

      <div className="Decription">
        <h1>{current.description}</h1>
        <button className="decriptionBtn">Купить</button>
      </div>
      <div className="Img">

        <h2 className="prodName"> {current.title}</h2>
        <div className="slider_base">
          <div className="PIC">

            {current.images?.[page] && (
              <img
                src={current.images[page]}
                className='img'
                alt={`Упс... Тут было фото ${current.title}`}
              />
            )}
          </div>
          <ReactPaginate
            previousLabel={<button className="Back">Back</button>}
            nextLabel={<button className="Next">Next</button>}
            pageCount={current.images.length}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            onPageChange={PageChange}
            containerClassName={"pagination1"}
            activeClassName={"active"}
            forcePage={page}
          />
        </div>
      </div>
      <div className="Info">
        <h2>Info about product</h2>
        <ul className="prodInfo">
          <li>
            Price:{current.price}$
          </li>
          <li>
            Dicount:{current.discountPercentage}%
          </li>
          <li>Category:{
            current.category
          }</li>
          <li>Stock number:{current.stock}</li>
        </ul>

      </div>

    </section>
  );
}

export default ProductSample;