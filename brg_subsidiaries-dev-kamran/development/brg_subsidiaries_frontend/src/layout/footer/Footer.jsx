import logo from "../../assets/BinRahmaLogo.png";
import { HeartIcon } from "../../utils/icons/icons";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-[#120e35] px-4 lg:py-4 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between items-center absolute bottom-0 shadow-2xl">
      <div className="mb-4 lg:mb-0 w-1/3">
        <img
          src={logo}
          alt="Bin Rahma "
          className="lg:w-2/5 w-4/5 mx-auto lg:mx-0"
        />
      </div>
      <div className="text-[#cc9127] lg:text-xs text-[8px] mb-4 lg:mb-0  w-1/3">
        <p className="text-center">
          &copy; 2024 Bin Rahma Group. All rights reserved
        </p>
      </div>
      <div className="text-[#cc9127] lg:text-xs text-[8px] mb-2 lg:mb-0 w-1/3 ">
        <p className="text-normal lg:text-right font-medium flex justify-center lg:justify-end gap-1 items-center mb-1 ">
          Made with{" "}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="text-red-500"
          >
            <HeartIcon fontSize={24} />
          </motion.span>
          by
          <a
            target="_blank"
            href="http://www.c3is.in"
            className="font-semibold text-base underline block"
          >
            C3IS
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
