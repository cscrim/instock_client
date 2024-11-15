import React from "react";
import "./WarehouseFormReusable.scss";

function WarehouseFormReusable({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form className="warehouse-form__reusable" onSubmit={handleSubmit}>
      {/* Warehouse Details Section */}

      <section className="edit-warehouse__container">
        <section className="edit-warehouse__detail">
          <h3 className="edit-warehouse__subheader">Warehouse Details</h3>
          <div className="edit-warehouse__field">
            <label>Warehouse Name</label>
            <input
              type="text"
              name="warehouse_name"
              value={formData.warehouse_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-warehouse__field">
            <label>Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-warehouse__field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-warehouse__field">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Contact Details Section */}
        <section className="edit-warehouse__section">
          <h3 className="edit-warehouse__subheader">Contact Details</h3>
          <div className="edit-warehouse__field">
            <label>Contact Name</label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-warehouse__field">
            <label>Position</label>
            <input
              type="text"
              name="contact_position"
              value={formData.contact_position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-warehouse__field">
            <label>Phone Number</label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-warehouse__field">
            <label>Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              required
            />
          </div>
        </section>
      </section>

      {/* Form Buttons */}
      <div className="edit-warehouse__buttons">
        <button
          type="button"
          className="edit-warehouse__cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="edit-warehouse__save">
          Save
        </button>
      </div>
    </form>
  );
}

export default WarehouseFormReusable;
