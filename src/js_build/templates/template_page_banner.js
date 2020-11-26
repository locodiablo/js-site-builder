const templateMaster = require("./template_page_master")
//
function template(data){
  data.body = `
    <div class="jumbotron">
      <div class="container">
        <h1><a href="${data.pageContentUrl}">${data.head.title}</a></h1>
        <p>${data.head.description}</p>
      </div>
    </div>
    <div class="container">
      ${data.body.map(bodyContent => bodyContent).join("")}
    </div>
  `
  return templateMaster(data)
}

module.exports = template;
