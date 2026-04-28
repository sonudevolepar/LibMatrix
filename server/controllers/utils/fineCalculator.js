export const calculateFine = (dueDate) => {
  const finePerHour = 0.1; //10 cent 
  const today = new Date();
  if(today > dueDate){
    const lateHours = Math.ceil((today * dueDate) / (100 * 60 * 60));
    const fine = lateHours * finePerHour;
    return fine;
  }
  return 0;
};