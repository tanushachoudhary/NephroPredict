import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap, RotateCcw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface RapidScreeningData {
  age: number;
  bloodPressure: number;
  serumCreatinine: number;
  hemoglobin: number;
  specificGravity: number;
}

interface RapidScreeningFormProps {
  onSubmit: (data: RapidScreeningData) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const RapidScreeningForm = ({ onSubmit, isLoading, onReset }: RapidScreeningFormProps) => {
  const [formData, setFormData] = useState<RapidScreeningData>({
    age: 50,
    bloodPressure: 120,
    serumCreatinine: 1.0,
    hemoglobin: 13.0,
    specificGravity: 1.020,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof RapidScreeningData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-card shadow-medical">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
            <Zap className="w-4 h-4 text-warning" />
          </div>
          <span>Rapid Screening</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-muted/50 border-muted">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Quick assessment using the 5 most predictive CKD indicators.
            For comprehensive analysis, switch to Doctor Mode.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center justify-between">
              <span>Age</span>
              <span className="text-xs text-muted-foreground font-normal">years</span>
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
              min="1"
              max="120"
              className="text-lg"
            />
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <Label htmlFor="bp" className="flex items-center justify-between">
              <span>Blood Pressure</span>
              <span className="text-xs text-muted-foreground font-normal">mmHg (systolic)</span>
            </Label>
            <Input
              id="bp"
              type="number"
              value={formData.bloodPressure}
              onChange={(e) => updateField('bloodPressure', parseInt(e.target.value) || 0)}
              min="60"
              max="250"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">Normal: 90-120 mmHg</p>
          </div>

          {/* Serum Creatinine */}
          <div className="space-y-2">
            <Label htmlFor="creatinine" className="flex items-center justify-between">
              <span>Serum Creatinine</span>
              <span className="text-xs text-muted-foreground font-normal">mg/dL</span>
            </Label>
            <Input
              id="creatinine"
              type="number"
              step="0.1"
              value={formData.serumCreatinine}
              onChange={(e) => updateField('serumCreatinine', parseFloat(e.target.value) || 0)}
              min="0.1"
              max="20"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">Normal: 0.6-1.3 mg/dL</p>
          </div>

          {/* Hemoglobin */}
          <div className="space-y-2">
            <Label htmlFor="hemoglobin" className="flex items-center justify-between">
              <span>Hemoglobin</span>
              <span className="text-xs text-muted-foreground font-normal">g/dL</span>
            </Label>
            <Input
              id="hemoglobin"
              type="number"
              step="0.1"
              value={formData.hemoglobin}
              onChange={(e) => updateField('hemoglobin', parseFloat(e.target.value) || 0)}
              min="3"
              max="20"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">Normal: 12-16 g/dL</p>
          </div>

          {/* Specific Gravity */}
          <div className="space-y-2">
            <Label htmlFor="sg" className="flex items-center justify-between">
              <span>Urine Specific Gravity</span>
              <span className="text-xs text-muted-foreground font-normal">ratio</span>
            </Label>
            <Input
              id="sg"
              type="number"
              step="0.001"
              value={formData.specificGravity}
              onChange={(e) => updateField('specificGravity', parseFloat(e.target.value) || 0)}
              min="1.000"
              max="1.040"
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">Normal: 1.005-1.030</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-warning to-warning/80 hover:opacity-90 transition-opacity text-warning-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Screening...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Screen
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="px-4"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
