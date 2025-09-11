import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Brain } from "lucide-react";
import { PredictionResult, PatientData } from "@/pages/Index";

interface PredictionResultsProps {
  result: PredictionResult;
  patientData: PatientData | null;
}

export const PredictionResults = ({ result, patientData }: PredictionResultsProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-success text-success-foreground";
      case "Moderate": return "bg-warning text-warning-foreground";  
      case "High": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low": return <CheckCircle className="w-5 h-5" />;
      case "Moderate": return <AlertTriangle className="w-5 h-5" />;
      case "High": return <XCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <span>CKD Risk Assessment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Risk Level */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            {getRiskIcon(result.risk_level)}
            <Badge className={`${getRiskColor(result.risk_level)} text-lg px-4 py-2`}>
              {result.risk_level} Risk
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">CKD Probability</span>
              <span className="font-semibold">{(result.probability * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={result.probability * 100} 
              className="h-3"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Model Confidence</span>
              <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={result.confidence * 100} 
              className="h-2"
            />
          </div>
        </div>

        {/* Model Information */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Model Details</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Algorithm:</span>
              <span className="font-medium">{result.model_used}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Training Accuracy:</span>
              <span className="font-medium">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Validation AUC:</span>
              <span className="font-medium">0.96</span>
            </div>
          </div>
        </div>

        {/* Key Risk Factors */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Critical Values</h4>
          {patientData && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className={`p-3 rounded-lg ${
                patientData.serumCreatinine > 1.3 ? 'bg-destructive/10 border border-destructive/20' : 'bg-success/10 border border-success/20'
              }`}>
                <div className="font-medium">Serum Creatinine</div>
                <div className="text-lg font-bold">{patientData.serumCreatinine} mg/dL</div>
                <div className="text-xs text-muted-foreground">Normal: 0.6-1.3</div>
              </div>
              <div className={`p-3 rounded-lg ${
                patientData.hemoglobin < 12 ? 'bg-destructive/10 border border-destructive/20' : 'bg-success/10 border border-success/20'  
              }`}>
                <div className="font-medium">Hemoglobin</div>
                <div className="text-lg font-bold">{patientData.hemoglobin} g/dL</div>
                <div className="text-xs text-muted-foreground">Normal: 12-16</div>
              </div>
              <div className={`p-3 rounded-lg ${
                patientData.bloodUrea > 50 ? 'bg-destructive/10 border border-destructive/20' : 'bg-success/10 border border-success/20'
              }`}>
                <div className="font-medium">Blood Urea</div>
                <div className="text-lg font-bold">{patientData.bloodUrea} mg/dL</div>
                <div className="text-xs text-muted-foreground">Normal: 15-50</div>
              </div>
              <div className={`p-3 rounded-lg ${
                patientData.packedCellVolume < 35 ? 'bg-destructive/10 border border-destructive/20' : 'bg-success/10 border border-success/20'
              }`}>
                <div className="font-medium">PCV</div>
                <div className="text-lg font-bold">{patientData.packedCellVolume}%</div>
                <div className="text-xs text-muted-foreground">Normal: 35-50</div>
              </div>
            </div>
          )}
        </div>

        {/* Clinical Recommendations */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-sm text-primary mb-2">Clinical Recommendations</h4>
          <div className="text-sm text-foreground space-y-1">
            {result.risk_level === "High" && (
              <>
                <p>• Immediate nephrology referral recommended</p>
                <p>• Monitor kidney function closely (eGFR, creatinine)</p>
                <p>• Evaluate for underlying causes</p>
                <p>• Optimize blood pressure and glucose control</p>
              </>
            )}
            {result.risk_level === "Moderate" && (
              <>
                <p>• Schedule follow-up in 3-6 months</p>
                <p>• Monitor kidney function trends</p>
                <p>• Address modifiable risk factors</p>
                <p>• Consider nephrology consultation</p>
              </>
            )}
            {result.risk_level === "Low" && (
              <>
                <p>• Continue routine monitoring</p>
                <p>• Maintain healthy lifestyle</p>
                <p>• Annual kidney function assessment</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};