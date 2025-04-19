
import React, { useEffect, useState } from "react";
import { HeartPulse, Users, ListCheck, TrendingDown, TrendingUp, Smile, SmilePlus } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Helper to mock company "real-time" metrics
function getMockCompanyWellness() {
  // 50-90 employees
  const employees = 66 + Math.floor(Math.random() * 25);
  // Mood distribution
  const good = Math.floor(employees * 0.36 + Math.random()*employees*0.16);
  const bad = Math.floor(employees * 0.15 + Math.random()*employees*0.09);
  const neutral = employees - good - bad;
  // Avg stress, high stress depts
  const avgStress = Math.floor(41 + Math.random() * 38); // 41-79%
  const departments = [
    { name: "Product", stress: Math.floor(58 + Math.random() * 28) },
    { name: "Engineering", stress: Math.floor(46 + Math.random() * 34) },
    { name: "Sales", stress: Math.floor(60 + Math.random() * 28) },
    { name: "Support", stress: Math.floor(41 + Math.random() * 37) },
  ];
  // Sort and pick high stress
  const highStress = departments.filter(d => d.stress > 69);
  let recs = [
    "Schedule a group wellness activity this week.",
    "Encourage flexible breaks and regular check-ins.",
    "Send out an anonymous pulse survey.",
    "Promote walking meetings."
  ];
  if (avgStress > 65) recs = ["Host a company wellness day.", "Team-wide breathing/meditation break.", ...recs];
  return { employees, good, neutral, bad, avgStress, highStress, recs };
}

export default function WellnessCompanyOverview() {
  const [stats, setStats] = useState(getMockCompanyWellness());
  useEffect(() => {
    const interval = setInterval(() => setStats(getMockCompanyWellness()), 8000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Card className="mb-8 bg-gradient-to-br from-purple-800/70 to-blue-950/80 backdrop-blur-lg border border-white/10 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-blue-400" />
          <span className="font-semibold text-lg text-white">Employee Wellness Insight</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-8 items-center justify-between pt-3">
        <div>
          <div className="text-xs text-gray-300">Company Stress (avg)</div>
          <div className="font-bold text-2xl text-white flex items-center gap-2">
            {stats.avgStress}% <HeartPulse className="h-4 w-4 text-red-300" />
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Mood Summary</div>
          <div className="flex flex-col gap-1 text-white font-medium">
            <span className="flex items-center gap-1"><SmilePlus className="text-green-400 h-4 w-4" /> Good: {stats.good}</span>
            <span className="flex items-center gap-1"><Smile className="text-yellow-400 h-4 w-4" /> Neutral: {stats.neutral}</span>
            <span className="flex items-center gap-1"><HeartPulse className="text-red-400 h-4 w-4" /> Bad: {stats.bad}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Departments with High Stress</div>
          <ul className="text-white/90 text-sm min-w-[120px]">
            {stats.highStress.length === 0 ? (
              <li className="text-green-300">None 💚</li>
            ) : stats.highStress.map((dept, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-400" />
                <span>{dept.name}</span> <span>({dept.stress}%)</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-[180px]">
          <div className="text-xs text-gray-300 mb-1">Recommendations</div>
          <ul className="list-disc pl-5 text-white/90 text-sm space-y-1">
            {stats.recs.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
