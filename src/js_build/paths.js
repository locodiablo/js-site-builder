// const imagesDirBrand = "/assets/images/brand/";

//const definitionsDir = "src/js_build/page_definitions";


// const navTreeSplit = {
//   directory: function(data){
//     console.log('data.path A',data.path)
//     const thisPageUrl = data.path.replace("src/js_build/","")
//     let pageData = require(`./src/${thisPageUrl}/index.js`)
//     data.pageData = {
//       description: pageData.head.description,
//       text: pageData.config.nav_text,
//       href: data.path.replace(definitionsDir,'')
//     }
//     data.children.map(dataChild =>{
//       let ifFile = (dataChild.type == 'file') ? '' : '/index.js'
//       let childData = require(`../../../${dataChild.path}${ifFile}`)
//       dataChild.pageData = {
//         description: 'child desc',
//         text: childData.config.nav_text
//       }
//       navTreeSplit[dataChild.type](dataChild)
//     }).join("")
//
//   },
//   file: function(data){
//     //console.log(`file: ${data.name}`)
//   }
// }
// menuData.map((eachItem,index) => navTreeSplit[eachItem.type](eachItem)).join("")


const paths = {
  src: "./src",
  publicDir: "./public",
  templatesDir: "../src/js_build/templates",
  definitionsDir: "src/js_build/page_definitions",
  imagesDir: "./src/assets/images",
  urlHome: "/"
}

module.exports = paths;
