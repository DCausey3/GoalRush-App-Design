import { motion } from "motion/react";
import { User, Users, Bell, Lock, Moon, ChevronRight, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export function ProfileScreen() {
  const { user, signOut } = useAuth();
const navigate = useNavigate();
const fullName = user?.user_metadata?.full_name ?? "User";
const email = user?.email ?? "";
const initials = fullName.charAt(0).toUpperCase();
const handleSignOut = async () => {
  await signOut();
  navigate("/login");
};

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Profile</h1>
          <p className="text-slate-400 mt-1">Manage your account</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl shadow-indigo-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-3xl font-black text-white shadow-lg">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-white mb-1">{fullName}</h2>
            <p className="text-indigo-100">{email}</p>
            <div className="mt-2 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-white font-semibold">Premium Member</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Account Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">127</div>
            <div className="text-xs text-slate-400">Days Active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-400 mb-1">$24K</div>
            <div className="text-xs text-slate-400">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-400 mb-1">8</div>
            <div className="text-xs text-slate-400">Goals Hit</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Settings</div>

        <button className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <User className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white font-semibold">Personal Information</div>
            <div className="text-sm text-slate-400">Update your profile details</div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>

        <button className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white font-semibold">Family Sharing</div>
            <div className="text-sm text-slate-400">Manage shared goals & permissions</div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>

        <button className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white font-semibold">Notifications</div>
            <div className="text-sm text-slate-400">Bill reminders & alerts</div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>

        <button className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-white font-semibold">Security</div>
            <div className="text-sm text-slate-400">Password & authentication</div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Preferences</div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
              <Moon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-white font-semibold">Dark Mode</div>
              <div className="text-sm text-slate-400">Enabled</div>
            </div>
          </div>
          <div className="w-12 h-7 bg-emerald-500 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <button className="w-full bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4 hover:bg-red-500/20 transition-all flex items-center justify-center gap-3">
          <LogOut className="w-5 h-5 text-red-400" onClick={handleSignOut}/>
          <span className="text-red-400 font-semibold">Log Out</span>
        </button>
      </motion.div>

      <div className="text-center text-slate-500 text-sm pt-4">
        GoalRush v1.0.0 • Made by CauseyInnovations
      </div>
    </div>
  );
}
