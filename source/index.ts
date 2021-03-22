import { readFileSync } from 'fs';
import { calculateNumbers, getSolutionWord } from './calculation';
import Server from './server';


console.log("Here we go!");

// Sadly, decryption does not work, because it can not validate the data (Unsupported state or unable to authenticate data)
// My guess is, that reading from files into buffers has some problems with encoding.
// require('./encryption');

const numberFile = readFileSync('./clear_smaller.txt');
const text = numberFile.toString();

const {sumOfNumbers, vocals: calculatedVocals} = calculateNumbers(text);
console.log(`Aufgabe 2) Summe: ${sumOfNumbers}`)
console.log(`Aufgabe 3) Summe Vokale: ${sumOfNumbers + calculatedVocals}`)

const solutionWord = getSolutionWord(text);

new Server(solutionWord);
