import { useState } from "react";
import { Header } from "@/components/Header";
import { PatientForm } from "@/components/PatientForm";
import { PredictionResults } from "@/components/PredictionResults";
import { ShapExplanation } from "@/components/ShapExplanation";
import { HealthMetricsChart } from "@/components/HealthMetricsChart";
import { NearbyDoctors } from "@/components/NearbyDoctors";
import { LifestyleRecommendations } from "@/components/LifestyleRecommendations";
import { HealthTips } from "@/components/HealthTips";
import heroImage from "@/assets/medical-hero.jpg";

export interface PatientData {
  age: number;
  bloodPressure: number;
  specificGravity: number;
  albumin: number;
  sugar: number;
  redBloodCells: string;
  pusCell: string;
  pusCellClumps: string;
  bacteria: string;
  bloodGlucoseRandom: number;
  bloodUrea: number;
  serumCreatinine: number;
  sodium: number;
  potassium: number;
  hemoglobin: number;
  packedCellVolume: number;
  whiteBloodCellCount: number;
  redBloodCellCount: number;
  hypertension: string;
  diabetesMellitus: string;
  coronaryArteryDisease: string;
  appetite: string;
  pedalEdema: string;
  anemia: string;
}

export interface PredictionResult {
  probability: number;
  risk_level: "Low" | "Moderate" | "High";
  confidence: number;
  model_used: string;
}

export interface ShapValues {
  feature: string;
  value: number;
  impact: "positive" | "negative";
  importance: number;
}

const Index = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [shapValues, setShapValues] = useState<ShapValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePatientSubmit = async (data: PatientData) => {
    setIsLoading(true);
    setPatientData(data);
    
    // Simulate API call to ML model
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction result
    const mockPrediction: PredictionResult = {
      probability: 0.75,
      risk_level: "High",
      confidence: 0.89,
      model_used: "XGBoost Ensemble"
    };
    
    // Mock SHAP values
    const mockShapValues: ShapValues[] = [
      { feature: "Serum Creatinine", value: 2.1, impact: "negative", importance: 0.45 },
      { feature: "Hemoglobin", value: 8.2, impact: "negative", importance: 0.32 },
      { feature: "Blood Urea", value: 85, impact: "negative", importance: 0.28 },
      { feature: "Age", value: data.age, impact: "negative", importance: 0.18 },
      { feature: "Hypertension", value: 1, impact: "negative", importance: 0.15 },
      { feature: "Albumin", value: data.albumin, impact: "negative", importance: 0.12 },
      { feature: "Specific Gravity", value: data.specificGravity, impact: "positive", importance: 0.08 },
      { feature: "Packed Cell Volume", value: data.packedCellVolume, impact: "positive", importance: 0.06 }
    ];
    
    setPredictionResult(mockPrediction);
    setShapValues(mockShapValues);
    setIsLoading(false);
  };

  const handleReset = () => {
    setPatientData(null);
    setPredictionResult(null);
    setShapValues([]);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Medical AI Dashboard" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            NephroPredict
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Advanced Machine Learning for Chronic Kidney Disease Prediction with 
            Explainable AI to support clinical decision-making
          </p>
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto shadow-medical">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>XGBoost ML Model</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>  
                <span>SHAP Explanations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Clinical Validated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient Data Input */}
          <div className="lg:col-span-1">
            <PatientForm 
              onSubmit={handlePatientSubmit} 
              isLoading={isLoading}
              onReset={handleReset}
            />
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {predictionResult && (
              <PredictionResults 
                result={predictionResult}
                patientData={patientData}
              />
            )}

            {patientData && (
              <HealthMetricsChart patientData={patientData} />
            )}
            
            {shapValues.length > 0 && (
              <ShapExplanation shapValues={shapValues} />
            )}

            {predictionResult && (
              <LifestyleRecommendations riskLevel={predictionResult.risk_level} />
            )}
          </div>
        </div>

        {/* Additional Sections */}
        {predictionResult && (
          <div className="mt-12 space-y-8">
            <NearbyDoctors />
            <HealthTips />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;