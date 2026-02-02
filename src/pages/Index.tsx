import { useState } from "react";
import { Header } from "@/components/Header";
import { ModeSelector, PredictionMode } from "@/components/ModeSelector";
import { RapidScreeningForm, RapidScreeningData } from "@/components/RapidScreeningForm";
import { RapidScreeningResult, RapidResult } from "@/components/RapidScreeningResult";
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
  const [mode, setMode] = useState<PredictionMode>("rapid");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [rapidResult, setRapidResult] = useState<RapidResult | null>(null);
  const [shapValues, setShapValues] = useState<ShapValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Rapid Screening Logic
  const handleRapidSubmit = async (data: RapidScreeningData) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Calculate risk based on core 5 parameters
    let riskScore = 0;
    
    // Serum Creatinine (most important)
    if (data.serumCreatinine > 2.0) riskScore += 40;
    else if (data.serumCreatinine > 1.3) riskScore += 20;
    
    // Hemoglobin (anemia indicator)
    if (data.hemoglobin < 10) riskScore += 25;
    else if (data.hemoglobin < 12) riskScore += 12;
    
    // Blood Pressure
    if (data.bloodPressure > 140) riskScore += 15;
    else if (data.bloodPressure > 130) riskScore += 8;
    
    // Age factor
    if (data.age > 65) riskScore += 10;
    else if (data.age > 50) riskScore += 5;
    
    // Specific Gravity (kidney concentration ability)
    if (data.specificGravity < 1.010) riskScore += 10;
    
    // Determine traffic light status
    let status: "green" | "yellow" | "red";
    let message: string;
    let recommendation: string;
    
    if (riskScore >= 50) {
      status = "red";
      message = "Multiple indicators suggest elevated CKD risk. Your serum creatinine and/or hemoglobin levels are outside normal ranges, which may indicate reduced kidney function.";
      recommendation = "Please schedule an appointment with a nephrologist or your primary care physician as soon as possible. Further diagnostic tests including eGFR calculation and urine albumin testing are recommended.";
    } else if (riskScore >= 25) {
      status = "yellow";
      message = "Some of your values suggest potential kidney stress. While not immediately concerning, these indicators warrant attention and monitoring.";
      recommendation = "Consider scheduling a check-up with your doctor within the next 2-4 weeks. Lifestyle modifications such as reducing sodium intake and staying hydrated may help. A comprehensive analysis can provide more detailed insights.";
    } else {
      status = "green";
      message = "Your core kidney function indicators are within normal ranges. Based on these 5 key parameters, your risk of CKD appears low.";
      recommendation = "Continue maintaining a healthy lifestyle with regular exercise, balanced diet, and adequate hydration. Annual kidney function screening is still recommended, especially if you have diabetes or hypertension.";
    }
    
    setRapidResult({
      status,
      message,
      recommendation,
      confidence: 0.85 + (Math.random() * 0.1) // 85-95% confidence for rapid model
    });
    
    setIsLoading(false);
  };

  // Comprehensive Analysis Logic
  const handlePatientSubmit = async (data: PatientData) => {
    setIsLoading(true);
    setPatientData(data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // More sophisticated mock prediction for comprehensive mode
    const mockPrediction: PredictionResult = {
      probability: 0.75,
      risk_level: "High",
      confidence: 0.89,
      model_used: "XGBoost Ensemble (Full Model)"
    };
    
    const mockShapValues: ShapValues[] = [
      { feature: "Serum Creatinine", value: data.serumCreatinine, impact: "negative", importance: 0.45 },
      { feature: "Hemoglobin", value: data.hemoglobin, impact: "negative", importance: 0.32 },
      { feature: "Blood Urea", value: data.bloodUrea, impact: "negative", importance: 0.28 },
      { feature: "Age", value: data.age, impact: "negative", importance: 0.18 },
      { feature: "Hypertension", value: data.hypertension === "yes" ? 1 : 0, impact: "negative", importance: 0.15 },
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
    setRapidResult(null);
    setShapValues([]);
  };

  const handleModeChange = (newMode: PredictionMode) => {
    setMode(newMode);
    handleReset();
  };

  const handleSwitchToComprehensive = () => {
    setMode("comprehensive");
    setRapidResult(null);
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

      {/* Mode Selector */}
      <div className="container mx-auto px-6 pt-8">
        <ModeSelector mode={mode} onModeChange={handleModeChange} />
      </div>

      {/* Main Application */}
      <main className="container mx-auto px-6 py-8">
        {mode === "rapid" ? (
          /* Rapid Screening Mode */
          <div className={`max-w-xl mx-auto ${rapidResult ? 'grid lg:grid-cols-2 gap-8' : 'flex justify-center'}`}>
            <RapidScreeningForm 
              onSubmit={handleRapidSubmit}
              isLoading={isLoading}
              onReset={handleReset}
            />
            
            {rapidResult && (
              <RapidScreeningResult 
                result={rapidResult}
                onSwitchToComprehensive={handleSwitchToComprehensive}
              />
            )}
          </div>
        ) : (
          /* Comprehensive Analysis Mode */
          <div className={`${predictionResult ? 'grid lg:grid-cols-3 gap-8' : 'flex justify-center max-w-2xl mx-auto'}`}>
            <div className={predictionResult ? 'lg:col-span-1' : 'w-full'}>
              <PatientForm 
                onSubmit={handlePatientSubmit} 
                isLoading={isLoading}
                onReset={handleReset}
              />
            </div>
            
            {predictionResult && (
              <div className="lg:col-span-2 space-y-8">
                <PredictionResults 
                  result={predictionResult}
                  patientData={patientData}
                />

                {patientData && (
                  <HealthMetricsChart patientData={patientData} />
                )}
                
                {shapValues.length > 0 && (
                  <ShapExplanation shapValues={shapValues} />
                )}

                <LifestyleRecommendations riskLevel={predictionResult.risk_level} />
              </div>
            )}
          </div>
        )}

        {/* Additional Sections - Show for both modes when results exist */}
        {(predictionResult || rapidResult) && (
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
