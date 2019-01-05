import java.util.ArrayList;

/**
 * This class is responsible for comparing the user input to check if is
 * present into the word, returning booleans and the position in the char
 * array made from the word.
 *
 * @author      Fabricio Teixeira
 * @version     1.0
 */

class Guesser {
    // declare the objects
    private char[] filler = null;
    private String word = "";
    private char input = '?';
    private ArrayList<Character> tried = new ArrayList<>();

    // initialize the objects
    void setGuess(char[] filler, String word, String input) {
        this.filler = filler;
        this.word = word;
        this.input = input.charAt(0);
    }

    // check if word has letter
    boolean hasLetter() {
        return word.contains(input + "");
    }

    // find letter in word and set its position into the char array
    char[] guessLetter() {
        // find letter in word
        for (int i = 0; i < word.length(); i++) {
            if (word.charAt(i) == input) {
                filler[i] = input;
            }
        }
        return filler;
    }

    // check if letter has already been tried before
    boolean wasTried() {
        boolean bool;
        bool = tried.contains(input);
        tried.add(input);
        return bool;
    }

    // check if the word was guessed
    boolean isRight() {
        String toCompare = "";
        for (char c : filler) {
            toCompare += c;
        }
        return toCompare.equals(word);
    }
}