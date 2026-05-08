import { motion, AnimatePresence } from "motion/react";
import { X, Target, DollarSign, Calendar, Smile } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

const GOAL_EMOJIS = ["🎯", "🏠", "🚗", "✈️", "💍", "🎓", "💻", "🏖️", "🛡️", "💰", "👶", "🎉"];

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
  onGoalAdded: () => void;
}

export function AddGoalModal({ open, onClose, onGoalAdded }: AddGoalModalProps) {
  const [form, setForm] = useState({
    name: "",
    emoji: "🎯",
    target_amount: "",
    current_amount: "",
    target_date: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit() {
    if (!form.name || !form.target_amount) {
      setError("Please enter a goal name and target amount.");
      return;
    }

    setSaving(true);
    const { error: supabaseError } = await supabase.from("savings_goals").insert({
      name: form.name,
      emoji: form.emoji,
      target_amount: parseFloat(form.target_amount),
      current_amount: parseFloat(form.current_amount || "0"),
      target_date: form.target_date || null,
    });

    setSaving(false);

    if (supabaseError) {
      setError("Failed to save goal. Please try again.");
      return;
    }

    setForm({ name: "", emoji: "🎯", target_amount: "", current_amount: "", target_date: "" });
    onGoalAdded();
    onClose();
  }

  const progress =
    form.target_amount && form.current_amount
      ? Math.min((parseFloat(form.current_amount) / parseFloat(form.target_amount)) * 100, 100)
      : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border border-white/10 rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">New Goal</h2>
                <p className="text-slate-400 text-sm mt-0.5">Dream it. Save it. Own it.</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Emoji + Name row */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Goal Name
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmojiPicker((p) => !p)}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl hover:bg-white/10 transition-all flex-shrink-0"
                  >
                    {form.emoji}
                  </button>
                  <div className="relative flex-1">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Emergency Fund, New Car..."
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Emoji picker */}
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-2 bg-slate-800 border border-white/10 rounded-2xl p-3 grid grid-cols-6 gap-2"
                    >
                      {GOAL_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setForm((prev) => ({ ...prev, emoji }));
                            setShowEmojiPicker(false);
                          }}
                          className={`text-2xl h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all ${
                            form.emoji === emoji ? "bg-yellow-500/20" : ""
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Target + Current amounts */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Target Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="target_amount"
                      value={form.target_amount}
                      onChange={handleChange}
                      type="number"
                      placeholder="10,000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Already Saved
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="current_amount"
                      value={form.current_amount}
                      onChange={handleChange}
                      type="number"
                      placeholder="0"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Live progress preview */}
              {progress > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-2xl p-3"
                >
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>Progress preview</span>
                    <span className="text-yellow-400 font-semibold">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Target Date */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Target Date <span className="text-slate-600 normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    name="target_date"
                    value={form.target_date}
                    onChange={handleChange}
                    type="date"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-all"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={saving}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-yellow-500/30 disabled:opacity-60 transition-all mt-2"
              >
                {saving ? "Saving..." : "Create Goal 🎯"}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}