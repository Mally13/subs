import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../utils/icons/icons";
import { motion } from "framer-motion";

const IconsCard = () => {
  return (
    // icons component for profile card 
    <motion.div
      initial={{ opacity: 0.2, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex gap-2 items-center text-sm lg:text-2xl  "
    >
      <p className=" hover:text-blue-600 cursor-pointer hover:scale-110">
        <FacebookIcon />
      </p>
      <p className=" hover:text-orange-900 cursor-pointer hover:scale-110">
        <InstagramIcon />
      </p>
      <p className=" hover:text-blue-900 cursor-pointer hover:scale-110">
        <LinkedinIcon />
      </p>
      <p className=" hover:text-black cursor-pointer hover:scale-110">
        <TwitterIcon />
      </p>
    </motion.div>
  );
};

export default IconsCard;
