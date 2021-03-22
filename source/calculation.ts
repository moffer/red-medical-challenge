
/**
 * Calculates all occurences of numbers and all vocals based on a special valence in given text. 
 * @param text Input text
 */
export function calculateNumbers(text: string): { sumOfNumbers: number, vocals: number } {
    const values = { a: 2, e: 4, i: 8, o: 16, u: 32 };

    let sumOfNumbers = 0;
    let vocals = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i)
        if (char.match(/\d/)) {
            sumOfNumbers += Number(char);
        } else if (char.match(/a|e|i|o|u/i)) {
            // Also Uppercase?
            vocals += values[char.toLocaleLowerCase()];
        }
    }
    return { sumOfNumbers, vocals };
}
