(function($) {
  "use strict";
  
  $(function(){
    // Jquery-treeview examples
    // First 2 examples and last example with custom icons
    $("#treeview-example1, #treeview-example2, #treeview-example3").treeview({
      animated: 300
    });

    // Async example
    function initTrees(){
      $("#treeview-async").treeview({
        animated: 300,
        url: "../../dist/main/plugins/jquery-treeview/source.php",
        // add some additional, dynamic data and request with POST
        ajax: {
          data: {
            "additional": function() {
              return "yeah: " + new Date;
            }
          },
          type: "post"
        }
      });
    }
    
    initTrees();
  })
})(jQuery);

  