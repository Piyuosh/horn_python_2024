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

    // Input example
    // Setup - add a text input to each footer cell
    $('#datatable-input-search tfoot th').each(function(){
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control" placeholder="Search '+title+'" />');
    });

    // DataTable
    var table = $('#datatable-input-search').DataTable();

    // Apply the search
    table.columns().every(function(){
      var that = this;

      $('input', this.footer()).on('keyup change', function(){
        if(that.search() !== this.value){
          that.search(this.value).draw();
        }
      });
    });

    // Select example
    $('#datatable-select-search').DataTable( {
      initComplete: function () {
        this.api().columns().every( function () {
          var column = this;
          var select = $('<select class="form-control" data-placeholder="" data-allow-clear="true"><option value=""></option></select>')
            .appendTo($(column.footer()).empty())
            .on('change', function(){
              var val = $.fn.dataTable.util.escapeRegex(
                $(this).val()
              );

              column.search(val ? '^'+val+'$' : '', true, false).draw();
            });

          column.data().unique().sort().each(function(d, j){
            select.append('<option value="'+d+'">'+d+'</option>')
          });
        });
      }
    });

    // Select2
    $('select').select2({
      theme: 'bootstrap'
    });
  });
})(jQuery);