import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ADDUSER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

import Auth from "../../utils/auth";
import "./sign.css";

const Sign = () => {
  const [addUser] = useMutation(ADDUSER);

  const formFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  const validationSchema = Yup.object({
    username: Yup.string("Actually type something in dont be lazy").required(
      "username required"
    ),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm password is required."),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (userValues) => {
    console.log(userValues);
    const { username, email, password } = userValues;
    const { data } = await addUser({
      variables: { username, email, password },
    });
    console.log(data);
    Auth.login(data.addUser.token);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <div className="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3">
            <div className="shadow-lg form-bg rounded-lg p-8">
              <h1 className="text-center text-2xl">Sign Up</h1>

              <Form className="pt-6 pb-2 my-2">
                {formFields.map((field, index) => (
                  <div className="mb-4" key={index}>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor={field.name}
                    >
                      {field.label}
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      type={field.type}
                      id={field.name}
                      name={field.name}
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name={field.name}
                      component="p"
                    />
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-b-4 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ${
                      isValid && !isSubmitting
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Sign Up
                  </button>
                  <Link to="/">
                    <AiFillHome className="text-4xl text-blue-500" />
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Sign;
