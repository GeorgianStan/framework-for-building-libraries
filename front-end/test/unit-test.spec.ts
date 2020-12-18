import { isPrimeNumber, ErrorMessages } from '../src/my-library';

describe('Demo test', () => {
  it('Should detect prime numbers', () => {
    expect(isPrimeNumber(2)).toBeTruthy();
    expect(isPrimeNumber(3)).toBeTruthy();
    expect(isPrimeNumber(5)).toBeTruthy();
    expect(isPrimeNumber(7)).toBeTruthy();
    expect(isPrimeNumber(11)).toBeTruthy();

    expect(isPrimeNumber(4)).toBeFalsy();
    expect(isPrimeNumber(6)).toBeFalsy();
    expect(isPrimeNumber(9)).toBeFalsy();
    expect(isPrimeNumber(16)).toBeFalsy();
  });

  it('Should throw error for values < 2', () => {
    expect(() => isPrimeNumber(1)).toThrowError(ErrorMessages.INVALID_NUMBER);
    expect(() => isPrimeNumber(0)).toThrowError(ErrorMessages.INVALID_NUMBER);
    expect(() => isPrimeNumber(-1)).toThrowError(ErrorMessages.INVALID_NUMBER);

    expect(() => isPrimeNumber(Math.max())).toThrowError(
      ErrorMessages.INVALID_NUMBER,
    );
  });
});
