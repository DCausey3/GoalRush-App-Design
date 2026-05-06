interface CircularProgressProps {
  value: number;
  label: string;
  amount: string;
}

export function CircularProgress({ value, label, amount }: CircularProgressProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-28 h-28">
        <svg className="transform -rotate-90 w-28 h-28">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-black text-white">{value}%</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-blue-100 text-sm mb-1">{label}</div>
        <div className="text-3xl font-black text-white">{amount}</div>
      </div>
    </div>
  );
}
