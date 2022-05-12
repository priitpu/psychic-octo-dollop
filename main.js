var $grid = $(".grid").isotope({
  itemSelector: ".grid-item",
  percentPosition: true,
  masonry: {
    columnWidth: ".grid-sizer",
  },
});

$grid.imagesLoaded().progress(function () {
  $grid.isotope("layout");
});

$(".filter-button-group").on("click", "button", function () {
  var filterValue = $(this).attr("data-filter");
  $grid.isotope({ filter: filterValue });
});
