#!/bin/bash
for i in *.svg
do
    name=`basename $i .svg`
    convert -background transparent $name.svg $name.png
    optipng -quiet -o7 -strip all $name.png
done
