export default `
<div class="col-12 col-sm-6 col-md-4 mb-3">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"><%- feedTitle %></h5>
      <p class="card-text"><%- feedDescription %></p>
    </div>
    <ul class="list-group list-group-flush">
      <% feedItems.forEach((item, index) => { %>
        <% const itemId = feedId + '-' + index; %>
        <li class="list-group-item">
          <button type="button" data-toggle="modal" data-target="<%- '#' + itemId %>" class="btn btn-primary btn-sm float-right ml-2">Описание</button>
          <a href="<%- item.link %>" target="_blank"><%- item.title %></a>
          <div class="modal fade" id="<%- itemId %>" tabindex="-1" role="dialog" aria-labelledby="<%- '#' + itemId + '-' + 'title' %>" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="<%- itemId + '-' + 'title' %>"><%- item.title %></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <%- item.description %>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      <% }); %>
    </ul>
  </div>
</div>
`;
