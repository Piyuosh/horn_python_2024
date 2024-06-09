(function($) {
  "use strict";
  
  $(function(){
    // Datatables
    //Setting default values
    $.extend( $.fn.dataTable.defaults,{ 
      dom:  '',
      autoWidth: false,
      order: [ [0, 'desc'] ]
    });

    // Add a row example
    var dtAddRow = $('#datatable-add-row').DataTable();
    var counter = 2;

    $('#addrow').on('click', function(){
      dtAddRow.row.add([
        counter +'.1',
        counter +'.2',
        counter +'.3',
        counter +'.4',
        counter +'.5'
      ]).draw(false);

      counter++;
    });

    // Remove a row example
    var dtRemoveRow = $('#datatable-remove-row');
    dtRemoveRow.DataTable();

    dtRemoveRow.find('tbody').on('click', 'tr', function(){
      if ($(this).hasClass('active')){
        $(this).removeClass('active');
      }else{
        dtRemoveRow.DataTable().$('tr.active').removeClass('active');
        $(this).addClass('active');
      }
    });

    $('#removerow').click( function(){
      dtRemoveRow.DataTable().row('.active').remove().draw( false );
    });
  });
})(jQuery);