(function($) {
  "use strict";
  
  // #example1 - Typeahead
  var citynames = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: '../../dist/main/plugins/typeahead/data/citynames.json',
      filter: function(list) {
        return $.map(list, function(cityname) {
          return { name: cityname }; });
      }
    }
  });
  citynames.initialize();

  $('#example1').tagsinput({
    tagClass: 'label label-success-outline',
    typeaheadjs: {
      name: 'citynames',
      displayKey: 'name',
      valueKey: 'name',
      source: citynames.ttAdapter()
    }
  });

  // #example2 - Objects as tags
  var cities = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../../dist/main/plugins/typeahead/data/cities.json'
  });
  cities.initialize();

  var elt = $('#example2');
  elt.tagsinput({
    tagClass: 'label label-info-outline',
    itemValue: 'value',
    itemText: 'text',
    typeaheadjs: {
      name: 'cities',
      displayKey: 'text',
      source: cities.ttAdapter()
    }
  });
  elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
  elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
  elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
  elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
  elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });

  // #example3 - Categorizing tags
  var cities = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../../dist/main/plugins/typeahead/data/cities.json'
  });
  cities.initialize();

  var elt = $('#example3');
  elt.tagsinput({
    tagClass: function(item) {
      switch (item.continent) {
        case 'Europe'   : return 'label label-primary';
        case 'America'  : return 'label label-danger';
        case 'Australia': return 'label label-success';
        case 'Africa'   : return 'label label-default';
        case 'Asia'     : return 'label label-warning';
      }
    },
    itemValue: 'value',
    itemText: 'text',
    typeaheadjs: {
      name: 'cities',
      displayKey: 'text',
      source: cities.ttAdapter()
    }
  });
  elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
  elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
  elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
  elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
  elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });
})(jQuery);