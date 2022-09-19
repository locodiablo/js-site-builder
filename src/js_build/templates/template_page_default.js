const vars = require("../vars")
const templateMaster = require("./template_page_master")
//
function template(data){
  data.body = `
    <div class="${vars.css_classes.containers.default}">
      <h1><a href="${data.pageContentUrl}">${data.head.title}</a></h1>
      ${data.body.map(bodyContent => bodyContent).join("")}
    </div>
  `
  return templateMaster(data)
}

module.exports = template;
