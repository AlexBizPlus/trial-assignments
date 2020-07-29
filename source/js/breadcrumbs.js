(function () {
  var item = document.querySelector('.item');
  var breadcrumbs = document.querySelector('.breadcrumbs');

  var renderEmptyElement = function () {
    var emptyElement = document.getElementById('empty');
    if (!emptyElement) {
      var newElement = document.createElement('li');
      var newElementLink = document.createElement('a');
      newElementLink.className = 'breadcrumbs__link';
      newElementLink.href = '#';
      newElementLink.textContent = '...';
      newElementLink.id = 'empty';
      newElement.appendChild(newElementLink);
      breadcrumbs.children[breadcrumbs.childElementCount - 1].before(newElement);
    }
  }

  var resetBreadcrumbs = function () {
    for (var i = 0; i < breadcrumbs.childElementCount; i++) {
      breadcrumbs.children[i].style.display = '';
    }
    var emptyElement = document.getElementById('empty');
    if (emptyElement) {
      emptyElement.parentElement.remove();
    }
  }

  var setBreadcrumbs = function () {
    resetBreadcrumbs();
    if (item.offsetWidth < breadcrumbs.offsetWidth) {
      renderEmptyElement();

      for (var i = breadcrumbs.childElementCount - 3; i >= 0; i--) {
        if (item.offsetWidth < breadcrumbs.offsetWidth) {
          breadcrumbs.children[i].style.display = 'none';
        }
      }
    }
  }

  window.addEventListener('resize', setBreadcrumbs);
  setBreadcrumbs();

})();
