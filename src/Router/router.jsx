import { Routes, Route } from "react-router";
import PaginatedItems from "../Components/Paginn";
import ProductSample from "../samples/productSample";




const Router_Father = () => {

  return (
    <Routes>
      <Route path="/" element={<PaginatedItems/>} />

      <Route path="/detail?/:id" element={<ProductSample/>} />
    </Routes>
  );
};

export default Router_Father;
