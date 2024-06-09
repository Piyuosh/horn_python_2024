(function($) {
  "use strict";
  
  // Jstree examples
  $('#jstree-basic').jstree();

  // Json example
  $('#jstree-json').jstree({ 'core' : {
    'data' : [
       { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
       { "id" : "ajson2", "parent" : "#", "text" : "Folder 2" },
       { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 2.1" },
       { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2.2" },
    ]
  } });

  // Ajax example
  $('#jstree-ajax').jstree({
    'core' : {
      'data' : {
        "url" : "../../dist/main/plugins/jstree/data/data.json",
        "dataType" : "json" // needed only if you do not supply JSON headers
      }
    }
  });

  // Checkbox example
  $('#jstree-checkbox').jstree({
    "plugins" : ["checkbox", "wholerow"]
  });

  // Drag and Drop
  $('#jstree-drag-drop').jstree({
    "core" : { "check_callback" : true }, // so that operations work
    "plugins" : ["dnd"]
  });

  // Context menu
  $('#jstree-context').jstree({
    "core" : { "check_callback" : true }, // so that operations work
    "plugins" : ["contextmenu"]
  });

  // Custom icons
  $('#jstree-custom').jstree();
})(jQuery);