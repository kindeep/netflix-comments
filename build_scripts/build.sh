#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build
    mv build/static/js/main*.js build/static/js/main.js
    mkdir -p dist
    cp -r build/* dist

    mv dist/index.html dist/popup.html
}

build