import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { Badge } from "antd";
import moment from "moment";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";

import axios from "axios";
import { useParams } from "react-router-dom";
export default function ProductView() {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  //hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);
  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id,data.category._id);
    } catch (err) {
      console.log(err);
    }
  };
  const loadRelated = async(productId, categoryId) =>{
    try{
        const {data} = await axios.get(`/related-products/${productId}/${categoryId}`);
        setRelated(data);
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.sold} sold`} color="red">
              <Badge.Ribbon
                text={`${
                  product?.quantity - product?.sold >= 1
                    ? `${product?.quantity - product?.sold} In Stock`
                    : "Out of Stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>

              <p className="card-text lead">{product?.description}</p>
            </div>
            <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign /> Price:{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "symbol",
                  })}
                </p>
                <p>
                  <FaProjectDiagram />
                  Category:{product?.category?.name}
                </p>
                <p>
                  <FaRegClock /> Added:{moment(product.createdAt).fromNow()}
                </p>
                <p>
                  {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                  {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p>
                  <FaWarehouse /> Available :{product?.quantity - product?.sold}
                </p>
                <p>
                  <FaRocket /> Sold: {product.sold}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <h2>Related Products</h2>
          {related.length <1 && <p>Nothing Found</p>}
          {related?.map((p) =>(
            <ProductCard p= {p} key = {p._id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
