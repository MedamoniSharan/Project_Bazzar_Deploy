import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Users, Building2, Bot, Handshake } from "lucide-react";

const stats = [
  { icon: <Users className="w-8 h-8 text-white" />, value: 200, suffix: "+", label: "Users", color: "text-blue-500" },
  { icon: <Building2 className="w-8 h-8 text-white" />, value: 15, suffix: "+", label: "Projects", color: "text-purple-500" },
  { icon: <Bot className="w-8 h-8 text-white" />, value: 50, suffix: "+", label: "Tech Stack", color: "text-orange-500" },
  { icon: <Handshake className="w-8 h-8 text-white" />, value: 20, suffix: "+", label: "Domain", color: "text-green-500" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
  const [key, setKey] = useState(0);

  // Every time `inView` becomes true, change key to force CountUp remount
  useEffect(() => {
    if (inView) {
      setKey(prev => prev + 1);
    }
  }, [inView]);

  return (
    <div ref={ref} className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {stats.map((stat, i) => (
          <div
            key={`${i}-${key}`} // key changes on each view
            className="bg-[#111] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center border border-white/10"
          >
            {stat.icon}
            <h3 className={`mt-4 text-3xl font-bold ${stat.color}`}>
              <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
            </h3>
            <p className="mt-1 text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
