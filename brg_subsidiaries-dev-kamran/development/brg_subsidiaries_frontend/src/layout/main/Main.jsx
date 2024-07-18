import CardNavbar from "../../components/navbar/CardNavbar";
import { subsidiaryData } from "./../../utils/data/subsidiaryData.js";
import ProfileCard from "../../components/profile card/ProfileCard.jsx";
import CommingSoon from "../../components/commingSoon/CommingSoon.jsx";

import { FormContextSetup } from "../../context/FormContext.jsx";
import { useContext, useEffect, useState } from "react";

const Main = () => {
  const [isEmail, setIsEmail] = useState();
  useEffect(() => {
    const storedEmail = localStorage.getItem("token");
    setIsEmail(storedEmail);
  }, []);
  return (
    <div className="">
      {/* navbar type header is here  */}
      <CardNavbar />
      {/* subsidiary cards are generating here dynamically using subsidiaryData.js file*/}
      <div className="overflow-scroll 2xl:max-h-[520px] lg:max-h-[420px] max-h-[640px] mb-16">
        {subsidiaryData.map((card, index) => {
          return (
            <>
              <div key={index} className="">
                <ProfileCard
                  logo={card.logo}
                  company={card.company}
                  address={card.address}
                  person={card.person}
                  email={card.email}
                  edit={card.email == isEmail ? true : false}
                  contactno={card.contactno}
                  telephoneno={card.telephoneno}
                  web={card.web}
                  sector={card.sector}
                  index={card.index !== undefined ? card.index : index}
                  customStyles={card.customStyles}
                />
              </div>
              <div className="hidden lg:block w-[95%] h-[2px] bg-[#cc9127] mx-auto"></div>
            </>
          );
        })}
      </div>
      <CommingSoon />
    </div>
  );
};

export default Main;
