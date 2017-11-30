var _ = require('lodash');
js2xmlparser = require('js2xmlparser');

var holidayAvailable = function (countryCode){
    /**
     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hs="http://www.holidaywebservice.com/HolidayService_v2/">
         <soapenv:Body>
             <hs:GetHolidaysAvailable>
                 <hs:countryCode>UnitedStates</hs:countryCode>
             </hs:GetHolidaysAvailable>
         </soapenv:Body>
     </soapenv:Envelope>
     */
    return new Promise(function (resolve, reject){
        var soap = require('soap');
        var url = 'http://www.holidaywebservice.com//HolidayService_v2/HolidayService2.asmx?wsdl';
        var args = {
            countryCode: countryCode
        };
        soap.createClient(url, {rejectUnauthorized: false}, function(err, client) {
            client.GetHolidaysAvailable(args, function(err, result) {
                if(err) {
                    reject(err);
                    return;
                }
                var _ = require('lodash');
                // console.log(result);
                var trans = _.get(result, 'GetHolidaysAvailableResult.HolidayCode');
                if(trans){
                    console.log('has deal', trans);
                    resolve(trans);
                }else{
                    resolve(null);
                    console.log('no deal');
                }
            });
        });
    });
};


module.exports = { 'holidayAvailable': holidayAvailable };
