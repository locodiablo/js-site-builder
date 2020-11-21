const dochead = require("../partials/head");
const navbar_main = require("../partials/navbar_main");
const footer = require("../partials/footer");
const paths = require("../paths.js");
const dirTree = require("directory-tree");
let menuData = dirTree(`./${paths.definitionsDir}`, { extensions:/\.js/,exclude: /404.js/ }).children;

const navTreeSplit = {
  directory: function(data){
    let pageData = require(`../../../${data.path}/index.js`)
    data.pageData = {
      description: pageData.head.description,
      text: pageData.config.nav_text,
      href: data.path.replace(paths.definitionsDir,'')
    }
    data.children.map(dataChild =>{
      let ifFile = (dataChild.type == 'file') ? '' : '/index.js'
      let childData = require(`../../../${dataChild.path}${ifFile}`)
      dataChild.pageData = {
        description: 'child desc',
        text: childData.config.nav_text
      }
      navTreeSplit[dataChild.type](dataChild)
    }).join("")

  },
  file: function(data){
    //console.log(`file: ${data.name}`)
  }
}
menuData.map((eachItem,index) => navTreeSplit[eachItem.type](eachItem)).join("")

function template_home(data){
return `
${dochead(data)}
<body class="page-basic ${data.config.body_class ? data.config.body_class : ''}" data-tpb="${data.pageContentUrl}">
  ${navbar_main(data,menuData)}
  <div class="container content">${data.body}</div>
  ${footer(data)}
  <script>
    const menuData = ${JSON.stringify(menuData)}
  </script>
  ${data.scripts ? data.scripts : ''}
  <script charset="utf-8" src="/assets/js/bundle.js?${Date.now()}"></script>
</body>
</html>
`}
module.exports = template_home;
