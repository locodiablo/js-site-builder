const vars = require("../vars")
const templateMaster = require("./template_page_master")
//
function template(data){
  data.body = `
    <div class="jumbotron">
      <div class="${vars.css_classes.containers.default}">
        <h1><a href="${data.pageContentUrl}">${data.head.title}</a></h1>
        <p>${data.head.description}</p>
      </div>
    </div>
    <div class="${vars.css_classes.containers.default}">
      ${data.body.map(bodyContent => bodyContent).join("")}
    </div>
  `
  return templateMaster(data)
}

module.exports = template;
