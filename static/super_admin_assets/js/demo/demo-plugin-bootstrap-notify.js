(function($) {
  "use strict";
  
  // Bootstrap-notify plugin
  // Setting defaults
  $.notifyDefaults({
    offset: {
      y: 60,
      x: 20
    },
    onShow: function(){
      // Removes inline css that gives Bootstrap-notify plugin to the close button
      $(this).find('.close').removeAttr('style');
    }
  });

  // Bootstrap-notify examples
  // Light alert examples
  $('#notify-basic').on('click', function(){
    $.notify('<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.',{
      allow_dismiss: false,
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0}">{2}</div>'+
      '</div>'
    });
  });

  $('#notify-basic-dismissible').on('click', function(){
    $.notify('<strong>Well done!</strong> You successfully read this important alert message.',{
      type: 'success',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-bordered').on('click', function(){
    $.notify('<strong>Oh snap!</strong> Change a few things up and try submitting again.',{
      type: 'danger',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-bold-top').on('click', function(){
    $.notify('<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.',{
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} border-top-bold alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-bold-left').on('click', function(){
    $.notify('<strong>Well done!</strong> You successfully read this important alert message.',{
      type: 'success',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} border-left-bold alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-bold-right').on('click', function(){
    $.notify('<strong>Warning!</strong> Better check yourself, you\'re not looking too good.',{
      type: 'warning',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} border-right-bold alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-bold-bottom').on('click', function(){
    $.notify('<strong>Oh snap!</strong> Change a few things up and try submitting again.',{
      type: 'danger',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} border-bottom-bold alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-progress').on('click', function(){
    var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
      type: 'success',
      allow_dismiss: false,
      showProgressbar: true,
      template: '<div data-notify="container" class="col-sm-4 alert alert-{0} border-{0} border-bottom-bold">' +
        '<button type="button" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    });

    setTimeout(function() {
      notify.update({
        'type': 'success',
        'message': '<strong>Success</strong> Your page has been saved!',
        'progress': 25
      });
    }, 4500);
  });

  $('#notify-icon-left').on('click', function(){
    $.notify({
      icon: 'fa fa-warning',
      message: 'Javascript warning on line 300.'
    },
    {
      type: 'warning',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} has-icon alert-dismissible"><div class="alert-icon"><i data-notify="icon"></i></div><div class="alert-body"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div></div>'+
      '</div>'
    });
  });

  $('#notify-icon-right').on('click', function(){
    $.notify({
      icon: 'fa fa-edit',
      message: 'Change a few things up and try submitting again.'
    },
    {
      type: 'danger',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} has-icon alert-dismissible"><div class="alert-body"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div><div class="alert-icon"><i data-notify="icon"></i></div></div>'+
      '</div>'
    });
  });

  $('#notify-advanced').on('click', function(){
    $.notify({
      title: 'Heads up! You got a new message!',
      message: 'This alert needs your attention, but it is not super important. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.'
    },
    {
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert alert-{0} border-{0} border-left-bold"><button type="button" class="close" data-notify="dismiss">×</button><h4 data-notify="title">{1}</h4><p>{2}</p><p class="m-top-10"><button type="button" class="btn btn-primary m-right-5">Confirm</button><button type="button" class="btn btn-danger">Cancel</button></p></div>'+
      '</div>'
    });
  });

  // Solid alert examples
  $('#notify-solid').on('click', function(){
    $.notify('<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.',{
      allow_dismiss: false,
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert bg-{0}">{2}</div>'+
      '</div>'
    });
  });

  $('#notify-solid-dismissible').on('click', function(){
    $.notify('<strong>Well done!</strong> You successfully read this important alert message.',{
      type: 'success',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert bg-{0} alert-dismissible"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div>'+
      '</div>'
    });
  });

  $('#notify-solid-progress').on('click', function(){
    var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
      type: 'success',
      allow_dismiss: false,
      showProgressbar: true,
      template: '<div data-notify="container" class="col-sm-4 alert bg-{0} border-bottom-bold">' +
        '<button type="button" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    });

    setTimeout(function() {
      notify.update({
        'type': 'success',
        'message': '<strong>Success</strong> Your page has been saved!',
        'progress': 25
      });
    }, 4500);
  });

  $('#notify-solid-icon-left').on('click', function(){
    $.notify({
      icon: 'fa fa-warning',
      message: 'Javascript warning on line 300.'
    },
    {
      type: 'warning',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert bg-{0} has-icon alert-dismissible"><div class="alert-icon"><i data-notify="icon"></i></div><div class="alert-body"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div></div>'+
      '</div>'
    });
  });

  $('#notify-solid-icon-right').on('click', function(){
    $.notify({
      icon: 'fa fa-edit',
      message: 'Change a few things up and try submitting again.'
    },
    {
      type: 'danger',
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert bg-{0} has-icon alert-dismissible"><div class="alert-body"><button type="button" class="close" data-notify="dismiss">×</button>{2}</div><div class="alert-icon"><i data-notify="icon"></i></div></div>'+
      '</div>'
    });
  });

  $('#notify-solid-advanced').on('click', function(){
    $.notify({
      title: 'Heads up! You got a new message!',
      message: 'This alert needs your attention, but it is not super important. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.'
    },
    {
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert bg-{0}"><button type="button" class="close" data-notify="dismiss">×</button><h4 data-notify="title">{1}</h4><p>{2}</p><p class="m-top-10"><button type="button" class="btn btn-default m-right-5">Confirm</button><button type="button" class="btn btn-danger">Cancel</button></p></div>'+
      '</div>'
    });
  });

  $('#notify-solid-border-inset').on('click', function(){
    $.notify({
      title: 'Heads up! You got a new message!',
      message: 'This alert needs your attention, but it is not super important. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.'
    },
    {
      template: '<div data-notify="container" class="col-sm-4 p-0">'+
      '<div class="alert bg-{0} border-inset"><button type="button" class="close" data-notify="dismiss">×</button><h4 data-notify="title">{1}</h4><p>{2}</p><p class="m-top-10"><button type="button" class="btn btn-default m-right-5">Confirm</button><button type="button" class="btn btn-danger">Cancel</button></p></div>'+
      '</div>'
    });
  });
})(jQuery);