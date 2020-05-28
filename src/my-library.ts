enum ErrorMessages {
  INVALID_NUMBER = 'Number must be greater then 1',
}

// * A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.
const isPrimeNumber = (num: number): boolean | never => {
  let isPrime = true;

  if (num <= 1) {
    throw new Error(ErrorMessages.INVALID_NUMBER);
  }

  if (num === 2) {
    return isPrime;
  }

  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) {
      isPrime = false;
    }
  }

  return isPrime;
};

export { isPrimeNumber, ErrorMessages };
