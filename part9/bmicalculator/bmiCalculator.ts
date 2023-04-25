
export const calculateBmi = (height: number, weight:number) => {

  if (isNaN(height) || isNaN(weight)) { 
    return {
      error: "malformatted parameters"
    }    
  }

  const heightMeter: number = height / 100;
  let bmi: number = weight / (heightMeter * heightMeter);
  let message: string = "Obese";
  if (bmi < 16) {
    message = "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    message =  "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    message =  "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    message =  "Normal (healthy weight)";
  } else if (bmi < 30) {
    message =  "Overweight";
  }

  return {
    weight,
    height,
    bmi: message
  }

}


