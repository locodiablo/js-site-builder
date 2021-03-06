# Introduction
JavaScript based website builder, generating HTML files from:

- Source JS files
- JS Templates
- JS and JSON Data

*Navigation* uses Bootstrap carousel modal to enable nested exploration on all screen sizes

## Build
1. Content is defined by an object exported from each ```index.js``` file in the ```/src/js_build/page_definitions/``` directory, for example:
```
const page_content = {
        config: {
                html_template: "template_page_master",
                nav_text: "Contact",
                body_class: "optional-class-here another-test-class"
        },
        head:{
                title: "A most wonderous readme page",
                description: "Guidance on the magic of JavaScript and this site.",
        },
        body:[
                "Body content here",
                "More body content"
        ]
}
```
2. Each new **page** config file should be a **directory** with **js** file within, i.e: ```/my-ace-page-name/index.js```.

3. Final output is served from the ```/public``` folder to localhost **port** set in the package file.

## Navigation
- Navigation builds dynamically from ```index.js``` files in ```/src/js_build/page_definitions/```.
- Web directory navigation is based on a ```Bootstrap carousel``` rather than 'dropdowns'.

## Carousels
Mobile-friendly swipe sensitivity is set globally in ```/src/js_build/functions.js```

## Installation
> Make sure you're running node > v8

1. ```npm install```
2. ```npm run build```
3. Separate terminal: ```npm run serve```

### Resources
- https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
- https://tinypng.com/
- https://www.w3.org/TR/css-page-3/#page-context
- https://fontawesome.com/v4.7.0/cheatsheet/
