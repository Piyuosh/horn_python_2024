(function($) {
  "use strict";
  
  // Bootbox examples
  $("#alert-example").on("click", function(){
    bootbox.alert("Hello world!");
  });

  $("#confirm-example").on("click", function(){
    bootbox.confirm("Are you sure?", function(result){});
  });

  $("#prompt-example").on("click", function(){
    bootbox.prompt("What is your name?", function(result) {                
      if(result === null){                                             
        alert("Prompt dismissed");                              
      }else{
        alert("Hi "+result);                          
      }
    });
  });

  $("#prompt-default-val-example").on("click", function(){
    bootbox.prompt({
      title: "What is your real name?",
      value: "makeusabrew",
      callback: function(result) {
        if (result === null) {
          alert("Prompt dismissed");
        } else {
          alert("Hi "+result);
        }
      }
    });
  });

  $("#custom-example").on("click", function(){
    bootbox.dialog({
      message: "I am a custom dialog",
      title: "Custom title",
      buttons: {
        success: {
          label: "Success!",
          className: "btn-success m-right-5",
          callback: function(){
            alert("Success button");
          }
        },
        danger: {
          label: "Danger!",
          className: "btn-danger m-right-5",
          callback: function(){
            alert("Danger button");
          }
        },
        main: {
          label: "Click ME!",
          className: "btn-primary m-right-5",
          callback: function(){
            alert("Primary button");
          }
        }
      }
    });
  });
})(jQuery);