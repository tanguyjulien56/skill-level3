import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../components/Modal";
import { RootState } from "../redux/store";
import { updateUser } from "../redux/userSlice";

// Validation du formulaire avec Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Le prénom doit contenir au moins 2 lettres")
    .required("Le prénom est requis"),
  lastName: Yup.string()
    .min(2, "Le nom doit contenir au moins 2 lettres")
    .required("Le nom est requis"),
  birthDate: Yup.date()
    .max(new Date(), "La date de naissance ne peut pas être dans le futur")
    .required("La date de naissance est requise"),
});

const InformationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer les données du user depuis Redux
  const userState = useSelector((state: RootState) => state.user);

  // Initialisation de Formik avec les valeurs du store Redux
  const formik = useFormik({
    initialValues: userState, // Les valeurs initiales viennent du store Redux
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      setIsModalOpen(true); // Ouvrir la modal après la soumission
      setTimeout(() => {
        navigate("/"); // Redirection vers la page d'accueil
      }, 2000);
    },
    enableReinitialize: true, // Permet de réinitialiser les valeurs si elles changent dans Redux
  });

  // Sauvegarde automatique dans Redux à chaque modification du formulaire
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateUser(formik.values)); // Met à jour le store Redux
    }, 500);

    return () => clearTimeout(timer); // Annule le timer lors du changement rapide de valeurs
  }, [formik.values, dispatch]); // Le hook se déclenche quand les valeurs de Formik changent

  // Afficher les données de Redux pour vérification
  useEffect(() => {}, [userState]);

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Informations de l'utilisateur</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Champ Prénom */}
        <div className="form-control">
          <label htmlFor="firstName" className="label">
            Prénom:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.errors.firstName && (
            <div className="text-red-500 text-sm">
              {formik.errors.firstName}
            </div>
          )}
        </div>

        {/* Champ Nom */}
        <div className="form-control">
          <label htmlFor="lastName" className="label">
            Nom:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>

        {/* Champ Date de naissance */}
        <div className="form-control">
          <label htmlFor="birthDate" className="label">
            Date de naissance:
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formik.values.birthDate || ""}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          {formik.errors.birthDate && (
            <div className="text-red-500 text-sm">
              {formik.errors.birthDate}
            </div>
          )}
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={formik.isSubmitting}
        >
          Enregistrer
        </button>
      </form>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={
          <>
            <p>Utilisateur enregistré avec succès.</p>
            <p>Redirection vers la page d'accueil !</p>
          </>
        }
      />

      {/* Affichage des données dans Redux */}
      <div className="card p-4 mt-4 ">
        <h2>Valeurs enregistrées dans Redux :</h2>
        <pre>{JSON.stringify(userState, null, 2)}</pre>
      </div>
    </div>
  );
};

export default InformationPage;
