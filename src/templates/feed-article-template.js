export default `
<li class="list-group-item">
  <button type="button" data-toggle="modal" data-target="<%- '#' + feedId + '-' + articleId %>" class="btn btn-primary btn-sm float-right ml-2">Описание</button>
  <a href="<%- articleUrl %>" target="_blank"><%- articleTitle %></a>
  <div class="modal fade" id="<%- feedId + '-' + articleId %>" tabindex="-1" role="dialog" aria-labelledby="<%- '#' + feedId + '-' + articleId + '-' + 'title' %>" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="<%- feedId + '-' + articleId + '-' + 'title' %>"><%- articleTitle %></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <%- articleDescription %>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</li>
`;
