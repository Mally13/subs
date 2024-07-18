import { useState } from "react";

const OptionalForm = ({ OptionalData }) => {
  const [formData, setFormData] = useState(
    OptionalData || {
      ComplianceCertifications: "",
      OperatingCountries: "",
      Market: "",
      SocialMediaLinks: "",
      AnnualRevenue: "",
      NumberofEmployees: "",
      Category: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Updated OptionalData");
    console.log(formData);
  };

  return (
    <div className="shadow-xl py-3">
      <form className="grid grid-cols-5 gap-y-4 py-4 px-6 bg-transparent rounded mb-2">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Compliance Certifications
          </label>
          <input
            value={formData.ComplianceCertifications}
            type="text"
            name="ComplianceCertifications"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Operating Countries
          </label>
          <input
            value={formData.OperatingCountries}
            type="text"
            name="OperatingCountries"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Market
          </label>
          <input
            value={formData.Market}
            type="text"
            name="Market"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Social Media Links
          </label>
          <textarea
            value={formData.SocialMediaLinks}
            name="SocialMediaLinks"
            className="block w-5/6 resize-none max-h-[32px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Annual Revenue
          </label>
          <input
            value={formData.AnnualRevenue}
            type="text"
            name="AnnualRevenue"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Number of Employees
          </label>
          <input
            value={formData.NumberofEmployees}
            name="NumberofEmployees"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            value={formData.Category}
            type="text"
            name="Category"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="px-6">
        <button
          type="button"
          className="bg-[#181344] rounded-full hover:bg-[#383080] block text-xs font-medium text-white border-2 border-[#F9c55d] shadow-lg cursor-pointer w-1/12 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OptionalForm;
