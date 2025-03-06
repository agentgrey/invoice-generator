import React, { useState } from "react";
import "./styles/styles.css";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTable from "./components/InvoiceTable";

const InvoiceApp = () => {
  const [invoice, setInvoice] = useState({ qty: 1, price: 0, discountPercent: 0, discount: 0, taxPercent: 0, tax: 0, total: 0 });
  const [invoices, setInvoices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div className="app-container">
      <nav className="navbar">Invoice Generator</nav>
      <InvoiceForm invoice={invoice} setInvoice={setInvoice} setInvoices={setInvoices} />
      <InvoiceTable invoices={invoices} setInvoices={setInvoices} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
    </div>
  );
};

export default InvoiceApp;