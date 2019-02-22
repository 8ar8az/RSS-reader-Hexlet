export default `
<div class="modal fade" id="modal-error-report" tabindex="-1" role="dialog" aria-labelledby="modal-error-report-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-error-report-title">При добавлении RSS-ленты произошла ошибка</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span class="font-weight-bold">Адрес RSS-ленты: </span><%- feedUrl %></li>
          <li class="list-group-item"><span class="font-weight-bold">Ошибка: </span><%- error.message %></li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`;
