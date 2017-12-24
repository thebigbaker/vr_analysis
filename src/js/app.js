// Listen for submit
document.getElementById('vr-form').addEventListener('submit', calculateResults)

//Hide Results
document.getElementById('results').style.display = 'none';


// Calculate results
function calculateResults(e) {
  // UI Variables
  const price = document.getElementById('price');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  
  // Expenses 
  const hoa = document.getElementById('hoa');
  const tax = document.getElementById('tax');
  const insurance = document.getElementById('insurance');
  const utilities = document.getElementById('utilities');
  /*const pm = document.getElementById('pm');*/

  // Income
  const highRate = document.getElementById('high-rate');
  const baseRate = document.getElementById('base-rate');

  // Results Variables
  const downPayment = document.getElementById('down-payment');
  const loanAmount = document.getElementById('loan-amount');
  const mortgagePayment = document.getElementById('mortgage-payment');
  const totalExpenses = document.getElementById('total-expenses');
  const seventyPercent = document.getElementById('seventy-percent');
  const eightyPercent = document.getElementById('eighty-percent');
  const ninetyPercent = document.getElementById('ninety-percent');

  // Calculate Down Payment
  downPayment.value = parseFloat(price.value) * 0.25;

  // Calculate Loan Amount
  principal = parseFloat(price.value) * 0.75;
  loanAmount.value = principal;

  // Calculate Mortgage Payment
  /*const principal = parseFloat(price.value);*/
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);

  // Calculate Total Expenses
  const expenses = parseFloat(hoa.value) + parseFloat(tax.value) + parseFloat(insurance.value) + parseFloat(utilities.value) + monthly

  // Calculate Income Amounts
  const highAmount = parseFloat(highRate.value) * 105;
  const baseAmount = parseFloat(baseRate.value) * 260;
  const totalMonthlyAmount = parseFloat((highAmount + baseAmount) / 12);

  if(isFinite(monthly)) {
    mortgagePayment.value = monthly.toFixed(2);
    totalExpenses.value = expenses.toFixed(2);

    seventyPercent.value = (totalMonthlyAmount * 0.70).toFixed(2)
    eightyPercent.value = (totalMonthlyAmount * 0.80).toFixed(2)
    ninetyPercent.value = (totalMonthlyAmount * 0.90).toFixed(2)
    
    //Show results
      document.getElementById('results').style.display = 'block';
    /*console.log((ninetyPercent.value).toLocaleString('en'));*/
    } else {
      showError('Please check your numbers');
    }
    e.preventDefault();
};

//Show Error
function showError(error) {
  //Hide results
  document.getElementById('results').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
};

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
};

// Print results
document.getElementById('print').addEventListener('click', printPage);

function printPage(e) {
  window.print();
}


