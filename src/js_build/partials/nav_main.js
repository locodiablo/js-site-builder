//const vars = require("../vars.js");
const defaults = require("../defaults.js");
const paths = require("../paths.js");
const nav_breadcrumb = require("../partials/nav_breadcrumb.js");
const dirTree = require("directory-tree");
const menuData = dirTree(`./${paths.definitionsDir}`, { extensions:/\.js/,exclude: /404.js/ }).children;

const navTreeSplit = {
  directory: function(data){
    data.children.map(dataChild =>{
      navTreeSplit[dataChild.type](dataChild)
    }).join("")
  },
  file: function(data){
    //console.log(`file: ${data.name}`)
  }
}

const navOutputSplit = {
  directory: function(incomingLinkData){
    const navUrl = incomingLinkData.data.path.replace(paths.definitionsDir,"")
    incomingLinkData.data.children.length > 1 ? incomingLinkData.exploreClass = 'j-t-menu ' : ''
    return `
    <div class="nav-item nav-dir nav-item-${incomingLinkData.thisLinkCount}">
      <a class="nav-link ${incomingLinkData.exploreClass}" data-my-menu="${incomingLinkData.thisLinkCount}" href="${navUrl}">
        ${incomingLinkData.data.pageData.text}
      </a>
    </div>
    `
    incomingLinkData.children.map(dataChild =>{
      navOutputSplit[dataChild.type](dataChild)
    }).join("")

  },
  file: function(incomingLinkData){
    //console.log(`file: ${incomingLinkData.data.path}`)
  }
}

menuData.map((eachItem,index) => navTreeSplit[eachItem.type](eachItem)).join("")

function navbar(data,incomingMenuData){return `
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container p-0">
      <a class="navbar-brand" href="${paths.urlHome}">${defaults.site_name_full}</a>

      <span class="navbar-toggler j-main-menu" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="${paths.urlHome}">Home <span class="sr-only">(current)</span></a>
          </li>
          ${incomingMenuData.map((navItem,index) => {
            let linkData = {
              data: navItem,
              thisLinkCount: index
            }
            return navOutputSplit[navItem.type](linkData)
          }).join("")}
        </ul>

      </div>
    </div>
  </nav>
  ${nav_breadcrumb(data)}
`};

module.exports = navbar;
