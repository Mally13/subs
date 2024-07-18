import { useState } from "react";
import "./styles.css";

const CompanyForm = ({ companyData }) => {
  const [formData, setFormData] = useState(
    companyData || {
      CompanyName: "",
      Address: "",
      POBox: "",
      WebsiteURL: "",
      YeaEstablished: "",
      BusinessDescription: "",
      LegalEntityType: "",
      LicensingAuthority: "",
      SubsidiaryCode: "",
      Logo: null,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated companyData", formData);
  };

  return (
    <form
      onSubmit={handleSave}
      className="grid grid-cols-5 gap-y-4 py-4 px-6 bg-transparent rounded shadow-xl"
    >
      <div className="">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          value={formData.CompanyName}
          type="text"
          name="CompanyName"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Address
        </label>
        <input
          value={formData.Address}
          type="text"
          name="Address"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          PO Box
        </label>
        <input
          value={formData.POBox}
          type="text"
          name="POBox"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <input
          value={formData.WebsiteURL}
          type="url"
          name="WebsiteURL"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Year Established
        </label>
        <input
          value={formData.YeaEstablished}
          type="text"
          name="YearEstablished"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Business Description
        </label>
        <textarea
          value={formData.BusinessDescription}
          name="BusinessDescription"
          className="block w-5/6 resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none p-2 text-xs"
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Legal Entity Type
        </label>
        <input
          value={formData.LegalEntityType}
          type="text"
          name="LegalEntityType"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Licensing Authority
        </label>
        <input
          value={formData.LicensingAuthority}
          type="text"
          name="LicensingAuthority"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Subsidiary Code
        </label>
        <input
          value={formData.SubsidiaryCode}
          type="text"
          name="SubsidiaryCode"
          className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Logo
        </label>
        <input
          type="file"
          name="Logo"
          className="mt-1 block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none"
          onChange={handleChange}
          required
        />
      </div>
      <div className="">
        <button
          type="submit"
          className="bg-[#181344] rounded-full hover:bg-[#383080] block text-xs font-medium text-white border-2 border-[#F9c55d] shadow-lg cursor-pointer w-2/6 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
