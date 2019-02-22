export default `
<div id="<%- feedId %>" class="col-12 col-sm-6 col-md-4 mb-3">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"><%- feedTitle %></h5>
      <p class="card-text"><%- feedDescription %></p>
    </div>
    <ul class="list-group list-group-flush articles-list">
    </ul>
  </div>
</div>
`;
