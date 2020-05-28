declare enum ErrorMessages {
    INVALID_NUMBER = "Number must be greater then 1"
}
declare const isPrimeNumber: (num: number) => boolean | never;
export { isPrimeNumber, ErrorMessages };
