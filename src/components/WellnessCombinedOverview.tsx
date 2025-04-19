
import React from "react";
import WellnessCompanyOverview from "@/components/WellnessCompanyOverview";
import WellnessUserOverview from "@/components/WellnessUserOverview";
import { HeartPulse, Building2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

// Renders the company and user wellness together in a single card, with a divider
export default function WellnessCombinedOverview() {
  return (
    <Card className="mb-8 bg-gradient-to-br from-purple-800/70 to-blue-950/80 backdrop-blur-lg border border-white/10 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <HeartPulse className="h-5 w-5 text-red-400" />
          <span className="font-semibold text-lg text-white">
            Company & Your Wellness Overview
          </span>
        </div>
        <CardDescription className="mt-1 text-gray-300">
          Live well-being metrics for your organization and for you personally!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex-1">
            <div className="mb-3 text-base font-semibold text-blue-300 flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Company Wellness Snapshot
            </div>
            {/* Render only content, not the enclosing card, for company */}
            <div className="bg-transparent p-0">
              <WellnessCompanyOverview hideTitle hideCard />
            </div>
          </div>
          {/* Vertical divider for desktop, horizontal for mobile */}
          <div className="my-6 md:my-0 md:mx-6 flex justify-center items-center">
            <div className="w-full h-px md:w-px md:h-40 bg-blue-900/70" />
          </div>
          <div className="flex-1">
            <div className="mb-3 text-base font-semibold text-purple-300 flex items-center gap-2">
              <HeartPulse className="h-4 w-4" /> Your Wellness Stats
            </div>
            {/* Render only content, not the enclosing card, for user */}
            <div className="bg-transparent p-0">
              <WellnessUserOverview hideTitle hideCard />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
