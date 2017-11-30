var ec = require('./service');

ec.holidayAvailable('UnitedStates')
    .then(
        function(trans){
            console.log(trans);
            if(trans){
                //
            }
        },
        function(err){
            console.log(err);

        }
    );