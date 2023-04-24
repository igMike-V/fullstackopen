interface IsTrainingResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (dailyHours: number[], target: number): IsTrainingResult  => {
  
  const periodLength: number = dailyHours.length;
  
  // Get the total hours of training along with the number of days of training
  let totalHours: number = 0;
  const trainingDays: number = dailyHours.reduce((count: number, hours: number) => {
    if (hours > 0) {
      totalHours = totalHours + hours;
      return count + 1;
    }
    return count;
  }, 0);

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))