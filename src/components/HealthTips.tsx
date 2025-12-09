import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Thermometer,
  Pill,
  Calendar,
  FileText
} from "lucide-react";

const tips = [
  {
    icon: Thermometer,
    title: "Monitor Blood Pressure Daily",
    description: "Keep BP below 130/80 mmHg. High blood pressure is a leading cause of kidney disease progression.",
    type: "warning"
  },
  {
    icon: Pill,
    title: "Avoid NSAIDs",
    description: "Avoid over-the-counter pain relievers like ibuprofen and naproxen. Use acetaminophen when needed.",
    type: "danger"
  },
  {
    icon: Calendar,
    title: "Regular Check-ups",
    description: "Schedule kidney function tests (eGFR, creatinine) every 3-6 months based on your risk level.",
    type: "info"
  },
  {
    icon: FileText,
    title: "Know Your Numbers",
    description: "Track your eGFR, creatinine, and albumin levels. Understanding trends helps in early intervention.",
    type: "success"
  },
  {
    icon: AlertCircle,
    title: "Watch for Warning Signs",
    description: "Report swelling, fatigue, changes in urination, or foamy urine to your doctor immediately.",
    type: "warning"
  },
  {
    icon: CheckCircle2,
    title: "Control Blood Sugar",
    description: "If diabetic, maintain HbA1c below 7%. Uncontrolled diabetes is the #1 cause of kidney disease.",
    type: "success"
  },
];

const quickFacts = [
  "1 in 7 adults has chronic kidney disease",
  "Early detection can slow disease progression by up to 50%",
  "Healthy kidneys filter about 200 liters of blood daily",
  "CKD can be managed effectively with lifestyle changes",
  "Regular exercise reduces CKD risk by 30%",
];

export const HealthTips = () => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "danger": return "bg-destructive/10 border-destructive/30 text-destructive";
      case "warning": return "bg-warning/10 border-warning/30 text-warning";
      case "success": return "bg-success/10 border-success/30 text-success";
      case "info": 
      default: return "bg-primary/10 border-primary/30 text-primary";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
            <Lightbulb className="w-4 h-4 text-warning" />
          </div>
          <span>Health Tips & Awareness</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border ${getTypeStyles(tip.type)}`}
            >
              <div className="flex items-start gap-3">
                <tip.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Facts */}
        <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
          <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary" />
            Did You Know?
          </h4>
          <div className="flex flex-wrap gap-2">
            {quickFacts.map((fact, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-xs text-foreground"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">When to Seek Emergency Care</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Contact your doctor or go to the ER immediately if you experience:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Severe shortness of breath or chest pain</li>
                <li>• Blood in urine or inability to urinate</li>
                <li>• Sudden severe swelling or confusion</li>
                <li>• Persistent vomiting or severe weakness</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
