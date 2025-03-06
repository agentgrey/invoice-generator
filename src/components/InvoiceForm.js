import React from "react";
import "../styles/styles.css";
import { FaPlus } from "react-icons/fa";

const InvoiceForm = ({ invoice, setInvoice, setInvoices }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInvoice = { ...invoice, [name]: parseFloat(value) || 0 };

    newInvoice.discount = (newInvoice.price * newInvoice.discountPercent) / 100;
    newInvoice.tax = ((newInvoice.price - newInvoice.discount) * newInvoice.taxPercent) / 100;
    newInvoice.total = (newInvoice.price - newInvoice.discount) + newInvoice.tax;

    setInvoice(newInvoice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoices((prev) => [...prev, { ...invoice }]);
    setInvoice({ qty: 1, price: 0, discountPercent: 0, discount: 0, taxPercent: 0, tax: 0, total: 0 });
  };

  return (
    <div className="container">
      <h2 className="title">Invoice Form</h2>
      <form onSubmit={handleSubmit} className="invoice-form">
        {["qty", "price", "discountPercent", "taxPercent"].map((field) => (
          <div className="input-group" key={field}>
            <label>{field.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
            <input type="number" name={field} value={invoice[field]} onChange={handleChange} />
          </div>
        ))}
        <div className="input-group">
          <label>DISCOUNT</label>
          <input type="number" value={invoice.discount} disabled />
        </div>
        <div className="input-group">
          <label>TAX</label>
          <input type="number" value={invoice.tax} disabled />
        </div>
        <div className="input-group">
          <label>TOTAL PRICE</label>
          <input type="number" value={invoice.total} disabled />
        </div>
        <button type="submit" className="add-btn"><FaPlus /> Add Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;