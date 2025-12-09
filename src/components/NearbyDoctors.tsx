import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Clock, Stethoscope } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialty: "Nephrologist",
    hospital: "City Medical Center",
    distance: "0.8 miles",
    rating: 4.9,
    reviews: 248,
    available: true,
    phone: "+1 (555) 123-4567",
    nextAvailable: "Today, 3:00 PM",
    image: "SM"
  },
  {
    id: 2,
    name: "Dr. James Chen",
    specialty: "Nephrology & Internal Medicine",
    hospital: "University Hospital",
    distance: "1.2 miles",
    rating: 4.8,
    reviews: 312,
    available: true,
    phone: "+1 (555) 234-5678",
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "JC"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Kidney Transplant Specialist",
    hospital: "Regional Kidney Center",
    distance: "2.5 miles",
    rating: 4.9,
    reviews: 189,
    available: false,
    phone: "+1 (555) 345-6789",
    nextAvailable: "Wed, 2:00 PM",
    image: "ER"
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    specialty: "Nephrologist",
    hospital: "HealthFirst Clinic",
    distance: "3.1 miles",
    rating: 4.7,
    reviews: 156,
    available: true,
    phone: "+1 (555) 456-7890",
    nextAvailable: "Today, 5:30 PM",
    image: "MT"
  }
];

export const NearbyDoctors = () => {
  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Stethoscope className="w-4 h-4 text-primary" />
          </div>
          <span>Recommended Nephrologists Nearby</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-muted/30 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold">
                    {doctor.image}
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground truncate">{doctor.name}</h4>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <Badge 
                      variant={doctor.available ? "default" : "secondary"}
                      className={doctor.available ? "bg-success/20 text-success border-success/30" : ""}
                    >
                      {doctor.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Next: {doctor.nextAvailable}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" className="flex-1">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
