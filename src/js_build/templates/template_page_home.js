const templateMaster = require("./template_page_master")
//
function template(data){
  data.body = `
    <div class="jumbotron">
      <div class="container">
        <h1>${data.head.title}</h1>
      </div>
      <div class="container">
        ${data.body.map(bodyContent => bodyContent).join("")}
      </div>
    </div>

  `
  return templateMaster(data)
}

module.exports = template;
