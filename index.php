<?php

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Tap Tempo</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png" href="images/icons/16.png" />'
            .'<link rel="icon" type="image/png" href="images/icons/32.png" sizes="32x32" />'
            .'<link rel="stylesheet" type="text/css" href="index.css?4" />'
        .'</head>'
        .'<body>'
            .'<img id="logoImage" src="images/icons/128.png" />'
            .'<h1>Tap Tempo</h1>'
            .'<div>A time interval measuring app.</div>'
            .'<a class="button" href="run/">Launch</a>'
            .'<button class="button" id="installButton">Install</button>'
            .'<h2>Description</h2>'
            .'<div id="description">'
            .'</div>'
            .'<script type="text/javascript" src="index.js"></script>'
        .'</body>'
    .'</html>';
