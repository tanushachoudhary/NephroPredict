import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { Activity } from "lucide-react";
import { PatientData } from "@/pages/Index";

interface HealthMetricsChartProps {
  patientData: PatientData;
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
  normal: {
    label: "Normal",
    color: "hsl(var(--success))",
  },
  abnormal: {
    label: "Abnormal",
    color: "hsl(var(--destructive))",
  },
};

export const HealthMetricsChart = ({ patientData }: HealthMetricsChartProps) => {
  // Normalize values to percentage of normal range for radar chart
  const radarData = [
    { metric: "Hemoglobin", value: Math.min((patientData.hemoglobin / 16) * 100, 100), fullMark: 100 },
    { metric: "BP", value: Math.min((120 / patientData.bloodPressure) * 100, 100), fullMark: 100 },
    { metric: "Creatinine", value: Math.min((1.2 / patientData.serumCreatinine) * 100, 100), fullMark: 100 },
    { metric: "Blood Urea", value: Math.min((40 / patientData.bloodUrea) * 100, 100), fullMark: 100 },
    { metric: "Sodium", value: Math.min((patientData.sodium / 145) * 100, 100), fullMark: 100 },
    { metric: "PCV", value: Math.min((patientData.packedCellVolume / 45) * 100, 100), fullMark: 100 },
  ];

  const barData = [
    { 
      name: "Hemoglobin", 
      value: patientData.hemoglobin, 
      normal: 14, 
      status: patientData.hemoglobin >= 12 ? "normal" : "abnormal" 
    },
    { 
      name: "Creatinine", 
      value: patientData.serumCreatinine, 
      normal: 1.0, 
      status: patientData.serumCreatinine <= 1.3 ? "normal" : "abnormal" 
    },
    { 
      name: "Blood Urea", 
      value: patientData.bloodUrea / 2, 
      normal: 30, 
      status: patientData.bloodUrea <= 50 ? "normal" : "abnormal" 
    },
    { 
      name: "Glucose", 
      value: patientData.bloodGlucoseRandom / 3, 
      normal: 40, 
      status: patientData.bloodGlucoseRandom <= 140 ? "normal" : "abnormal" 
    },
  ];

  // Risk factors pie chart
  const riskFactors = [
    { name: "Hypertension", value: patientData.hypertension === "yes" ? 25 : 0 },
    { name: "Diabetes", value: patientData.diabetesMellitus === "yes" ? 30 : 0 },
    { name: "Anemia", value: patientData.anemia === "yes" ? 20 : 0 },
    { name: "CAD", value: patientData.coronaryArteryDisease === "yes" ? 25 : 0 },
  ].filter(item => item.value > 0);

  const COLORS = ["hsl(var(--destructive))", "hsl(var(--warning))", "hsl(var(--primary))", "hsl(var(--accent))"];

  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <span>Health Metrics Visualization</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Radar Chart - Overall Health Score */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground">Overall Health Profile</h4>
            <div className="h-[250px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <Radar
                    name="Health Score"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Bar Chart - Key Metrics Comparison */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground">Key Metrics vs Normal</h4>
            <div className="h-[250px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    width={80}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]}
                    fill="hsl(var(--primary))"
                  />
                  <Bar 
                    dataKey="normal" 
                    radius={[0, 4, 4, 0]}
                    fill="hsl(var(--success))"
                    fillOpacity={0.4}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* Risk Factors Pie Chart */}
        {riskFactors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground">Active Risk Factors</h4>
            <div className="flex items-center gap-6">
              <div className="h-[150px] w-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskFactors}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskFactors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3">
                {riskFactors.map((factor, index) => (
                  <div key={factor.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-muted-foreground">{factor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
