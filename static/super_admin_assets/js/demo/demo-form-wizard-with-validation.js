(function($) {
  "use strict";
  
  $(function(){
    // Initializing Icheck
    $('input.icheck-minimal-grey').iCheck({
      checkboxClass: 'icheckbox_minimal-grey',
      radioClass: 'iradio_minimal-grey'
    });

    // Initializing Select2
    $("select").select2({
      theme: "bootstrap",
      allowClear: true,
      placeholder: 'Select...'
    });

    // Bootstrap wizard default settings
    $.fn.bootstrapWizard.defaults.tabClass = "";
    $.fn.bootstrapWizard.defaults.previousSelector = ".btn-prev";
    $.fn.bootstrapWizard.defaults.nextSelector = ".btn-next";
    $.fn.bootstrapWizard.defaults.lastSelector = ".btn-finish";

    // Example #1
    // Creating validation rules
    var wizardArrow = $("#wizard-arrow");
    var validatorArrow = wizardArrow.validate({
      // Validation rules
      // Selecting input by name attribute
      rules: {
        inputName1: {
          required: true,
          minlength: 5
        },
        inputEmail1: {
          email: true,
          required: true,
          minlength: 5
        },
        inputPassword1: {
          required: true,
          minlength: 5
        },
        inputAddress1: {
          required: true
        },
        inputCity1: {
          required: true
        },
        country1: {
          required: true
        },
        inputZip1: {
          required: true,
          minlength: 2,
          digits: true
        },
        inputCreditCard1: {
          required: true,
          minlength: 16,
          digits: true
        },
        year1: {
          required: true
        },
        terms1: {
          required: true
        }
      },
      // Error messages
      messages: {
        inputName1: "Full Name is required ( at least 5 characters )",
        inputEmail1: "Email is required ( at least 5 characters )",
        inputPassword1: "Password is required ( at least 5 characters )",
        inputAddress1: "Address is required",
        inputCity1: "City is required",
        country1: "Country is required",
        inputZip1: "Zip is required",
        inputCreditCard1: "Credit card number is required ( 16 digits )",
        year1: "Credit card year of expiration is required",
        terms1: "You should agree to our Terms Of Use"
      },
      highlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      // Class that wraps error message
      errorClass: "help-block",
      // Element that wraps error message
      errorElement: "div",
      errorPlacement: function(error, element) {
        $(element).closest(".form-group").find('> :last-child').append(error);

        // Select2 validation
        $("select").on("change", function(){
          var select2Valid = $(this).valid();
          // If clicked on clear button
          if(!select2Valid){
            $(this).closest('.form-group').removeClass("has-success").addClass("has-error");
          }
        });

        // For Icheck we need revalidate
        if( $(element).is(':checkbox') || $(element).is(':radio') ){
          $(element).on('ifChecked ifUnchecked', function(e){
            validatorArrow.element($(element));
          });
        }
      },
      success: function(helpBlock) {
        if( $(helpBlock).closest(".form-group").hasClass('has-error') ){
          $(helpBlock).closest(".form-group").removeClass("has-error").addClass("has-success");
        }
      }
    });

    // Initializing Bootstrap-wizard plugin
    wizardArrow.bootstrapWizard({
      onTabShow: function(tab, navigation, index){
        // Showing/hiding finish button
        var $total = navigation.children().length;
        var $current = index+1;
        // If it's the last tab then hide the last button and show the finish instead
        if($current >= $total) {
          wizardArrow.find('.btn-next').addClass("none");
          wizardArrow.find('.btn-finish').removeClass("none");
        }else{
          wizardArrow.find('.btn-next').removeClass("none");
          wizardArrow.find('.btn-finish').addClass("none");
        }
      },
      onTabClick: function(tab, navigation, index) {
        return false;
      },
      onNext: function(tab, navigation, index) {
        var valid = wizardArrow.valid();
        if(!valid) {
          validatorArrow.focusInvalid();
          return false;
        }
      },
      onLast: function(tab, navigation, index) {
        var valid = wizardArrow.valid();
        if(!valid) {
          validatorArrow.focusInvalid();
          return false;
        }else{
          alert("You have successfully finished the step wizard");
        }
      }
    });

    // Example #2
    // Creating validation rules
    var wizardRect = $("#wizard-rect");
    var validatorRect = wizardRect.validate({
      // Validation rules
      // Selecting input by name attribute
      rules: {
        inputName2: {
          required: true,
          minlength: 5
        },
        inputEmail2: {
          email: true,
          required: true,
          minlength: 5
        },
        inputPassword2: {
          required: true,
          minlength: 5
        },
        inputAddress2: {
          required: true
        },
        inputCity2: {
          required: true
        },
        country2: {
          required: true
        },
        inputZip2: {
          required: true,
          minlength: 2,
          digits: true
        },
        inputCreditCard2: {
          required: true,
          minlength: 16,
          digits: true
        },
        year2: {
          required: true
        },
        terms2: {
          required: true
        }
      },
      // Error messages
      messages: {
        inputName2: "Full Name is required ( at least 5 characters )",
        inputEmail2: "Email is required ( at least 5 characters )",
        inputPassword2: "Password is required ( at least 5 characters )",
        inputAddress2: "Address is required",
        inputCity2: "City is required",
        country2: "Country is required",
        inputZip2: "Zip is required",
        inputCreditCard2: "Credit card number is required ( 16 digits )",
        year2: "Credit card year of expiration is required",
        terms2: "You should agree to our Terms Of Use"
      },
      highlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      // Class that wraps error message
      errorClass: "help-block",
      // Element that wraps error message
      errorElement: "div",
      errorPlacement: function(error, element) {
        $(element).closest(".form-group").find('> :last-child').append(error);

        // Select2 validation
        $("select").on("change", function(){
          var select2Valid = $(this).valid();
          // If clicked on clear button
          if(!select2Valid){
            $(this).closest('.form-group').removeClass("has-success").addClass("has-error");
          }
        });

        // For Icheck we need revalidate
        if( $(element).is(':checkbox') || $(element).is(':radio') ){
          $(element).on('ifChecked ifUnchecked', function(e){
            validatorArrow.element($(element));
          });
        }
      },
      success: function(helpBlock) {
        if( $(helpBlock).closest(".form-group").hasClass('has-error') ){
          $(helpBlock).closest(".form-group").removeClass("has-error").addClass("has-success");
        }
      }
    });

    // Initializing Bootstrap-wizard plugin
    wizardRect.bootstrapWizard({
      onTabShow: function(tab, navigation, index){
        // Showing/hiding finish button
        var $total = navigation.children().length;
        var $current = index+1;
        // If it's the last tab then hide the last button and show the finish instead
        if($current >= $total) {
          wizardRect.find('.btn-next').addClass("none");
          wizardRect.find('.btn-finish').removeClass("none");
        }else{
          wizardRect.find('.btn-next').removeClass("none");
          wizardRect.find('.btn-finish').addClass("none");
        }
      },
      onTabClick: function(tab, navigation, index) {
        return false;
      },
      onNext: function(tab, navigation, index) {
        var valid = wizardRect.valid();
        if(!valid) {
          validatorRect.focusInvalid();
          return false;
        }
      },
      onLast: function(tab, navigation, index) {
        var valid = wizardRect.valid();
        if(!valid) {
          validatorRect.focusInvalid();
          return false;
        }else{
          alert("You have successfully finished the step wizard");
        }
      }
    });

    // Example #3
    // Creating validation rules
    var wizardCircle = $("#wizard-circle");
    var validatorCircle = wizardCircle.validate({
      // Validation rules
      // Selecting input by name attribute
      rules: {
        inputName3: {
          required: true,
          minlength: 5
        },
        inputEmail3: {
          email: true,
          required: true,
          minlength: 5
        },
        inputPassword3: {
          required: true,
          minlength: 5
        },
        inputAddress3: {
          required: true
        },
        inputCity3: {
          required: true
        },
        country3: {
          required: true
        },
        inputZip3: {
          required: true,
          minlength: 2,
          digits: true
        },
        inputCreditCard3: {
          required: true,
          minlength: 16,
          digits: true
        },
        year3: {
          required: true
        },
        terms3: {
          required: true
        }
      },
      // Error messages
      messages: {
        inputName3: "Full Name is required ( at least 5 characters )",
        inputEmail3: "Email is required ( at least 5 characters )",
        inputPassword3: "Password is required ( at least 5 characters )",
        inputAddress3: "Address is required",
        inputCity3: "City is required",
        country3: "Country is required",
        inputZip3: "Zip is required",
        inputCreditCard3: "Credit card number is required ( 16 digits )",
        year3: "Credit card year of expiration is required",
        terms3: "You should agree to our Terms Of Use"
      },
      highlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      // Class that wraps error message
      errorClass: "help-block",
      // Element that wraps error message
      errorElement: "div",
      errorPlacement: function(error, element) {
        $(element).closest(".form-group").find('> :last-child').append(error);

        // Select2 validation
        $("select").on("change", function(){
          var select2Valid = $(this).valid();
          // If clicked on clear button
          if(!select2Valid){
            $(this).closest('.form-group').removeClass("has-success").addClass("has-error");
          }
        });

        // For Icheck we need revalidate
        if( $(element).is(':checkbox') || $(element).is(':radio') ){
          $(element).on('ifChecked ifUnchecked', function(e){
            validatorCircle.element($(element));
          });
        }
      },
      success: function(helpBlock) {
        if( $(helpBlock).closest(".form-group").hasClass('has-error') ){
          $(helpBlock).closest(".form-group").removeClass("has-error").addClass("has-success");
        }
      }
    });

    // Initializing Bootstrap-wizard plugin
    wizardCircle.bootstrapWizard({
      onTabShow: function(tab, navigation, index){
        // Showing/hiding finish button
        var $total = navigation.children().length;
        var $current = index+1;
        // If it's the last tab then hide the last button and show the finish instead
        if($current >= $total) {
          wizardCircle.find('.btn-next').addClass("none");
          wizardCircle.find('.btn-finish').removeClass("none");
        }else{
          wizardCircle.find('.btn-next').removeClass("none");
          wizardCircle.find('.btn-finish').addClass("none");
        }
      },
      onTabClick: function(tab, navigation, index) {
        return false;
      },
      onNext: function(tab, navigation, index) {
        navigation.find(".step-item-circle").eq(index - 1).addClass("done");

        var valid = wizardCircle.valid();
        if(!valid) {
          validatorCircle.focusInvalid();
          return false;
        }
      },
      onLast: function(tab, navigation, index) {
        var valid = wizardCircle.valid();
        if(!valid) {
          validatorCircle.focusInvalid();
          return false;
        }else{
          alert("You have successfully finished the step wizard");
        }
      },
      onPrevious: function(tab, navigation, index) {
        tab.removeClass("done");
      }
    });

    // Example #4
    // Creating validation rules
    var wizardLine = $("#wizard-line");
    var validatorLine = wizardLine.validate({
      // Validation rules
      // Selecting input by name attribute
      rules: {
        inputName4: {
          required: true,
          minlength: 5
        },
        inputEmail4: {
          email: true,
          required: true,
          minlength: 5
        },
        inputPassword4: {
          required: true,
          minlength: 5
        },
        inputAddress4: {
          required: true
        },
        inputCity4: {
          required: true
        },
        country4: {
          required: true
        },
        inputZip4: {
          required: true,
          minlength: 2,
          digits: true
        },
        inputCreditCard4: {
          required: true,
          minlength: 16,
          digits: true
        },
        year4: {
          required: true
        },
        terms4: {
          required: true
        }
      },
      // Error messages
      messages: {
        inputName4: "Full Name is required ( at least 5 characters )",
        inputEmail4: "Email is required ( at least 5 characters )",
        inputPassword4: "Password is required ( at least 5 characters )",
        inputAddress4: "Address is required",
        inputCity4: "City is required",
        country4: "Country is required",
        inputZip4: "Zip is required",
        inputCreditCard4: "Credit card number is required ( 16 digits )",
        year4: "Credit card year of expiration is required",
        terms4: "You should agree to our Terms Of Use"
      },
      highlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error');
      },
      // Class that wraps error message
      errorClass: "help-block",
      // Element that wraps error message
      errorElement: "div",
      errorPlacement: function(error, element) {
        $(element).closest(".form-group").find('> :last-child').append(error);

        // Select2 validation
        $("select").on("change", function(){
          var select2Valid = $(this).valid();
          // If clicked on clear button
          if(!select2Valid){
            $(this).closest('.form-group').removeClass("has-success").addClass("has-error");
          }
        });

        // For Icheck we need revalidate
        if( $(element).is(':checkbox') || $(element).is(':radio') ){
          $(element).on('ifChecked ifUnchecked', function(e){
            validatorLine.element($(element));
          });
        }
      },
      success: function(helpBlock) {
        if( $(helpBlock).closest(".form-group").hasClass('has-error') ){
          $(helpBlock).closest(".form-group").removeClass("has-error").addClass("has-success");
        }
      }
    });

    // Initializing Bootstrap-wizard plugin
    wizardLine.bootstrapWizard({
      onTabShow: function(tab, navigation, index){
        // Showing/hiding finish button
        var $total = navigation.children().length;
        var $current = index+1;
        // If it's the last tab then hide the last button and show the finish instead
        if($current >= $total) {
          wizardLine.find('.btn-next').addClass("none");
          wizardLine.find('.btn-finish').removeClass("none");
        }else{
          wizardLine.find('.btn-next').removeClass("none");
          wizardLine.find('.btn-finish').addClass("none");
        }
      },
      onTabClick: function(tab, navigation, index) {
        return false;
      },
      onNext: function(tab, navigation, index) {
        var valid = wizardLine.valid();
        if(!valid) {
          validatorLine.focusInvalid();
          return false;
        }
      },
      onLast: function(tab, navigation, index) {
        var valid = wizardLine.valid();
        if(!valid) {
          validatorLine.focusInvalid();
          return false;
        }else{
          alert("You have successfully finished the step wizard");
        }
      }
    });
  })
})(jQuery);