const paths = require("../paths.js");

const crumbs = {
  default: function(data){
    return `
    <li class="breadcrumb-item">
      <a href="${data.url}">${data.text}</a>
    </li>
    `
  },
  active: function(data){
    return `
    <li class="breadcrumb-item active" aria-current="page">
      ${data.text}
    </li>
    `
  }
}
function nav_breadcrumb(data){
  const current_url_array = data.pageContentUrl.split("/")
    current_url_array.splice(0,1)
    current_url_array.splice(current_url_array.length-1,1)
  let url = "/";
  return `
  <div class="breadcrumb-container">
    <nav class="container" aria-label="breadcrumb">
      <ol class="breadcrumb">
        ${crumbs.default({
          url: paths.urlHome,
          text: "Home"
        })}
        ${
          current_url_array.map((current_url_chunk,index) =>  {
            let data = {
              url: url += current_url_array[index] + "/",
              text: current_url_array[index]
            }
            return index == current_url_array.length-1 ? crumbs.active(data) : crumbs.default(data)
          }).join("")
        }
      </ol>
    </div>
  </div>
`
};

module.exports = nav_breadcrumb;
