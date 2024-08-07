/**
 * @returns generates a six digit number
 */
export const generateRandomCode = (): number => {
    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return randomNumber
}