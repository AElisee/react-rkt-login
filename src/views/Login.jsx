import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/auth.slice.js";

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // validate form
  const validateForm = (fields) => {
    const { email, password } = fields;

    if (!password || !email) {
      return {
        isValid: false,
        message: "Veuillez renseigner tous les champs !",
      };
    }

    return { isValid: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = { password, email };
    const validation = validateForm(fields);

    if (!validation.isValid) {
      setError(true);
      setErrorMessage(validation.message);

      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }

    const credentials = {
      email,
      password,
    };

    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error || "Erreur lors de la connexion");
        console.error("Erreur lors de la connexion :", error);
      });
  };
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h3 className="mb-5 text-3xl font-bold text-indigo-900">Coonexion</h3>
      <form
        onSubmit={(e) => handleSubmit(e)}
        action=""
        className="w-[40%] border rounded-md p-5  flex flex-col gap-3"
      >
        <div className="w-full flex flex-col gap-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            className="p-2 w-full rounded-md outline-slate-400 border bg-slate-50 border-slate-300"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="p-2 w-full rounded-md outline-slate-400 border bg-slate-50 border-slate-300"
          />
        </div>

        <div className="w-full flex justify-center">
          <input
            type="submit"
            value="Se connecter"
            className="p-3 w-1/2 min-w-[250px] rounded-lg cursor-pointer bg-indigo-900 text-white font-bold"
          />
        </div>
        {error ? (
          <p className="text-red-400 text-center">{errorMessage}</p>
        ) : (
          <p className="text-center">
            Vous n'avez de compte ?{" "}
            <Link to={"/register"} className="text-red-900 font-semibold">
              Inscrivez-vous !{" "}
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
