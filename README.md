# Introdunction
JavaScript based website builder, generating HTML files from:

- Source files
- Templates
- Data

## Build
1. Content is defined by an object exported from each ```index.js``` file in the ```/src/js_build/page_definitions/``` directory, for example:
```
const page_content = {
        config: {
                html_template: "template_page_jumbotron",
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

2. Final output is served from the ```/public``` folder to localhost set in package file.

## Navigation
- Navigation builds dynamically from ```index.js``` files in ```/src/js_build/page_definitions/```.
- Web directory navigation based on a ```Bootstrap carousel``` rather than 'dropdowns'.

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
