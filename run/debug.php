<?php

$head =
    '<link rel="stylesheet" type="text/css" href="js/Main.css" />'
    .'<link rel="stylesheet" type="text/css" href="js/Blink.css" />'
    .'<link rel="stylesheet" type="text/css" href="js/Field.css" />'
    .'<link rel="stylesheet" type="text/css" href="js/MainPanel.css" />'
    .'<link rel="stylesheet" type="text/css" href="js/MuteButton.css" />'
    .'<link rel="stylesheet" type="text/css" href="js/TapButton.css" />';

$body =
    '<script type="text/javascript" src="js/Blink.js"></script>'
    .'<script type="text/javascript" src="js/Field.js"></script>'
    .'<script type="text/javascript" src="js/Div.js"></script>'
    .'<script type="text/javascript" src="js/MainPanel.js"></script>'
    .'<script type="text/javascript" src="js/MuteButton.js"></script>'
    .'<script type="text/javascript" src="js/TapButton.js"></script>'
    .'<script type="text/javascript" src="js/TextNode.js"></script>'
    .'<script type="text/javascript" src="js/Main.js"></script>';

include_once 'fns/echo_html.php';
echo_html('<html>', $head, $body);
