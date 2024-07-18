import progress from "../../assets/progress.svg";
import { motion } from "framer-motion";

const CommingSoon = () => {
  const sliderVariants = {
    initial: {
      opacity: 0.1,
      scale: 0.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
      },
    },
  };

  return (
    <>
      <div className="lg:hidden absolute top-60 p-6 w-full">
        <div className="flex mb-12">
          <img width={650} height={450} src={progress} alt="404" />
        </div>
        <motion.h1
          variants={sliderVariants}
          initial="initial"
          animate="animate"
          className="text-center text-[#F9c55d] font-semibold text-xl mb-6"
        >
          Coming Soon
        </motion.h1>
        <p className="text-center text-white  text-xs">
          We are working on optimizing this page for small screen devices.
          Please check back later!
        </p>
      </div>
    </>
  );
};

export default CommingSoon;
