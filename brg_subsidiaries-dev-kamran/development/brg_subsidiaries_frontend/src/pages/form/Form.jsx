import React, { useEffect, useState } from "react";
import CompanyForm from "../../components/Form Comps/company details/CompanyForm";
import ContactPersonForm from "../../components/Form Comps/contact person details/ContactPersonForm";
import OptionalForm from "../../components/Form Comps/optional details/OptionalForm";
import { RightIcon, DownIcon } from "../../utils/icons/icons";
import { useLocation } from "react-router-dom";
import { subsidiaryData } from "../../utils/data/subsidiaryData";

const Form = () => {
  const [user, setUser] = useState({});

  const [visibleForm, setVisibleForm] = useState("companyDetails");

  const showForm = (formName) => {
    setVisibleForm(formName);
  };

  useEffect(() => {
    // alert(location.state);
    const lsEmail = localStorage.getItem("token");
    const userData = subsidiaryData.find(
      (subsidiary) => subsidiary.email?.toLowerCase() === lsEmail?.toLowerCase()
    );
    const { email } = userData || {};
    if (email) {
      console.log(userData, "form");
      setUser(userData);
    }
    console.log(userData, "form2");
  }, []);

  return (
    <div className="bg-[#e9e6e6] w-full h-3/4 p-4 relative">
      <h2 className="text-2xl text-gray-700 font-semibold text-center uppercase">
        Update Details Here{" "}
      </h2>
      <div className="mb-4">
        <button
          className="py-2 px-6 text-gray-700  font-semibold flex items-center gap-1"
          onClick={() => showForm("companyDetails")}
        >
          {visibleForm === "companyDetails" ? <DownIcon /> : <RightIcon />}
          Company Details
        </button>
        {visibleForm === "companyDetails" && (
          <CompanyForm companyData={user?.companyDetails} />
        )}
      </div>
      <div className="mb-4">
        <button
          className="py-2 px-6 text-gray-700  font-semibold flex items-center gap-1"
          onClick={() => showForm("contactPersonDetails")}
        >
          {visibleForm === "contactPersonDetails" ? (
            <DownIcon />
          ) : (
            <RightIcon />
          )}
          Contact Person/s Details
        </button>
        {visibleForm === "contactPersonDetails" && (
          <ContactPersonForm contactPersonData={user?.contactPersonDetails} />
        )}
      </div>
      <div className="mb-4">
        <button
          className="py-2 px-6 text-gray-700  font-semibold flex items-center gap-1"
          onClick={() => showForm("optionalDetails")}
        >
          {visibleForm === "optionalDetails" ? <DownIcon /> : <RightIcon />}
          Optional Details
        </button>
        {visibleForm === "optionalDetails" && (
          <OptionalForm OptionalData={user?.optionalDetails} />
        )}
      </div>
    </div>
  );
};

export default Form;
