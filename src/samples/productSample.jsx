import { Link, useParams } from "react-router-dom";
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
    <section className="Sample">

      <div className="Decription"> <h1>{current.description}</h1></div>
      <div className="Img">
        <div className="slider_base">
          {current.images?.[page] && (
            <img
              src={current.images[page]}
              className='img'
            />
          )}
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
      <div className="Price">{current.price}$</div>
      <div className="Numb">{current.count}</div>
      <div className="Name">{current.name}</div>
    </section>
  );
}

export default ProductSample;