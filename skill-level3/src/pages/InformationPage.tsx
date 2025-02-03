
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

// Validation avec Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  birthDate: Yup.date().required("La date de naissance est requise").nullable(),
});

const InformationPage: React.FC = () => {
  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Informations de l'utilisateur</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          birthDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="space-y-4">
          <div className="form-control">
            <label htmlFor="firstName" className="label">
              Prénom:
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Entrez votre prénom"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label htmlFor="lastName" className="label">
              Nom:
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Entrez votre nom"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label htmlFor="birthDate" className="label">
              Date de naissance:
            </label>
            <Field
              type="date"
              id="birthDate"
              name="birthDate"
              className="input input-bordered w-full"
            />
            <ErrorMessage
              name="birthDate"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Soumettre
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default InformationPage;
