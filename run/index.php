<?php

$head = '<link rel="stylesheet" type="text/css" href="compressed.css" />';

$body = '<script type="text/javascript" src="compressed.js"></script>';

include_once 'fns/echo_html.php';
echo_html('<html manifest="cache-manifest/">', $head, $body);
