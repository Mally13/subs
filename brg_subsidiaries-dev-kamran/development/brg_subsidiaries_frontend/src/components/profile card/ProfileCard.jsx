import IconsCard from "../iconsCard/IconsCard.jsx";
import { useNavigate } from "react-router-dom";
import {
  EmailIcon,
  TelephoneIcon,
  CellphoneIcon,
  WebIcon,
  EditIcon,
} from "../../utils/icons/icons.js";
import { motion } from "framer-motion";
const ProfileCard = (props) => {
  const {
    logo,
    company,
    address,
    person,
    email,
    contactno,
    telephoneno,
    web,
    sector,
    index,
    customStyles,
    edit,
  } = props;
  const navigate = useNavigate();
  return (
    // subsidiary card structure component
    <div className="flex w-full items-center justify-between lg:justify-normal text-[9px] font-semibold p-2">
      {/* serialno  */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block lg:w-[5%] mb-1 ml-2"
      >
        <p className="text-center text-white text-xs">{index}</p>
      </motion.div>
      {/* logo */}
      <motion.div
        initial={{ opacity: 0.1, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block w-[18.5%] mb-1 ml-2 relative  justify-center border-r-2 border-[#cc9127] min-h-[120px] pr-4"
      >
        <img
          src={logo}
          alt="logo"
          className="relative object-fit scale-110 rounded-sm p-2  "
        />
      </motion.div>
      {/* company name and address  */}
      <motion.div
        initial={{ opacity: 0.1, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block  initial={{ opacity: 0.1, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }} w-[33%] lg:w-[27%] mb-1 text-white p-1 lg:p-4 border-r border-[#cc9127] lg:border-0"
      >
        <h2
          className={
            customStyles
              ? customStyles
              : "text-[8px] lg:text-[20px] font-semibold mb-1 p-1"
          }
        >
          {company}
        </h2>
        <p className="p-1 text-[6px] lg:text-[12px] text-neutral-200 ">
          {address}
        </p>
      </motion.div>
      {/* name and contact details  */}
      <motion.div
        initial={{ opacity: 0.1, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block overflow-scroll w-[33%] lg:w-[25%] mb-1 ml-2 text-neutral-700  p-1 lg:p-2 border-r border-[#cc9127] lg:border-0 text-[12px] "
      >
        <p className="text-sm lg:text-base mb-2 font-bold flex items-center justify-between">
          {person}{" "}
          {edit && (
            <button onClick={() => navigate("/form")}>
              <EditIcon fontSize={20} />
            </button>
          )}
        </p>
        <p className="flex gap-1 lg:gap-2 items-center mb-2">
          <EmailIcon />
          {email}
        </p>
        <p className="flex gap-1 lg:gap-2 items-center mb-2">
          <CellphoneIcon />
          {contactno}
        </p>
        <p className="flex gap-1 lg:gap-2 items-center mb-2">
          <TelephoneIcon />
          {telephoneno}
        </p>
        <p className="flex gap-1 lg:gap-2 items-center mb-2 ">
          <WebIcon />
          {web}
        </p>
        <IconsCard />
      </motion.div>
      {/* sector  */}
      {sector && (
        <motion.div
          initial={{ opacity: 0.1, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden lg:block w-[33%] lg:w-[24.5%] mb-1 ml-2 text-[#8px] lg:text-xs font-medium text-neutral-300 lg:text-[#181344]"
        >
          <p className="overflow-scroll max-h-36 p-1 lg:px-8 leading-5">
            {sector.split(", ").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileCard;
