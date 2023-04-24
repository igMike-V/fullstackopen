const consoleArguments: string[] = process.argv.slice(2)
const calculateBmi = (args: string[]) => {
    
  if (args.length < 2) throw new Error('Not enough arguments, please only provide height in cm and weight in kg');
  if (args.length > 2) throw new Error('Too many arguments, please only provide height in cm and weight in kg');
  //height: number, weight: number
  const height: number = Number(args[0]);
  const weight: number = Number(args[1]);
  if (isNaN(height) || isNaN(weight)) { 
    throw new Error('First argument was not a number');      
  }

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
    return "Overweight";
  }
  return "Obese";
}
console.log(calculateBmi(consoleArguments));