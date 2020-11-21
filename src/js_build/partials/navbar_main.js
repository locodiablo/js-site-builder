const vars = require("../vars.js");
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
      <a class="nav-item-link ${incomingLinkData.exploreClass}" data-my-menu="${incomingLinkData.thisLinkCount}" href="${navUrl}">
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
const url_home = "/form.html";

function navbar(data,incomingMenuData){return `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="${url_home}">${vars.site_name_full}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="${url_home}">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>

  <div class="nav-main-wrapper" style="display: none">

    <div class="nav-main-container container">

      <div class="nav-item nav-explore">
        <span class="nav-item-link j-main-menu">
          <i class="nav-fas fas fa-bars"></i>
        </span>
      </div>

      <a href="${url_home}" class="nav-item nav-logo">
        Home
      </a>

      <div class="nav-item nav-site-caption d-none">
        <div class="nav-item-link">
          ${vars.site_name_full}
        </div>
      </div>

      <div class="nav-main" id="nav-main-top">
        ${incomingMenuData.map((navItem,index) => {
          let linkData = {
            data: navItem,
            thisLinkCount: index
          }
          return navOutputSplit[navItem.type](linkData)
        }).join("")}
      </div>

    </div>
    ${nav_breadcrumb(data)}

  </div>
`};

module.exports = navbar;
