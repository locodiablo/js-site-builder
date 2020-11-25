const templateMaster = require("./template_page_master")
//
function template(data){
  data.body = `
    <div class="container">
      <h1>${data.head.title}</h1>
      ${data.body.map(bodyContent => bodyContent).join("")}
    </div>
  `
  return templateMaster(data)
}

module.exports = template;
