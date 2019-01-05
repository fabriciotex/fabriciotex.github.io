<?php
    $title = 'The Bakery';
    $page = 'index';
    include('includes/head.php');
?>

    <section id="home">
        <h2>Welcome to The Bakery</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </section>

    <article class="clearfix">
        <h2>Learn more about The Bakery</h2>
        <div class="row">
            <div class="col3">
                <img src="img/about.jpg" alt="close up on blue, purple, pink and yellow piping bags on table">
                <h3>About Us</h3>
                <p>Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <a href="about.php" class="button">Learn more</a>
            </div>
            <div class="col3">
                <img src="img/menu.jpg" alt="woman standing in front of a counter reading the menu sign">
                <h3>Menu</h3>
                <p>Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <a href="menu.php" class="button">May I have the menu?</a>
            </div>
            <div class="col3">
                <img src="img/recipes.jpg" alt="analogic scale over a kitchen counter">
                <h3>Recipes</h3>
                <p>Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <a href="recipes.php" class="button">I'd like to try making it!</a>
            </div>
        </div>
    </article>

    <aside class="clearfix">
        <div class="row">
            <div class="col2">
                <h3>We really care about our products!</h3>
                <p>Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation:</p>
                <ul>
                    <li>Labore</li>
                    <li>Dolore</li>
                    <li>Aliqua</li>
                    <li>Labore</li>
                    <li>Dolore</li>
                    <li>Aliqua</li>
                </ul>
            </div>
            <div class="col2">
                <img src="img/home.png" alt="strawberry, blackberry, blueberry and raspberry cupcakes seen from above">
            </div>
        </div>
    </aside>

<?php
    include('includes/footer.php');
 ?>
