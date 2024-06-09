(function($) {
  "use strict";
  
  $(function(){
    // Datatables
    //Setting default values
    $.extend( $.fn.dataTable.defaults,{ 
      dom:  '<"row" <"col-sm-6" l> <"col-sm-6" f> >'+ // Top section structure(search etc.)
            '<"row" <"col-sm-12" t> >'+                       // Table
            '<"row m-top-10" <"col-sm-6" i> <"col-sm-6" p> >',         // Bottom section structure (pagination etc.)
      autoWidth: false,
      order: [ [0, 'desc'] ],
      pagingType: 'full_numbers',
      language: {
        lengthMenu: '_MENU_',
        info: 'Showing page _PAGE_ of _PAGES_',
        infoEmpty: 'No records available',
        infoFiltered: '(From _MAX_ total records)',
        search: '_INPUT_',
        searchPlaceholder: 'Search...',
        paginate: {
          next:       '<i class="fa fa-angle-right"></i>',
          previous:   '<i class="fa fa-angle-left"></i>'
        },
      } 
    });

    // Ajax example
    $('#datatable-ajax').DataTable({
      ajax: '../../dist/main/plugins/datatables/data/arrays.txt'
    });

    // Child rows example
    /* Formatting function for row details - modify as you need */
    function format(d){
      // `d` is the original data object for the row
      return  '<table class="table table-bordered">'+
                '<tr>'+
                    '<td>Full name:</td>'+
                    '<td>'+d.name+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Extension number:</td>'+
                    '<td>'+d.extn+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Extra info:</td>'+
                    '<td>And any further details here (images etc)...</td>'+
                '</tr>'+
              '</table>';
    }

    var dtChildRows = $('#datatable-child-rows');
    dtChildRows.DataTable({
      ajax: '../../dist/main/plugins/datatables/data/objects.txt',
      columns: [{
          className: 'details-control',
          data:      'name',
        },
        { data: 'position' },
        { data: 'office' },
        { data: 'salary'}
      ],
      'order': [[1, 'asc']]
    });
     
    // Add event listener for opening and closing details
    dtChildRows.find('tbody').on('click', 'td.details-control', function(){
      var tr = $(this).closest('tr');
      var row = dtChildRows.DataTable().row(tr);

      if (row.child.isShown()){
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
      }else{
        // Open this row
        row.child( format(row.data())).show();
        tr.addClass('shown');
      }
    });


    // Datatable tab example
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
      $.fn.dataTable.tables({
        visible: true,
        api: true
      }).columns.adjust();
    });
     
    $('#datatable-tab1, #datatable-tab2').DataTable( {
        ajax:           '../../dist/main/plugins/datatables/data/arrays.txt',
        scrollY:        200,
        scrollCollapse: true,
        paging:         false
    } );

    // Apply a search to the second table for the demo
    $('#datatable-tab2').DataTable().search('New York').draw();

    // Select2
    $('select').select2({
      theme: 'bootstrap'
    });
  });
})(jQuery);