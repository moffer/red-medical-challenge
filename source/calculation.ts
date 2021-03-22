
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

export function getSolutionWord(text: string) {
    const sentences = splitTextBySentences(text);

    const calculatedSumsPerSentence = sumPerSentence(sentences);
    const tenBiggestValues = sortByNumbersDesc(calculatedSumsPerSentence).slice(0, 10);

    const tenBiggestValuesInOrder = calculatedSumsPerSentence.filter((value) => tenBiggestValues.includes(value));

    const tenBiggestValuesInOrderIndexSubtracted = subtractIndexOfNumberArray(tenBiggestValuesInOrder);
    const solution = convertAsciiToString(tenBiggestValuesInOrderIndexSubtracted);
    return solution;
}

function splitTextBySentences(text: string): string[] {
    return text.split(/\./);
}

function sumPerSentence(sentences: string[]): number[] {
    return sentences.map((sentence) => calculateNumbers(sentence).sumOfNumbers);
}

function sortByNumbersDesc(numberArray: number[]) {
    // Slice to make a copy, not sorting on original array.
    return numberArray.slice().sort((a, b) => b - a);
}

function subtractIndexOfNumberArray(numbers: number[]) {
    return numbers.map((value, index) => value - index);
}

function convertAsciiToString(numbers: number[]) {
    return numbers.map((value) => String.fromCharCode(value)).reduce((prev, char) => prev += char);
}