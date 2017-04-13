/**
 * Common Filters
 */
angular.module("hotstar.main")
    //setting date format
    .filter('dateFormat', function($filter)
    {
        return function(input)
        {
            if (input == null) {
                return "";
            }
            if(input == "Live"){ return ""; }
            var _date = $filter('date')(new Date(input), 'MM/dd/yy');
            return _date;
        };
    })
    //setting status filter
    .filter('statusFilter', function($filter)
    {
        return function(input, val)
        {
            var arr  =  $filter("filter")(input,{status: val});
            return (arr ? arr.length : 0);
        };
    })
    .filter('ObjectLimitTo', [function(){
        return function(obj, limit){
            var keys = Object.keys(obj);
            if(keys.length < 1){
                return [];
            }

            var ret = {},
                count = 0;
            angular.forEach(keys, function(key, arrayIndex){
                if(count >= limit){
                    return false;
                }
                ret[key] = obj[key];
                count++;
            });
            return ret;
        };
    }])
    //string truncate
    .filter('truncate', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) { return input; }
            if (chars <= 0) { return ''; }
            if (input && input.length > chars) {
                input = input.substring(0, chars-1);
                /*if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }*/
               // input = input.substr(0, input.length -1);

                return input + '...';
            }
            return input;
        };
    })
    //camelcase string
    .filter('titleCaseFilter', function()
    {
        return function(input) {
            input = input || '';
            return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    })
    //make a value absolute
    .filter('abs', function () {
    return function(val) {
        if (isNaN(val)) {
            return "";
        }
        if (val === null) {
            return "";
        }
        return Math.abs(val);
    };




});
