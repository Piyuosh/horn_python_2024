(function($) {
  "use strict";
  
  // Sweetalert examples
  // Basic example
  $('#sweetalert-basic').on('click', function(){
    swal("Here's a message!");
  });

  // Title example
  $('#sweetalert-title').on('click', function(){
    swal("Here's a message!", "It's pretty, isn't it?");
  });

  // Success example
  $('#sweetalert-success').on('click', function(){
    swal("Good job!", "You clicked the button!", "success");
  });

  // Warning example
  $('#sweetalert-warning').on('click', function(){
    swal({
      title: "Are you sure?",
      text: "Your will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
    });
  });

  // Cancel example
  $('#sweetalert-cancel').on('click', function(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm) {
      if (isConfirm) {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  });

  // Image example
  $('#sweetalert-image').on('click', function(){
    swal({
      title: "Sweet!",
      text: "Here's a custom image.",
      imageUrl: 'img/lockscreen-avatar.png'
    });
  });

  // Prompt example
  $('#sweetalert-prompt').on('click', function(){
    swal({
      title: "An input!",
      text: "Write something interesting:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      inputPlaceholder: "Write something"
    }, function (inputValue) {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false
      }
      swal("Nice!", "You wrote: " + inputValue, "success");
    });
  });

  // Ajax example
  $('#sweetalert-ajax').on('click', function(){
    swal({
      title: "Ajax request example",
      text: "Submit to run ajax request",
      type: "info",
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    }, function () {
      setTimeout(function () {
        swal("Ajax request finished!");
      }, 2000);
    });
  });
})(jQuery);