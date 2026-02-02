import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, User, RotateCcw } from "lucide-react";
import { PatientData } from "@/pages/Index";

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const PatientForm = ({ onSubmit, isLoading, onReset }: PatientFormProps) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 60,
    bloodPressure: 120,
    specificGravity: 1.02,
    albumin: 0,
    sugar: 0,
    redBloodCells: "normal",
    pusCell: "normal",
    pusCellClumps: "notpresent",
    bacteria: "notpresent",
    bloodGlucoseRandom: 100,
    bloodUrea: 40,
    serumCreatinine: 1.2,
    sodium: 140,
    potassium: 4.0,
    hemoglobin: 12.0,
    packedCellVolume: 40,
    whiteBloodCellCount: 7000,
    redBloodCellCount: 4.5,
    hypertension: "no",
    diabetesMellitus: "no",
    coronaryArteryDisease: "no",
    appetite: "good",
    pedalEdema: "no",
    anemia: "no",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof PatientData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-card shadow-medical mx-auto w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span>Patient Assessment</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Demographics */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Demographics</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateField('age', parseInt(e.target.value))}
                  min="1"
                  max="120"
                />
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Vital Signs</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
                <Input
                  id="bp"
                  type="number"
                  value={formData.bloodPressure}
                  onChange={(e) => updateField('bloodPressure', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Lab Values */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Laboratory Tests</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="creatinine">Serum Creatinine (mg/dL)</Label>
                <Input
                  id="creatinine"
                  type="number"
                  step="0.1"
                  value={formData.serumCreatinine}
                  onChange={(e) => updateField('serumCreatinine', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                <Input
                  id="hemoglobin"
                  type="number"
                  step="0.1"
                  value={formData.hemoglobin}
                  onChange={(e) => updateField('hemoglobin', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="bloodUrea">Blood Urea (mg/dL)</Label>
                <Input
                  id="bloodUrea"
                  type="number"
                  value={formData.bloodUrea}
                  onChange={(e) => updateField('bloodUrea', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="specificGravity">Specific Gravity</Label>
                <Input
                  id="specificGravity"
                  type="number"
                  step="0.001"
                  value={formData.specificGravity}
                  onChange={(e) => updateField('specificGravity', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="pcv">Packed Cell Volume (%)</Label>
                <Input
                  id="pcv"
                  type="number"
                  value={formData.packedCellVolume}
                  onChange={(e) => updateField('packedCellVolume', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Clinical History */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">Medical History</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="hypertension">Hypertension</Label>
                <Select value={formData.hypertension} onValueChange={(value) => updateField('hypertension', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="diabetes">Diabetes Mellitus</Label>
                <Select value={formData.diabetesMellitus} onValueChange={(value) => updateField('diabetesMellitus', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="anemia">Anemia</Label>
                <Select value={formData.anemia} onValueChange={(value) => updateField('anemia', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Predict CKD Risk'
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