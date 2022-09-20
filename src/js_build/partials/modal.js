const vars = require("../vars.js");

function modal(data){return `
  <div class="modal fade" id="theModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header container">
          <h4 class="modal-title" id="theModal-title">${data.title}</h4>
          <button type="button" class="close btn" data-bs-dismiss="modal" aria-label="Close">
          Close
          </button>
        </div>
        <div id="theModal-body" class="modal-body"></div>
        <div id="theModal-footer" class="modal-footer">
        </div>
      </div>
    </div>
  </div>
`};

module.exports = modal;
