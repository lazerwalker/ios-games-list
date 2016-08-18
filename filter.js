function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList)
}

toArray(document.querySelectorAll("input.filter"))
  .forEach(function(el) {
    el.addEventListener("change", updateFilters)
  })

toArray(document.querySelectorAll("input.platform"))
  .forEach(function(el) {
    el.addEventListener("change", updatePlatform)
  })

var showingFullChangelog = false
document.getElementById("changelog-toggle")
  .addEventListener("click", toggleChangelog)

//---
// Changelog
//---
function toggleChangelog() {
  var changelog = toArray(document.querySelectorAll('#changelog li'))
  var changelogToggle = document.getElementById('changelog-toggle')

  var buttonText, changelogVisibility
  if (showingFullChangelog) {
    buttonText = "Show More History"
    changelogVisibility = "none"
  } else {
    buttonText = "Hide History"
    changelogVisibility = "list-item"
  }

  changelogToggle.innerText = buttonText
  changelog.forEach(function(el) {
    el.style.display = changelogVisibility
  })    


  showingFullChangelog = !showingFullChangelog;
}


//---
// Filters
//---

// Returns an Array of string IDs
function getCheckedFilters() {
  return toArray(document.querySelectorAll("input.filter"))
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

function updateFilters(e) {
  hideAllGames();
  show(classSelectorForFilters(getCheckedFilters()));

  if (e) updatePlatform()
}

//---
// Platform
//---

function updatePlatform(e) {
  if (e) updateFilters();
  
  var iphone = document.getElementById("iphone").checked
  var ipad = document.getElementById("ipad").checked

  if (!iphone) {
    toArray(document.querySelectorAll(".iphone"))
      .forEach(function(el) { el.style.display = "none" });    
  }

  if (!ipad) {
    toArray(document.querySelectorAll(".ipad"))
      .forEach(function(el) { el.style.display = "none" });    
  }

  if (!iphone && !ipad) {
    toArray(document.querySelectorAll(".both-platforms"))
      .forEach(function(el) { el.style.display = "none" });    
  }
}
