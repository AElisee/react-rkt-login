import { useState } from "react";
import { register } from "../redux/user.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [nom, setNom] = useState();
  const [prenoms, setPrenoms] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCpassword] = useState();
  const [contact, setContact] = useState();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, errorMsg } = useSelector((state) => state.users);

  // validate form
  const validateForm = (fields) => {
    const { nom, email, prenoms, password, cPassword, contact } = fields;

    if (!nom || !email || !prenoms || !password || !cPassword || !contact) {
      return {
        isValid: false,
        message: "Veuillez renseigner tous les champs !",
      };
    }

    if (password !== cPassword) {
      return {
        isValid: false,
        message: "Les mots de passe ne correspondent pas !",
      };
    }

    return { isValid: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = { nom, email, prenoms, password, cPassword, contact };
    const validation = validateForm(fields);

    if (!validation.isValid) {
      setError(true);
      setErrorMessage(validation.message);

      // Désactiver l'erreur après 5 secondes
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }

    const userData = {
      name: nom,
      prenoms,
      email,
      contacts: contact,
      password,
    };

    // Dispatch l'action Redux
    dispatch(register(userData))
      .unwrap() // Déstructure la réponse ou capture les erreurs
      .then(() => {
        navigate("/login"); // Redirige vers la page d'accueil
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
      });
  };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h3 className="mb-5 text-3xl font-bold text-indigo-900">Inscription</h3>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="w-[60%] border rounded-md p-5  flex flex-col gap-3"
      >
        <div className="w-full flex gap-3">
          <input
            type="text"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            className="p-2 w-1/2 rounded-md outline-slate-400 border bg-slate-50 border-slate-300"
          />
          <input
            type="text"
            name="Prénoms"
            value={prenoms}
            onChange={(e) => setPrenoms(e.target.value)}
            placeholder="Prénoms"
            className="p-2 w-1/2 rounded-md outline-slate-400 border bg-slate-50 border-slate-300 "
          />
        </div>
        <div className="w-full flex gap-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            className="p-2 w-1/2 rounded-md outline-slate-400 border bg-slate-50 border-slate-300"
          />
          <input
            type="text"
            name="contact"
            placeholder="N° téléphone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="p-2 w-1/2 rounded-md outline-slate-400 border bg-slate-50 border-slate-300 "
          />
        </div>
        <div className="w-full flex gap-3">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe (8 caractères)"
            className="p-2 w-1/2 rounded-md outline-slate-400 border bg-slate-50 border-slate-300"
          />
          <input
            type="password"
            name="password"
            value={cPassword}
            onChange={(e) => setCpassword(e.target.value)}
            placeholder="Confirmer mot de passe (8 caractères)"
            className="p-2 w-1/2 rounded-md outline-slate-400 border bg-slate-50 border-slate-300 "
          />
        </div>
        <div className="w-full flex justify-center">
          <input
            // disabled={`${isLoading}`}
            type="submit"
            disabled={isLoading}
            value={`${isLoading ? "Enregistrement..." : "Soumettre"}`}
            className="p-3 w-1/2 min-w-[250px] rounded-lg cursor-pointer bg-indigo-900 text-white font-bold"
          />
        </div>
        {error && (
          <div>
            <p className="text-red-300 text-center">{errorMessage}</p>
          </div>
        )}
        {isError && (
          <div>
            <p className="text-red-300 text-center">{errorMsg}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
