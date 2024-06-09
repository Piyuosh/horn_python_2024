(function($) {
  "use strict";
  
  // Select2 plugin examples
  $(".select2-example").select2();

  // Select2 example with placeholder
  $(".select2-placeholder-example").select2({
    placeholder: "Select a state"
  });

  // Loading data form an array
  var data =  [
                { id: 0, text: 'enhancement' },
                { id: 1, text: 'bug' },
                { id: 2, text: 'duplicate' },
                { id: 3, text: 'invalid' },
                { id: 4, text: 'wontfix' }
              ];
  $(".select2-array-example").select2({
    data : data
  });

  // Loading remote data
  // Example of ajax loading
  function formatRepo (repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix'>" +
      "<div class='col-xs-4'><img src='" + repo.owner.avatar_url + "' style='width: 100%' /></div>" +
      "<div class='col-xs-4'>" +
        "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";

    if (repo.description) {
      markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
    }

    markup += "<div class='select2-result-repository__statistics'>" +
      "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
      "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
      "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
    "</div>" +
    "</div></div>";

    return markup;
  }

  function formatRepoSelection (repo) {
    return repo.full_name || repo.text;
  } 

  $(".select2-ajax-example").select2({
    ajax: {
      url: "https://api.github.com/search/repositories",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page
        };
      },
      processResults: function (data, params) {
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;

        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
    minimumInputLength: 1,
    templateResult: formatRepo, // omitted for brevity, see the source of this page
    templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
  });

  // Using select2-bootstrap-theme
  $(".select2-bootstrap-theme").select2({
      theme: "bootstrap"
  });

  // Setting validation states to select2 dropdown
  $(".select2-bootstrap-theme").on("select2:open", function(){
    if ( $( this ).parents( "[class*='has-']" ).length ) {
      var classNames = $( this ).parents( "[class*='has-']" )[ 0 ].className.split( /\s+/ );

      for ( var i = 0; i < classNames.length; ++i ) {
        if ( classNames[ i ].match( "has-" ) ) {
          $( "body > .select2-container" ).addClass( classNames[ i ] );
        }
      }
    }
  })

  // Sizing
  $('select.input-sm').next('.select2-container--bootstrap').addClass('input-sm');
  $('select.input-lg').next('.select2-container--bootstrap').addClass('input-lg');


  // Initialising icheck
  $('input.icheck').iCheck({
    checkboxClass: 'icheckbox_minimal-grey',
    radioClass: 'iradio_minimal-grey'
  });

  $('input.icheck-success').iCheck({
    checkboxClass: 'icheckbox_minimal-green',
    radioClass: 'iradio_minimal-green'
  });

  $('input.icheck-warning').iCheck({
    checkboxClass: 'icheckbox_minimal-orange',
    radioClass: 'iradio_minimal-orange'
  });

  $('input.icheck-error').iCheck({
    checkboxClass: 'icheckbox_minimal-red',
    radioClass: 'iradio_minimal-red'
  });
})(jQuery);