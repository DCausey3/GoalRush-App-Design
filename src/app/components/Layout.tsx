import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Receipt, Wallet, Target, User, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFAB, setShowFAB] = useState(false);

  const navItems = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/bills", icon: Receipt, label: "Bills" },
    { path: "/app/budget", icon: Wallet, label: "Budget" },
    { path: "/app/goals", icon: Target, label: "Goals" },
    { path: "/app/profile", icon: User, label: "Profile" },
  ];

  const fabActions = [
    { label: "Add Bill", action: () => navigate("/app/bills"), color: "from-blue-500 to-cyan-500" },
    { label: "Add Income", action: () => navigate("/app/income"), color: "from-emerald-500 to-green-500" },
    { label: "Add Debt", action: () => navigate("/app/debt"), color: "from-red-500 to-orange-500" },
    { label: "Add Savings", action: () => navigate("/app/goals"), color: "from-yellow-500 to-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 pb-24">
      <div className="max-w-2xl mx-auto">
        <Outlet />
      </div>

      <AnimatePresence>
        {showFAB && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFAB(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          >
            <div className="absolute bottom-32 right-6 space-y-3">
              {fabActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.action();
                    setShowFAB(false);
                  }}
                  className={`flex items-center gap-3 bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-full shadow-2xl font-semibold whitespace-nowrap`}
                >
                  {action.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFAB(!showFAB)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-emerald-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 z-50"
      >
        <Plus className={`w-8 h-8 text-white transition-transform ${showFAB ? "rotate-45" : ""}`} />
      </motion.button>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 z-30">
        <div className="max-w-2xl mx-auto flex justify-around items-center px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-3 w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                  />
                )}
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
