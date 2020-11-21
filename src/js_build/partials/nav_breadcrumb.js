function nav_breadcrumb(data){
  let crumb_separator = "<span class='nav-crumb nav-crumb-separator'>/</span>";
  const current_url_array = data.pageContentUrl.split("/");
    current_url_array.splice(0,1);
    current_url_array.splice(current_url_array.length-1,1);
  let array_length_count = current_url_array.length;
  let last_looped_url = "/";
  let crumb_string = "";
  return `
  <div class='nav-crumbs'>
    <div class='container'>
      <a class="nav-crumb nav-crumb-link" href="/">Home</a>${crumb_separator}
      ${
        current_url_array.map((current_url_chunk,index) =>  {
          let crumb_class = '';
          last_looped_url += current_url_array[index] + "/";
          crumb_text = current_url_array[index];
          return `<a data-index="${index}" class='nav-crumb ${index == array_length_count-1 ? `nav-last` : ""}' href="${last_looped_url}">${crumb_text}</a>
          `;
        }).join(crumb_separator)
      }
    </div>
  </div>
`
};

module.exports = nav_breadcrumb;
