// PopupForm.js
import React, { useState, useEffect } from "react";
import { useMap } from "../../contexts/mapContext";

function PopupForm({ onSave, onCancel }) {
  const { selectedLocation } = useMap();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    // selectedLocation değiştiğinde formu güncelle
    if (selectedLocation) {
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [selectedLocation]);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, location: selectedLocation });
  };

  return (
    <div className="absolute bottom-10 left-3 bg-slate-500 p-4 rounded-md opacity-90" id="form-container">
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-white">Title:</span>
          <input type="text" name="title" value={formData.title} onChange={handleFormInput} className="p-2 border border-white rounded-md" />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Description:</span>
          <textarea name="description" value={formData.description} onChange={handleFormInput} className="p-2 border border-white rounded-md resize-none"></textarea>
        </label>
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">Save</button>
          <button type="button" onClick={onCancel} className="ml-2 bg-red-500 text-white p-2 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupForm;
