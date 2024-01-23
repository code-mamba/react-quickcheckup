export const calculateBp = (systolic, diastolic) => {
    switch (true) {
      case systolic <= 90 && diastolic <= 60:
        return 'Low';
      case systolic <= 120 && diastolic <= 80:
        return 'Normal';
      case (systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89):
        return 'High';
      case systolic >= 140 || diastolic >= 90:
        return 'High(stage-2)';
      case systolic >= 180 || diastolic >= 120:
        return 'Hypertensive crisis';
      default:
        return 'Invalid input';
    }
  };
  