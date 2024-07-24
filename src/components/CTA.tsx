import Background from "./Background";
import Button from "./Button";
import { motion } from "framer-motion";

type ButtonProps = {
  labelButton?: string;
  colorButton?: string;
  borderButton?: string;
};

type CTAProps = {
  headline: string;
  description: string;
  withButton?: boolean;
  buttonProps?: ButtonProps;
};

const CTA = ({ headline, description, withButton, buttonProps }: CTAProps) => {
  return (
    <>
      <section className="relative bg-primary overflow-hidden">
        <Background />
        <div className="w-screen mx-auto h-30rem relative flex flex-col justify-center items-center text-white text-center p-5 gap-5">
          <Light />
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl relative z-2">{headline}</h1>
            <p className="relative z-2">{description}</p>
          </div>
          {withButton && (
            <Button
              color={buttonProps?.colorButton ?? ""}
              border={buttonProps?.borderButton ?? ""}
            >
              {buttonProps?.labelButton ?? ""}
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

const Light = () => {
  return (
    <>
      <motion.div
        initial={{
          backgroundImage:
            "radial-gradient(50% 50% at 40% 40%, #141614 100%, #05CD77 100%)",
        }}
        animate={{
          backgroundImage:
            "radial-gradient(50% 50% at 45% 45%, #141614 100%, #05CD77 100%)",
        }}
        transition={{
          type: "spring",
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeOut",
        }}
        className="w-full h-30% -top-0 blur-3xl absolute rounded-full"
      />
    </>
  );
};

export default CTA;
