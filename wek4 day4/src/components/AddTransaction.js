import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);
  const formik = useFormik({
    initialValues: {
      text: "",
      amount: "" ,
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .required("Text is required")
        .min(5, "Text must be at least 5 characters")
        .max(10, "Text must be at most 10 characters")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Text can only contain alphabetical characters"
        ),

        amount: Yup.string().test(
          'is-valid-amount',
          'contains only 2 digits after point',
  (value) => {
    if (!value || value.trim() === '') {
      
      return new Yup.ValidationError('Amount is required', null, 'amount'); // Return false if the value is empty or null
    }
    if (value.includes('0')) {
      return new Yup.ValidationError('Amount cannot be zero', null, 'amount');
    }
    if (!/^\d+(\.\d+)?$/.test(value)) {
      return new Yup.ValidationError('Amount should contain only numbers', null, 'amount');
    }
    return /^-?\d+(\.\d{1,2})?$/.test(value);
  }
)
        
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      let text = values.text;
      let amount = values.amount;
      console.log(text, amount);

      console.log(values.amount);
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
      };
      addTransaction(newTransaction);
      resetForm({
        text: "",
        amount: "",
      });
    },
  });

  // const onSubmit = e => {
  //   e.preventDefault();

  //   const newTransaction = {
  //     id: Math.floor(Math.random() * 100000000),
  //     text,
  //     amount: +amount
  //   }

  //   addTransaction(newTransaction);
  // }

  return (
    <>
      <p className="font-bold text-white">Add new transaction</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="text" className="font-bold text-white">
            Text
          </label>
          <input
            type="text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`rounded-md px-3 py-2 outline-none ${
              formik.touched.text && formik.errors.text ? 'outline-red-500' : ''
            }`}
            placeholder="Enter text..."
          />
          {formik.touched.text && formik.errors.text ? (
            <div className=" text-xs pt-[0.3rem]" style={{color:"red"}}>
              {formik.errors.text}
            </div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="amount" className="text-white">
            <span className="font-bold">Amount</span> <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="text"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`rounded-md px-3 py-2 outline-none ${
              formik.touched.amount && formik.errors.amount ? 'outline-red-500' : ''
            }`}
            placeholder="Enter amount..."
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className=" text-xs  pt-[0.3rem]" style={{color:"red"}}>
              {formik.errors.amount}
            </div>
          ) : null}
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
