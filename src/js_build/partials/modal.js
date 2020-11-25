const vars = require("../vars.js");

function modal(data){return `
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header container">
          <h4 class="modal-title" id="exampleModalLabel">${data.title}</h4>
          <button type="button" class="close fas fa-times" data-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div id="modal-body-general" class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
`};

module.exports = modal;
