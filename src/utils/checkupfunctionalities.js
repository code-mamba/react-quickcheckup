export const calculateBp = (systolic, diastolic)=> {


  switch (true) {
      case (systolic < 120 && diastolic < 80):
          return 'Normal';
  
      case (systolic >= 120 && systolic <= 129 && diastolic < 80):
          return 'Elevated';
      
      case ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)):
          return 'Hypertension Stage 1';
     
      case (systolic >= 140 || diastolic >= 90):
          return 'Hypertension Stage 2';
        
      default:
          return 'Hypertensive Crisis';
  }

  
}
  export const calculateBodyTemperature = (fahrenheit) => {
    switch (true) {
      case fahrenheit <= 95:
        return 'Low (Hypothermia)';
      case fahrenheit >= 95.1 && fahrenheit <= 96.9:
        return 'Low-normal';
      case fahrenheit >= 98.6 && fahrenheit <= 100.4:
        return 'Normal-low grade fever';
      case fahrenheit > 100.4 && fahrenheit <= 103:
        return 'Fever';
      case fahrenheit > 103:
        return 'High fever';
      default:
        return 'Invalid input';
    }
  };
  