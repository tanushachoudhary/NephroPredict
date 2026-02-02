import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RapidResult {
  status: "green" | "yellow" | "red";
  message: string;
  recommendation: string;
  confidence: number;
}

interface RapidScreeningResultProps {
  result: RapidResult;
  onSwitchToComprehensive: () => void;
}

export const RapidScreeningResult = ({ result, onSwitchToComprehensive }: RapidScreeningResultProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "green":
        return {
          icon: <CheckCircle className="w-12 h-12" />,
          label: "Low Risk",
          bgColor: "bg-success/10",
          textColor: "text-success",
          borderColor: "border-success/30",
          badgeClass: "bg-success text-success-foreground",
          description: "Your kidney function indicators appear normal"
        };
      case "yellow":
        return {
          icon: <AlertTriangle className="w-12 h-12" />,
          label: "Moderate Risk",
          bgColor: "bg-warning/10",
          textColor: "text-warning",
          borderColor: "border-warning/30",
          badgeClass: "bg-warning text-warning-foreground",
          description: "Some indicators suggest potential concern"
        };
      case "red":
        return {
          icon: <XCircle className="w-12 h-12" />,
          label: "High Risk",
          bgColor: "bg-destructive/10",
          textColor: "text-destructive",
          borderColor: "border-destructive/30",
          badgeClass: "bg-destructive text-destructive-foreground",
          description: "Indicators suggest you should see a doctor"
        };
      default:
        return {
          icon: <CheckCircle className="w-12 h-12" />,
          label: "Unknown",
          bgColor: "bg-muted",
          textColor: "text-muted-foreground",
          borderColor: "border-muted",
          badgeClass: "bg-muted text-muted-foreground",
          description: ""
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <Card className="bg-gradient-card shadow-elevated overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
            <Zap className="w-4 h-4 text-warning" />
          </div>
          <span>Screening Result</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Traffic Light Result */}
        <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-8 text-center`}>
          <div className={`${config.textColor} flex justify-center mb-4`}>
            {config.icon}
          </div>
          <Badge className={`${config.badgeClass} text-xl px-6 py-2 mb-3`}>
            {config.label}
          </Badge>
          <p className={`${config.textColor} font-medium`}>
            {config.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Confidence: {(result.confidence * 100).toFixed(0)}%
          </p>
        </div>

        {/* Key Message */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Assessment</h4>
          <p className="text-sm text-muted-foreground">{result.message}</p>
        </div>

        {/* Recommendation */}
        <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}>
          <h4 className={`font-semibold ${config.textColor} mb-2`}>Recommendation</h4>
          <p className="text-sm text-foreground">{result.recommendation}</p>
        </div>

        {/* Upgrade Prompt */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Want More Details?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Switch to Comprehensive Analysis for detailed SHAP explanations, 
            disease subtype insights, and personalized recommendations.
          </p>
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={onSwitchToComprehensive}
          >
            Switch to Doctor Mode
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center italic">
          This rapid screening is for informational purposes only and does not constitute medical advice. 
          Please consult a healthcare professional for proper diagnosis.
        </p>
      </CardContent>
    </Card>
  );
};
