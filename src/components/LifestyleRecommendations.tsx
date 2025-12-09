import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, 
  Dumbbell, 
  Droplets, 
  Moon, 
  Cigarette, 
  Wine, 
  Pill,
  Heart,
  Scale,
  Timer
} from "lucide-react";
import { PredictionResult } from "@/pages/Index";

interface LifestyleRecommendationsProps {
  riskLevel: PredictionResult["risk_level"];
}

const recommendations = {
  diet: [
    { icon: Utensils, title: "Low Sodium Diet", description: "Limit sodium intake to less than 2,300mg daily. Avoid processed foods, canned soups, and salty snacks.", priority: "high" },
    { icon: Droplets, title: "Protein Management", description: "Moderate protein intake (0.8g per kg body weight). Choose high-quality proteins like fish and eggs.", priority: "high" },
    { icon: Utensils, title: "Potassium Control", description: "Monitor potassium-rich foods like bananas, oranges, and potatoes. Consult dietitian for personalized plan.", priority: "medium" },
    { icon: Droplets, title: "Fluid Balance", description: "Maintain proper hydration but avoid excess fluids. Typically 6-8 cups daily unless advised otherwise.", priority: "medium" },
  ],
  exercise: [
    { icon: Dumbbell, title: "Regular Exercise", description: "30 minutes of moderate activity 5 days/week. Walking, swimming, or cycling are excellent choices.", priority: "high" },
    { icon: Heart, title: "Cardiovascular Health", description: "Include heart-healthy activities to improve circulation and reduce blood pressure naturally.", priority: "high" },
    { icon: Scale, title: "Weight Management", description: "Maintain healthy BMI (18.5-24.9). Even 5-10% weight loss can significantly improve kidney function.", priority: "medium" },
    { icon: Timer, title: "Avoid Overexertion", description: "Listen to your body. Rest when needed and avoid extreme physical stress.", priority: "low" },
  ],
  lifestyle: [
    { icon: Moon, title: "Quality Sleep", description: "Aim for 7-9 hours of sleep nightly. Poor sleep can worsen blood pressure and kidney function.", priority: "high" },
    { icon: Cigarette, title: "Quit Smoking", description: "Smoking damages blood vessels and accelerates kidney disease progression. Seek cessation support.", priority: "high" },
    { icon: Wine, title: "Limit Alcohol", description: "Limit to 1 drink daily for women, 2 for men. Alcohol can raise blood pressure and damage kidneys.", priority: "medium" },
    { icon: Pill, title: "Medication Compliance", description: "Take all prescribed medications as directed. Never skip doses or stop without consulting your doctor.", priority: "high" },
  ],
};

export const LifestyleRecommendations = ({ riskLevel }: LifestyleRecommendationsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filterByRisk = (items: typeof recommendations.diet) => {
    if (riskLevel === "High") return items;
    if (riskLevel === "Moderate") return items.filter(i => i.priority !== "low");
    return items.filter(i => i.priority === "high");
  };

  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
            <Heart className="w-4 h-4 text-success" />
          </div>
          <span>Personalized Lifestyle Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Diet Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Utensils className="w-4 h-4 text-primary" />
            Dietary Changes
          </h4>
          <div className="grid gap-3">
            {filterByRisk(recommendations.diet).map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-accent" />
            Exercise & Activity
          </h4>
          <div className="grid gap-3">
            {filterByRisk(recommendations.exercise).map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Moon className="w-4 h-4 text-warning" />
            General Lifestyle
          </h4>
          <div className="grid gap-3">
            {filterByRisk(recommendations.lifestyle).map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
