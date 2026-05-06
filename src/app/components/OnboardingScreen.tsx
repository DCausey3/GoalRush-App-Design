import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Receipt, TrendingDown, PiggyBank, Wallet, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: Receipt,
    title: "Track bills",
    description: "Never miss a payment. Set reminders and autopay with ease.",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: TrendingDown,
    title: "Crush debt",
    description: "Pay down debt faster with smart payoff strategies.",
    color: "from-red-500 to-orange-500",
    bgGlow: "bg-red-500/20",
  },
  {
    icon: PiggyBank,
    title: "Build savings",
    description: "Reach your goals with visual progress tracking.",
    color: "from-yellow-500 to-amber-500",
    bgGlow: "bg-yellow-500/20",
  },
  {
    icon: Wallet,
    title: "Budget smarter together",
    description: "Share goals with family and celebrate wins together.",
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
];

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/app");
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-between px-6 py-12">
      <div className="flex gap-2 w-full max-w-md">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index === currentSlide ? "bg-emerald-500" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-1 flex flex-col items-center justify-center max-w-md"
        >
          <div className="mb-12 relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 ${slide.bgGlow} blur-3xl`}
            />
            <div className={`relative bg-gradient-to-br ${slide.color} w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl`}>
              <Icon className="w-16 h-16 text-white" strokeWidth={2} />
            </div>
          </div>

          <h2 className="text-5xl font-black text-white mb-4 text-center">{slide.title}</h2>
          <p className="text-xl text-slate-300 text-center">{slide.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-md space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
        >
          {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={() => navigate("/app")}
            className="w-full text-slate-400 hover:text-white py-2 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
