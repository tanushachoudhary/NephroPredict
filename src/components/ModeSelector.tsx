import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Stethoscope, Check } from "lucide-react";

export type PredictionMode = "rapid" | "comprehensive";

interface ModeSelectorProps {
  mode: PredictionMode;
  onModeChange: (mode: PredictionMode) => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Rapid Screening Mode */}
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          mode === "rapid" 
            ? "ring-2 ring-primary bg-primary/5 shadow-elevated" 
            : "hover:shadow-md hover:bg-muted/30"
        }`}
        onClick={() => onModeChange("rapid")}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-xl">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            {mode === "rapid" && (
              <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Rapid Screening
          </h3>
          <Badge variant="outline" className="mb-3 text-xs">
            Guest Mode
          </Badge>
          
          <p className="text-sm text-muted-foreground mb-4">
            Quick assessment using only 5 core parameters. Perfect for initial screenings or when limited data is available.
          </p>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              <span>Age, Blood Pressure, Creatinine</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              <span>Hemoglobin, Specific Gravity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
              <span>Traffic light result system</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Analysis Mode */}
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          mode === "comprehensive" 
            ? "ring-2 ring-primary bg-primary/5 shadow-elevated" 
            : "hover:shadow-md hover:bg-muted/30"
        }`}
        onClick={() => onModeChange("comprehensive")}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            {mode === "comprehensive" && (
              <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Comprehensive Analysis
          </h3>
          <Badge variant="outline" className="mb-3 text-xs">
            Doctor Mode
          </Badge>
          
          <p className="text-sm text-muted-foreground mb-4">
            Full clinical assessment with all 24 parameters. Provides detailed SHAP explanations and disease subtype insights.
          </p>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Complete blood & urine panel</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Full medical history</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Detailed SHAP analysis</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
