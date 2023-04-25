interface IsTrainingResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface IsError {
  error: string
}

export interface IsTrainingInput {
  daily_exercises: number[],
  target: number
}

export const calculateExercises = (trainingInput: IsTrainingInput): IsTrainingResult | IsError => {
  const target: number = trainingInput.target;
  if (isNaN(target)) {
    return { error: "malformatted parameters" };
  }
  let errorCheck = false;
  const dailyHours: number[] = trainingInput.daily_exercises.map((dh) => {
    const dayValue = Number(dh);
    if (isNaN(dayValue)) {
      errorCheck = true;
    }
    return dayValue;
  });

  if (errorCheck) {
    return { error: "malformatted parameters" };
  }
  
  const periodLength: number = dailyHours.length;
  
  // Get the total hours of training along with the number of days of training
  const filteredDailyHours: number[] = dailyHours.filter(hour => hour > 0);
  const trainingDays: number = filteredDailyHours.length;
  const totalHours: number = filteredDailyHours.reduce((total, hours) => total + hours, 0);

  const average: number = totalHours / periodLength;

  const getRating = (averageDailyHours: number, target: number): number => {
    // greater then target
    if (averageDailyHours >= target) {
      return 3;
    }
    if (averageDailyHours < (target - target / 3)) {
      return 1;
    }
    return 2;
  };

  const getRatingDescription = (value: number): string => {
    let message = "good";
    if (value === 1) {
      message = "bad";
    }
    if (value === 2) {
      message = "not too bad but could be better";
    }
    return message;
  };

  const rating: number = getRating(average, target);

  const success = average < target ? false : true;

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
};
