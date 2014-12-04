<?php

include_once 'fns/get_revisions.php';
$revisions = get_revisions();

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Tap Tempo</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png"'
            .' href="images/icons/16.png?'.$revisions['images/icons/16.png'].'" />'
            .'<link rel="icon" type="image/png" sizes="32x32"'
            .' href="images/icons/32.png?'.$revisions['images/icons/32.png'].'" />'
            .'<link rel="icon" type="image/png" sizes="64x64"'
            .' href="images/icons/64.png?'.$revisions['images/icons/64.png'].'" />'
            .'<link rel="stylesheet" type="text/css" href="index.css?5" />'
        .'</head>'
        .'<body>'
            .'<img id="logoImage"'
            .' src="images/icons/128.png?'.$revisions['images/icons/128.png'].'" />'
            .'<h1>Tap Tempo</h1>'
            .'<div>A metronome app.</div>'
            .'<a class="button" href="run/">Launch</a>'
            .'<button class="button" id="installButton">Install</button>'
            .'<h2>Description</h2>'
            .'<div id="description">'
                .'Tap Tempo is a metronome and an app for measuring time between cycles.'
                .' It can be used for wide variety of occasions such as:'
                .' measuring a heart beat, measuring the tempo of a song,'
                .' measuring the effect interval for guitar effects processors.'
                .' Source code is available on'
                .' <a href="https://github.com/Qliavi/tap-tempo/">GitHub</a>.'
            .'</div>'
            .'<script type="text/javascript" src="index.js"></script>'
        .'</body>'
    .'</html>';
