import { Activity, Brain, Shield } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border shadow-card-custom sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">NephroPredict</h1>
              <p className="text-sm text-muted-foreground">AI-Powered CKD Assessment</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Explainable AI</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};