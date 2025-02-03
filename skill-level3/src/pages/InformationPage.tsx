import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

// Validation avec Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  birthDate: Yup.date().required("La date de naissance est requise").nullable(),
});

// Composant pour un champ de formulaire avec validation
const InputField: React.FC<{
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, type, placeholder, value, onChange }) => (
  <div className="form-control">
    <label htmlFor={id} className="label">
      {placeholder}:
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={`Entrez votre ${placeholder.toLowerCase()}`}
      onChange={onChange}
      className="input input-bordered w-full"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

const InformationPage: React.FC = () => {
  // État local pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  // Mise à jour des données du formulaire en temps réel
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Informations de l'utilisateur</h1>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values); // Logique de soumission du formulaire
        }}
      >
        <Form className="space-y-4">
          {/* Utilisation du composant InputField pour chaque champ */}
          <InputField
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <InputField
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <InputField
            id="birthDate"
            name="birthDate"
            type="date"
            placeholder="Date de naissance"
            value={formData.birthDate}
            onChange={handleInputChange}
          />

          {/* Bouton de soumission */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Soumettre
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default InformationPage;
