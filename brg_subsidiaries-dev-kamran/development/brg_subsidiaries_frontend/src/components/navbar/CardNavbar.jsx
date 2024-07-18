import { motion } from "framer-motion";

const CardNavbar = () => {
  const sliderVariants = {
    initial: {
      x: 400,
    },
    animate: {
      x: "0",
      transition: {
        duration: 1.5,
      },
    },
  };
  return (
    <motion.nav
      variants={sliderVariants}
      initial="initial"
      animate="animate"
      className="font-semibold mb-4 text-[#181344] text-[8px] lg:text-sm"
    >
      <ul className="bg-[#F9c55d] p-1 rounded-t-xl hidden lg:flex items-center w-[94%] mx-auto lg:w-full text-center justify-between lg:justify-normal">
        <li className="hidden lg:block lg:w-[50%]">Company Details</li>
        <li className="hidden lg:block lg:w-[25%]">Contact Details</li>
        <li className="hidden lg:block lg:w-[25%]">Business Activities</li>
      </ul>
    </motion.nav>
  );
};

export default CardNavbar;
