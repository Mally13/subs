import { useState } from "react";

const ContactPersonForm = ({ contactPersonData }) => {
  const [formData, setFormData] = useState(
    contactPersonData || {
      ContactPersonName: "",
      PhoneNumber: "",
      Email: "",
      TelNo: "",
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
    alert("Updated Contact Person Data");
    console.log(formData);
  };

  return (
    <div className="shadow-xl py-3">
      <form className="grid grid-cols-5 gap-y-4 py-4 px-6 bg-transparent rounded">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Contact Person Name
          </label>
          <input
            value={formData.ContactPersonName}
            type="text"
            name="ContactPersonName"
            className="block w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <textarea
            value={formData.PhoneNumber}
            name="PhoneNumber"
            className="block w-5/6 resize-none max-h-[32px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email ID
          </label>
          <textarea
            value={formData.Email}
            name="Email"
            className="block w-5/6 resize-none max-h-[32px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Tel Number
          </label>
          <textarea
            value={formData.TelNo}
            name="TelNo"
            className="block w-5/6 resize-none max-h-[32px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black p-2 text-xs outline-none"
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

export default ContactPersonForm;
