const vars = require("../vars.js");
const paths = require("../paths.js");
const nav_breadcrumb = require("../partials/nav_breadcrumb.js");
const dirTree = require("directory-tree");
const menuData = require("../menu_data.js");

// const navOutputSplitORIGINAL = {
//   directory: function(incomingLinkData){
//     const navUrl = incomingLinkData.data.path.replace(paths.definitionsDir,"")
//     incomingLinkData.data.children.length > 1 ? incomingLinkData.exploreClass = vars.css_class_nav_with_children : ''
//     return `
//     <li class="nav-item nav-dir got-child nav-item-${incomingLinkData.thisLinkCount}">
//       <a class="nav-link ${incomingLinkData.exploreClass}" data-my-menu="${incomingLinkData.thisLinkCount}" href="${navUrl}">
//         ${incomingLinkData.data.pageData.text}
//       </a>
//       <ul>
//       ${navOutputSplit[incomingLinkData.data.children]}
//       </ul>
//     </li>
//     `
//     incomingLinkData.children.map(dataChild =>{
//       navOutputSplit[dataChild.type](dataChild)
//     }).join("")
//
//   },
//   file: function(incomingLinkData){
//     //console.log(`file: ${incomingLinkData.data.path}`)
//     return `
//     <li class="no-child">
//       <a href="">${incomingLinkData.data.name}</a>
//     </li>`
//   }
// }

const templates = {
  directory: function(data){
    return `
    <ul class="nav-item-children">
      ${data.map(nav_item => {
        console.log(`${nav_item.name} with children: ${nav_item.name}`);
        return renderNavItem(nav_item)
      }).join("")}
    </ul>
    `
  }
}

function renderNavItem(data){

  const has_sub_menu = data.children ? 'kids' : 'no-kids'
  return `
  <li class="nav-item ${has_sub_menu}">
    <a href="${data.path}">${data.name}</a>
    ${data.children ? templates.directory(data.children) : ''}
  </li>
  `
}

function render_nav_items(data){
  for (const nav_item in data) {
    console.log('render nav items:',data[nav_item].name)
    return renderNavItem(data[nav_item])
  }
}





//menuData.map((eachItem,index) => navTreeSplit[eachItem.type](eachItem)).join("")

function navbar(data,incomingMenuData){return `
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container p-0">
      <a class="navbar-brand" href="${paths.urlHome}">${vars.site_name_full}</a>

      <span class="navbar-toggler j-main-menu" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="${paths.urlHome}">Home <span class="sr-only">(current)</span></a>
          </li>
          ${render_nav_items(menuData)}


        </ul>

      </div>
    </div>
  </nav>
  ${nav_breadcrumb(data)}
`};

module.exports = navbar;
