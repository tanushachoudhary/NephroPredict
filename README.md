# NephroPredict

**AI-Powered Chronic Kidney Disease Assessment**

NephroPredict is an advanced machine learning application designed to predict and assess the risk of Chronic Kidney Disease (CKD) using clinical parameters and laboratory values. The application provides explainable AI insights to support clinical decision-making.

## Features

### Dual Assessment Modes

**🔍 Rapid Screening Mode**
- Quick assessment using 5 key predictive indicators
- Traffic light risk system (Green/Yellow/Red)
- Instant results with confidence scores
- Ideal for initial screening and triage

**🩺 Comprehensive Analysis Mode (Doctor Mode)**
- Full medical history and laboratory values analysis
- XGBoost ensemble model predictions
- SHAP (SHapley Additive exPlanations) value visualization
- Detailed risk assessment with confidence metrics
- Health metrics visualization charts

### Key Capabilities
- Real-time risk prediction
- Explainable AI with SHAP values
- Interactive health metrics charts
- Personalized lifestyle recommendations
- Nearby doctor/specialist locator
- Health tips and educational content
- HIPAA-compliant design considerations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone https://github.com/tanushachoudhary/NephroPredict.git

# Navigate to the project directory
cd NephroPredict

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Technology Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn-ui
- **Charts:** Recharts
- **State Management:** React Hooks
- **Routing:** React Router
- **Icons:** Lucide React

## Project Structure

```
NephroPredict/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn-ui components
│   │   ├── Header.tsx
│   │   ├── ModeSelector.tsx
│   │   ├── PatientForm.tsx
│   │   ├── RapidScreeningForm.tsx
│   │   ├── PredictionResults.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   └── Index.tsx
│   ├── lib/              # Utility functions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
└── package.json
```

## Usage

### Rapid Screening
1. Select "Rapid Screening" mode
2. Enter 5 key health parameters (age, blood pressure, serum creatinine, hemoglobin, specific gravity)
3. Click "Quick Screen" to get instant risk assessment
4. Review the traffic light result and recommendations

### Comprehensive Analysis
1. Select "Doctor Mode"
2. Fill in complete patient assessment form with all clinical parameters
3. Submit for detailed analysis
4. Review prediction results, SHAP explanations, and health metrics
5. Access personalized lifestyle recommendations

## Building for Production

```sh
npm run build
```

The production-ready files will be generated in the `dist` directory.
