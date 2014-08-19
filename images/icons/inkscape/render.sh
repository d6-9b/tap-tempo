#!/bin/bash
cd `dirname $BASH_SOURCE`
for i in *.svg
do
    inkscape --export-plain-svg=../$i $i
done
