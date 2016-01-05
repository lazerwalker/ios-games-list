function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList)
}

// Returns an Array of string IDs
function getCheckedFilters() {
  return toArray(document.getElementsByTagName("input"))
    .filter(function(input) { return input.checked })
    .map(function(input) { return input.id });
}

function hideAllGames() {
  toArray(document.querySelectorAll(".game, .other li"))
    .forEach(function(el) { el.style.display = "none" });
}

function show(selector) {
  toArray(document.querySelectorAll(selector))
    .forEach(function(el) { el.style.display = "block" });  
}

function classSelectorForFilters(filters) {
  return filters
    .map(function(id) { return "." + id })
    .join(",");
}

function update() {
  hideAllGames();
  show(classSelectorForFilters(getCheckedFilters()));
}

toArray(document.getElementsByTagName("input"))
  .forEach(function(el) {
    el.addEventListener("change", update)
  })