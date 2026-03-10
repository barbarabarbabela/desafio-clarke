import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NameForm from "./name-form";
import StateForm from "./state-form";
import ConsumptionForm from "./consumption-form";

export default function Form() {
  const [searchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 1;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg border border-yellow-100 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {step === 1 && <NameForm />}
            {step === 2 && <StateForm />}
            {step === 3 && <ConsumptionForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
