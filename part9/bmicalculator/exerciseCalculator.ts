interface IsTrainingResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const args: string[] = process.argv.slice(2)

const calculateExercises = (args: string[]): IsTrainingResult  => {

  if (args.length < 2) throw new Error('Not enough arguments, First argument should be the target hours per day, followed by x days of hours');
  
  const target: number = Number(args.shift());
  if (isNaN(target)) { 
    throw new Error('First argument was not a number');      
  }

  const dailyHours: number[] = args.map((dh, index) => {
    const dayValue = Number(dh);
    if (isNaN(dayValue)) { 
      throw new Error(`Argument in position ${index + 1}, is not a number`);      
    }
    return dayValue;
  })
  
  const periodLength: number = dailyHours.length;
  
  // Get the total hours of training along with the number of days of training
  const filteredDailyHours: number[]  = dailyHours.filter(hour => hour > 0);
  const trainingDays: number = filteredDailyHours.length;
  const totalHours: number = filteredDailyHours.reduce((total, hours) => total + hours, 0)

  const average: number = totalHours / periodLength;

  const getRating = (averageDailyHours: number, target: number): number => {

    // greater then target
    if (averageDailyHours >= target) {
      return 3;
    }
    if (averageDailyHours < (target - target / 3)) {
      return 1
    }
    return 2
  }

  const getRatingDescription = (value: number): string => {
    let message = "Amazing you met your target!";
    if (value === 1) {
      message = "not great, lets get a couple more hours in next time.";
    }
    if (value === 2) {
      message = "not too bad but could be better";
    }
    return message;
  }

  const rating: number = getRating(average, target);

  let success = average < target ? false : true;

  const trainingResult: IsTrainingResult = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average
  };

  return trainingResult;
}

console.log(calculateExercises(args))