import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  createReview,
  detailsProduct,
  recommendedProducts,
} from "../actions/productActions";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import useAlgoliaInsights from "../hooks/useAlgoliaInsights.js";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { sendProductView } = useAlgoliaInsights();

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const productRecommendedList = useSelector(
    (state) => state.productRecommendedList
  );
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Reseña hecha con éxito");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  useEffect(() => {
    if (productId) sendProductView(productId);
  }, []);

  useEffect(() => {
    dispatch(
      recommendedProducts({
        productId: productId,
        times: 5,
      })
    );
    //console.log(productRecommendedList)
  }, [productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Por favor ingrese una reseña o puntuación");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Volver a resultados</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Precio : S/{product.price}</li>
                <li>
                  Descripción:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Vendedor{" "}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    />
                  </li>
                  <li>
                    <div className="row">
                      <div>Precio</div>
                      <div className="price">S/{product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Estado</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">En Stock</span>
                        ) : (
                          <span className="danger">Agotado</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Cantidad</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Agregar a carrito
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reseñas</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Este producto no tiene reseñas</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" " />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Escribe una reseña personalizada</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Calificación</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Seleccione...</option>
                        <option value="1">1- Pobre</option>
                        <option value="2">2- Justo</option>
                        <option value="3">3- Bueno</option>
                        <option value="4">4- Muy bueno</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comentario</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Enviar
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox />}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Por favor <Link to="/signin">inicie sesión</Link> para
                    escribir una reseña
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
          <h2 id="recommended">Productos recomendados</h2>
          {productRecommendedList.products ? (
            <div className="row center">
              {productRecommendedList.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
