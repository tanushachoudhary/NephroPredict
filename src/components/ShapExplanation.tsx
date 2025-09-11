import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, TrendingUp, TrendingDown } from "lucide-react";
import { ShapValues } from "@/pages/Index";

interface ShapExplanationProps {
  shapValues: ShapValues[];
}

export const ShapExplanation = ({ shapValues }: ShapExplanationProps) => {
  // Sort by importance (absolute value)
  const sortedValues = [...shapValues].sort((a, b) => b.importance - a.importance);
  
  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
            <HelpCircle className="w-4 h-4 text-accent" />
          </div>
          <span>AI Model Explanation</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          SHAP values show how each feature contributes to the CKD prediction
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Feature Importance Chart */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-foreground">Feature Impact on Prediction</h4>
          
          <div className="space-y-3">
            {sortedValues.map((item, index) => (
              <div key={item.feature} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground min-w-0 flex-1">
                      {item.feature}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.impact === 'negative' 
                          ? 'border-destructive/20 text-destructive bg-destructive/5' 
                          : 'border-success/20 text-success bg-success/5'
                      }`}
                    >
                      {item.impact === 'negative' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {item.impact === 'negative' ? 'Increases Risk' : 'Decreases Risk'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Progress 
                      value={item.importance * 100} 
                      className={`h-2 ${
                        item.impact === 'negative' ? '[&>[data-state=complete]]:bg-destructive' : '[&>[data-state=complete]]:bg-success'
                      }`}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground min-w-0">
                    {(item.importance * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground pl-2">
                  Current value: <span className="font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHAP Waterfall Visualization */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-foreground">Risk Contribution Breakdown</h4>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Baseline Risk</span>
                <span className="font-medium">25%</span>
              </div>
              
              {sortedValues.slice(0, 5).map((item, index) => (
                <div key={item.feature} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.impact === 'negative' ? 'bg-destructive' : 'bg-success'
                    }`}></div>
                    <span className="text-muted-foreground">{item.feature}</span>
                  </div>
                  <span className={`font-medium ${
                    item.impact === 'negative' ? 'text-destructive' : 'text-success'
                  }`}>
                    {item.impact === 'negative' ? '+' : '-'}{(item.importance * 50).toFixed(1)}%
                  </span>
                </div>
              ))}
              
              <div className="border-t border-border pt-2 flex justify-between items-center text-sm font-semibold">
                <span>Final Prediction</span>
                <span className="text-destructive">75%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Interpretation */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <h4 className="font-semibold text-sm text-accent mb-3">Clinical Interpretation</h4>
          <div className="text-sm text-foreground space-y-2">
            <p><strong>Key Risk Drivers:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              {sortedValues.slice(0, 3).map((item) => (
                <li key={item.feature}>
                  <span className="font-medium">{item.feature}</span> - 
                  {item.feature === "Serum Creatinine" && " Elevated levels indicate reduced kidney function"}
                  {item.feature === "Hemoglobin" && " Low levels may indicate chronic kidney disease anemia"}
                  {item.feature === "Blood Urea" && " High levels suggest impaired kidney filtration"}
                  {item.feature === "Age" && " Advanced age is a non-modifiable risk factor"}
                  {item.feature === "Hypertension" && " Can cause and accelerate kidney damage"}
                  {item.feature === "Albumin" && " Protein in urine indicates kidney damage"}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Model Transparency */}
        <div className="text-xs text-muted-foreground bg-muted/20 rounded p-3">
          <p className="font-medium mb-1">Model Transparency:</p>
          <p>This explanation uses SHAP (SHapely Additive exPlanations) values to provide insight into individual predictions. 
          SHAP values represent the contribution of each feature towards moving the prediction away from the expected model output.</p>
        </div>
      </CardContent>
    </Card>
  );
};