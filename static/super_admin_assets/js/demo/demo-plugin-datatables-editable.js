(function($) {
  "use strict";
  
  $(function(){
    // Datatables
    //Setting default values
    $.extend( $.fn.dataTable.defaults,{ 
      dom: '<"row" <"col-sm-6" l> <"col-sm-6" f> >',
      autoWidth: false,
      order: [ [0, 'desc'] ],
      columnDefs: [{
        targets: -1,
        orderable: false
      }],
      language: {
        lengthMenu: '_MENU_',
        zeroRecords: 'Nothing found - sorry',
        info: 'Showing page _PAGE_ of _PAGES_',
        infoEmpty: 'No records available',
        infoFiltered: '(filtered from _MAX_ total records)',
        search: '_INPUT_',
        searchPlaceholder: 'Search...'
      } 
    });

    // datatable editable
    var dtEditable = $('#datatable-editable').DataTable({
      responsive: true
    });

    dtEditable.on('click','.btn-edit', function(){
      $(this).removeClass('btn-edit').addClass('btn-save').find('.fa-pencil').removeClass("fa-pencil").addClass('fa-save');
      
      var tr = $(this).closest('tr');
      var td = tr.find('td');

      for(var i = 0; i <= td.length - 2; i++){
        var cellCur = dtEditable.cell(td.eq(i));
        cellCur.data('<input type="text" class="form-control" value="'+cellCur.data()+'">');
      }
    });

    dtEditable.on('click','.btn-save', function(){
      $(this).removeClass('btn-save').addClass('btn-edit').find('.fa-save').removeClass("fa-save").addClass('fa-pencil');
      
      var tr = $(this).closest('tr');
      var td = tr.find('td');

      for(var i = 0; i <= td.length - 2; i++){
        var cellCur = dtEditable.cell(td.eq(i));
        var inputVal = td.eq(i).find('.form-control').val();
        cellCur.data(inputVal).draw();
      }

      td.addClass('bg-default').css({
        '-webkit-transition': 'background-color .7s ease',
        '-moz-transition': 'background-color .7s ease',
        '-ms-transition': 'background-color .7s ease',
        '-o-transition': 'background-color .7s ease',
        'transition': 'background-color .7s ease'
      });

      setTimeout(function(){
        td.removeClass('bg-default');
      }, 1200);
    });

    dtEditable.on('click','.btn-remove', function(){
      dtEditable.row().remove().draw(false);
    });

    // Select2
    $('select').select2({
      theme: 'bootstrap'
    });
  });
})(jQuery);