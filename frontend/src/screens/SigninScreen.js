import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <img
        alt="gorra"
        className="gorraNa"
        src="https://3.bp.blogspot.com/-P8atDeiKSyU/TuvlBOuwIRI/AAAAAAAAAZY/aAoHltXuIKQ/s200/navidad-gorro.png"
        width="100"
        height="100"
      />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="titulo">Iniciar sesión</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">
            {" "}
            <strong>Correo </strong>{" "}
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            {" "}
            <strong>Contraseña</strong>{" "}
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label />

          <button className="primary" type="submit">
            Iniciar sesión
          </button>
        </div>
        <div>
          <label />
          <div>
            Eres un nuevo cliente?{" "}
            <Link to={`/register?redirect=${redirect}`}>Create una cuenta</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
