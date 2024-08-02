const ageCalculate = () => {
    const today = new Date();
    const inputDate = new Date(document.getElementById("date-input").value);
    
    if(inputDate == "Invalid Date"){
        alert("Please enter your age");
        return;
    }
    const birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
    };
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
  
    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {

      alert("Not Born Yet");

      return;
    }
  
    const { years, months, days } = calculateAge(
      birthDetails,
      currentYear,
      currentMonth,
      currentDate
    );
  
    displayResult(days, months, years);
  };
  
  const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
      birthDetails.year > currentYear ||
      (birthDetails.year === currentYear &&
        (birthDetails.month > currentMonth ||
          (birthDetails.month === currentMonth &&
            birthDetails.date > currentDate)))
    );
  };
  
  const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
   
    let years = currentYear - birthDetails.year;
    let months, days;
  
    if (currentMonth < birthDetails.month) {
      years--;
      months = 12 - (birthDetails.month - currentMonth);
    } else {
      months = currentMonth - birthDetails.month;
    }
  
    if (currentDate < birthDetails.date) {
      months--;
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
      days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
      days = currentDate - birthDetails.date;
    }
    return { years, months, days };
  };
  
  const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const getDaysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return getDaysInMonth[month - 1];
  };
  
  const displayResult = (bdate, bMonth, bYear) => {
    // document.getElementById("years").textContent = bYear;
    // document.getElementById("months").textContent = bMonth;
    // document.getElementById("days").textContent = bdate;

    counter("years", 0, bYear, 1500);
    counter("months", 0, bMonth, 1500);
    counter("days", 0, bdate, 1500);
  };

  function counter(id, start, end, duration) {
    let obj = document.getElementById(id),
     current = start,
     range = end - start,
     increment = end > start ? 1 : -1,
    
     step = range !== 0 ? Math.abs(Math.floor(duration / range)) : duration;
    
     timer = setInterval(() => {
      current += increment;
      obj.textContent = current;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        clearInterval(timer);
        obj.textContent = end; // Ensure the final value is set correctly
        }
    }, step);
   }
  document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);