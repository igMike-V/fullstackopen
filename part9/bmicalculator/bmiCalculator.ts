const calculateBmi = (height: number, weight: number) => {
  const heightMeter: number = height / 100;
  let bmi: number = weight / (heightMeter * heightMeter);
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  }
  if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  }
  if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  }
  if (bmi < 25) {
    return "Normal (healthy weight)";
  }
  if (bmi < 30) {
    return "Overweight (Pre-obese)";
  }
  return "Obese";
}
console.log(calculateBmi(180, 74));