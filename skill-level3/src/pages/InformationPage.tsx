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
    initialValues: userState,
    validationSchema: validationSchema,
    onSubmit: () => {
      setIsModalOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    enableReinitialize: true,
  });

  // Sauvegarde automatique dans Redux à chaque modification du formulaire
  useEffect(() => {
    // Quand les valeurs du formulaire changent, on met à jour Redux
    dispatch(updateUser(formik.values));
  }, [formik.values, dispatch]);

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
    </div>
  );
};

export default InformationPage;
