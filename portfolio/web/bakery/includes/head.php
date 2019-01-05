<!DOCTYPE html>
<html lang="en">

    <head>
        <title><?php echo $title; ?></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="dcterms.rightsHolder" content="Name of Copyright Holder" />
        <meta name="dcterms.dateCopyrighted" content="2012" />
        <meta name="description" content="A short description of the page" />
        <meta name="keywords" content="keywords describing this page, most search engines ignore this now due to abuse" />
        <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
        <link href="css/app.css" rel="stylesheet" />
        <?php echo ($page == 'contact') ? '<link href="css/form.css" rel="stylesheet" />' : '' ?>
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
        <link href="rss/feed.xml" rel="alternate" type="application/rss+xml" title="The Bakery RSS Feed">
    </head>

    <body>
        <div id="container">

            <header class="clearfix">
                <img src="img/logo.svg" alt="Logo">
                <h1>The Bakery</h1>
                <nav>
                    <ul>
                        <li><a <?php echo ($page == 'index') ? 'class="active"' : '' ?> href="./">Home</a></li>
                        <li><a <?php echo ($page == 'about') ? 'class="active"' : '' ?> href="about.php">About Us</a></li>
                        <li><a <?php echo ($page == 'menu') ? 'class="active"' : '' ?> href="menu.php">Menu</a></li>
                        <li><a <?php echo ($page == 'recipes') ? 'class="active"' : '' ?> href="recipes.php">Recipes</a></li>
                        <li><a <?php echo ($page == 'contact') ? 'class="active"' : '' ?> href="contact.php">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <main>
