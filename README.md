# Shopify Origin Theme
A basic barebones starting point for Shopify custom theme development with opinionated utilities used by Solver Collective.

Prepared by [Solver Collective](https://www.solvercollective.com)

## Features
- All required template files for use with Shopify (please note, Shopify will not support files outside of this scaffold)
- Improved solution to the problem with Shopify not allowing sub-directories within the /assets directory
- Development tools: 
- Gulp for local asset processing and task running
- Browserstack for local development automatice page reloading
- Shopify ThemeKit for theme deployment and updates 
- JavaScript in ES6 (using Babel)
- Bootstrap 4 (so we can all agree about grid and utility classes)

## Requirements
- Node.js v8.x++
- NPM or Yarn
- Gulp
- Shopify Theme Kit - [Installation Guide](https://shopify.github.io/themekit/#installation)



## Instructions
1. Clone this repo to your computer using your favorite shell application
2. In Terminal cd into the `/_dev` directory and install the Gulp packages (if you haven’t already installed Gulp, you’ll need to do so first):
3. `npm install` or `yarn install` if you have Yarn installed on your computer.
4. Once you have installed the packages, in Terminal, update `/_dev/Gulpfile.js`
5. Update proxy: { target: 'hhttps://your-brand-store.myshopify.com' }
7. Clone and Update (follow instruction of Theme Kit Installation Guide in the link above) the Theme Kit Config File `/_dev/config_sample.yml` -> rename to: `config.yml`
8. When you are ready for active development using Theme Kit run: `theme watch --notify=_dev/shopify-ping.tmp`
9. Run `gulp watch` -> Browsersync will open a Browser Window with local URL that provides auto refreshing

Please note: If you are attempting to upload assets from a new `_DEV` subfolder -> you may need to stop Gulp and run `gulp local` to process all the new assets into the root level `/assets` folder.

## Branches
- master (opinionated markup for good starting point on Solver Collective themes)
- barebones (almost zero markup - mainly used for scaffold and Developer notes - a clean start)
- brand (staging branch for master)