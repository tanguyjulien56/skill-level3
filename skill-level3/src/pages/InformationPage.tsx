import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateForm } from "../redux/formSlice"; // Assure-toi d'importer updateForm correctement
import { RootState } from "../redux/store"; // Assure-toi que RootState est correctement importé

// Validation avec Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  birthDate: Yup.date().required("La date de naissance est requise").nullable(),
});

const InformationPage: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form); // On récupère les données du formulaire depuis Redux

  const formik = useFormik({
    initialValues: formData, // On prend les valeurs depuis Redux
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
    enableReinitialize: true, // Permet de réinitialiser les valeurs quand l'état Redux change
  });

  // Sauvegarde automatique dans Redux avec chaque modification
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateForm(formik.values)); // Met à jour l'état Redux avec les nouvelles valeurs du formulaire
    }, 500);

    return () => clearTimeout(timer); // Nettoyage du timer si les valeurs changent rapidement
  }, [formik.values, dispatch]); // Le hook se déclenche quand `formik.values` change

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Informations de l'utilisateur</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={formik.isSubmitting}
        >
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default InformationPage;
