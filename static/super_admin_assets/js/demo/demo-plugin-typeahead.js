(function($) {
  "use strict";
  
  // #example1 
  var states = [  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
               ];
  // constructs the suggestion engine
  var states = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // `states` is an array of state names defined in "The Basics"
    local: states
  });

  $('#example1').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    source: states
  });

  // #example2 - Prefetch example
  var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // url points to a json file that contains an array of country names, see
    // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
    prefetch: '../../dist/main/plugins/typeahead/data/countries.json'
  });

  // passing in `null` for the `options` arguments will result in the default
  // options being used
  $('#example2').typeahead(null, {
    name: 'terms',
    source: countries,
    ttl: 0
  });

  // #example3
  var nflTeams = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(obj) { return obj.team; },
    prefetch: '../../dist/main/plugins/typeahead/data/nfl.json'
  });

  function nflTeamsWithDefaults(q, sync) {
    if (q === '') {
      sync(nflTeams.get('Detroit Lions', 'Green Bay Packers', 'Chicago Bears', 'San Francisco 49ers', 'Chicago Bears', 'Cincinnati Bengals', 'Buffalo Bills', 'Denver Broncos', 'Cleveland Browns', 'Tampa Bay Buccaneers'));
    }

    else {
      nflTeams.search(q, sync);
    }
  }

  // #example3 - default suggestions
  $('#example3').typeahead({
    minLength: 0,
    highlight: true
  },
  {
    name: 'nfl-teams',
    display: 'team',
    source: nflTeamsWithDefaults
  });

  // #example4 - Scrollable dropdown menu
  $('#example4').typeahead({
    minLength: 0,
    highlight: true
  },
  {
    limit  : 10,
    name: 'nfl-teams',
    display: 'team',
    source: nflTeamsWithDefaults
  });

  $('#example4').bind('typeahead:open', function(ev, suggestion) {
    // Making dropdown menu scrollable
    $(this).next().next('.tt-menu').css({
      'max-height': '150px',
      'overflow'  : 'scroll'
    });
  });
})(jQuery);
  