<?php

header('Content-Type: text/cache-manifest');

include_once '../fns/get_run_revisions.php';
$revisions = get_run_revisions();

echo
    "CACHE MANIFEST\n"
    .'../compressed.css?'.$revisions['compressed.css']."\n"
    .'../compressed.js?'.$revisions['compressed.js']."\n"
    ."../pulse.ogg\n";
