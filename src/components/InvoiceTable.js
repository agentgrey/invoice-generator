import React, { useState } from "react";
import "../styles/styles.css";
import { FaEdit, FaSave } from "react-icons/fa";

const InvoiceTable = ({ invoices, setInvoices, editingIndex, setEditingIndex }) => {
  const [errors, setErrors] = useState({});

  const handleEdit = (index) => {
    setEditingIndex(index);
    setErrors({});
  };

  const handleSave = () => {
    if (Object.keys(errors).length === 0) {
      setEditingIndex(null);
    }
  };

  const validateField = (field, value) => {
    if (value < 0) {
      return `${field} cannot be negative`;
    }
    if (field === "qty" && value === 0) {
      return "Quantity must be at least 1";
    }
    return "";
  };

  const handleChange = (index, field, value) => {
    const updatedInvoices = [...invoices];
    const numValue = parseFloat(value) || 0;

    const errorMsg = validateField(field, numValue);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));

    if (!errorMsg) {
      updatedInvoices[index][field] = numValue;
      updatedInvoices[index].discount = (updatedInvoices[index].price * updatedInvoices[index].discountPercent) / 100;
      updatedInvoices[index].tax = ((updatedInvoices[index].price - updatedInvoices[index].discount) * updatedInvoices[index].taxPercent) / 100;
      updatedInvoices[index].total = (updatedInvoices[index].price - updatedInvoices[index].discount) + updatedInvoices[index].tax;

      setInvoices(updatedInvoices);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Invoice List</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            {["Qty", "Price", "Discount %", "Discount", "Tax %", "Tax", "Total", "Actions"].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, index) => (
            <tr key={index}>
              {["qty", "price", "discountPercent", "discount", "taxPercent", "tax", "total"].map((field) => (
                <td key={field}>
                  {editingIndex === index ? (
                    <>
                      <input
                        value={inv[field]}
                        onChange={(e) => handleChange(index, field, e.target.value)}
                        className="edit-input"
                      />
                      {errors[field] && <span className="error-text">{errors[field]}</span>}
                    </>
                  ) : (
                    inv[field]
                  )}
                </td>
              ))}
              <td>
                {editingIndex === index ? (
                  <button className="edit-btn" onClick={handleSave} disabled={Object.keys(errors).length > 0}>
                    <FaSave /> Save
                  </button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    <FaEdit /> Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
