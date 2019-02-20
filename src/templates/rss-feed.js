export default `
<div class="col-12 col-sm-6 col-md-4 mb-3">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"><%- feedTitle %></h5>
      <p class="card-text"><%- feedDescription %></p>
    </div>
    <ul class="list-group list-group-flush">
      <% feedItems.forEach((item) => { %>
        <li class="list-group-item"><a href="<%- item.link %>" target="_blank"><%- item.title %></a></li>
      <% }); %>
    </ul>
  </div>
</div>
`;
