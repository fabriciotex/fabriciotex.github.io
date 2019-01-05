import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.WindowConstants;
import javax.swing.JOptionPane;

import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;

import java.io.IOException;

/**
 * Program is a simple Hangman game with javax.swing interface.
 *
 * @author      Fabricio Teixeira
 * @version     1.0
 */

public class Hangman {

    private static Guesser guess = null;
    private static int lives = 0;
    private static String word = "";
    private static char[] filler = null;
    private static boolean won = false;

    /**
     * Loads the initial menu and prompts user to Start or Quit the game.
     */
    private static void menu() {
        // creates the frame and UI element objects
        JFrame menuFrame = new JFrame();
        menuFrame.setTitle("Hangman");
        JLabel welcomeLabel = new JLabel("Welcome to Hangman!", SwingConstants.CENTER);

        // sets the size and weight of the welcomeLabel font
        welcomeLabel.setFont(new Font("sans-serif", Font.BOLD, 16));

        JLabel welcomeLabel2 = new JLabel(" Select your option:", SwingConstants.CENTER);
        JButton startButton = new JButton("Start!");
        JButton quitButton = new JButton("Quit");
        GridBagConstraints layoutConst;

        // create a new GridBagLayout and sets to the frame
        menuFrame.setLayout(new GridBagLayout());

        // positions the first label
        layoutConst = new GridBagConstraints();
        layoutConst.fill = GridBagConstraints.HORIZONTAL;
        layoutConst.gridx = 0;
        layoutConst.gridy = 0;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        layoutConst.gridwidth = 2;
        menuFrame.add(welcomeLabel, layoutConst);

        // positions the second label
        layoutConst = new GridBagConstraints();
        layoutConst.fill = GridBagConstraints.HORIZONTAL;
        layoutConst.gridx = 0;
        layoutConst.gridy = 1;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        layoutConst.gridwidth = 2;
        menuFrame.add(welcomeLabel2, layoutConst);

        // positions the start button
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 0;
        layoutConst.gridy = 2;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        menuFrame.add(startButton, layoutConst);

        // calls the game method to start the game
        startButton.addActionListener((ActionEvent e) -> {
            try {
                menuFrame.setVisible(false);
                game();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        });

        // positions the quit button
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 1;
        layoutConst.gridy = 2;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        menuFrame.add(quitButton, layoutConst);

        // closes the window and exits the program on quitButton click
        quitButton.addActionListener(e -> {
            menuFrame.dispose();
            System.exit(0);
        });

        // finished the program when window is closed
        menuFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

        // resize the frame to comport the UI elements
        menuFrame.pack();

        // set frame visible in center of screen
        menuFrame.setLocationRelativeTo(null);
        menuFrame.setVisible(true);
    }

    /**
     * Loads the main game screen with the UI necessary for the game to work.
     */
    private static void game() throws IOException {

        // create the UI element objects
        JFrame gameFrame = new JFrame();
        gameFrame.setTitle("Hangman");

        // create a word loader object to load the word into the game
        WordLoader loader = new WordLoader();
        word = loader.load();

        // create a guesser object to aid on the guessing part of the game
        guess = new Guesser();

        // create the char array that will show the letters that are being guessed
        filler = new char[word.length()];
        for (int i = 0; i < word.length(); i++) {
            filler[i] = '-';
        }

        // set the number of lives(tries) allowed to the user to guess
        lives = 5;

        // set the UI elements
        JLabel wordLabel = new JLabel(new String(filler));
        JLabel livesLabel = new JLabel("Lives: " + lives);
        JLabel guessLabel = new JLabel("Input letter to guess:");
        JTextField guessField = new JTextField(1);
        guessField.setEditable(true);
        guessField.setText("");
        JButton guessButton = new JButton("Guess!");
        JButton giveUpButton = new JButton("Give Up!");
        GridBagConstraints layoutConst;

        // implements the layout on the frame
        gameFrame.setLayout(new GridBagLayout());

        // positions the word to guess
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 0;
        layoutConst.gridy = 0;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        gameFrame.add(wordLabel, layoutConst);

        // positions the lives counter
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 1;
        layoutConst.gridy = 0;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        gameFrame.add(livesLabel, layoutConst);

        // positions the label
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 0;
        layoutConst.gridy = 1;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        gameFrame.add(guessLabel, layoutConst);

        // positions the text field to input letter for guessing
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 1;
        layoutConst.gridy = 1;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        gameFrame.add(guessField, layoutConst);

        // position the guessButton
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 0;
        layoutConst.gridy = 2;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        gameFrame.add(guessButton, layoutConst);
        
        guessField.setText("");

        // start the guessing action
        guessButton.addActionListener(e -> {

            // validate input
            try {
                if (guessField.getText() == null || guessField.getText().equalsIgnoreCase("")) {
                    throw new Exception("You have to input a letter to guess!");
                }

                // sets any uppercase input as lowercase
                guessField.setText(guessField.getText().toLowerCase());


                // sets the Guesser object with the filler array, word and the input letter
                guess.setGuess(filler, word, guessField.getText());
                if (!guess.wasTried()) {
                    if (guess.hasLetter()) {
                        JOptionPane.showMessageDialog(gameFrame, "Good guess!");
                        filler = guess.guessLetter();
                        wordLabel.setText(String.valueOf(filler));
                        if (guess.isRight()) {
                            won = true;
                        }
                    } else {
                        JOptionPane.showMessageDialog(gameFrame, "Nope! Try again!");
                        lives--;
                        livesLabel.setText("Lives: " + lives);
                    }
                } else {
                    JOptionPane.showMessageDialog(gameFrame, "Letter already tried! Try another.");
                }

                // resets the guess text field and focus on it
                guessField.setText("");
                guessField.requestFocus();

                // checks if game was won
                if (won && lives > 0) {
                    JOptionPane.showMessageDialog(gameFrame, "Good job! You've guessed the word \"" + word + "\"!");
                // check if game was lost
                } else if (!won && lives == 0) {
                    JOptionPane.showMessageDialog(gameFrame, "Word was: \"" + word + "\".");
                }

                // if game was finished quits the game frame and calls the menu method
                if (won || lives == 0) {
                    gameFrame.setVisible(false);
                    menu();
                }

            } catch (Exception excptn) {
                JOptionPane.showMessageDialog(gameFrame, excptn.getMessage());
            }

        });


        // positions the giveUpButton
        layoutConst = new GridBagConstraints();
        layoutConst.gridx = 1;
        layoutConst.gridy = 2;
        layoutConst.insets = new Insets(10, 10, 10, 10);
        gameFrame.add(giveUpButton, layoutConst);

        // calls method to show the word and main menu
        giveUpButton.addActionListener(e -> {
            JOptionPane.showMessageDialog(gameFrame, "Word was: \"" + word + "\".");
            gameFrame.setVisible(false);
            menu();
        });

        // sets the enter/return key to perform the guessButton action
        gameFrame.getRootPane().setDefaultButton(guessButton);

        // finished the program when window is closed
        gameFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

        // resize the frame to comport the UI elements
        gameFrame.pack();

        // set frame visible in center of screen
        gameFrame.setLocationRelativeTo(null);
        gameFrame.setVisible(true);
    }

    /**
     * Calls the menu method to initialize the game.
     *
     * @param args command-line arguments
     */
    public static void main(String[] args) throws IOException {
        menu();
    }
}
