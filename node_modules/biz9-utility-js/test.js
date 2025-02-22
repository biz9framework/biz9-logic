import series from 'async-series';
import { w,w_error,get_test_item,error_append,get_id,get_guid  } from './';

/* --- TEST CONFIG START --- */
/* --- TEST DATA CONFIG END --- */


describe("connect", () => {
    it("_connect", () => {
        series([
            function(call) {
                console.log('CONNECT-START');
                call()
            },
            function(call) {
                console.log('W-START');
                w('w_title','w_body');
                console.log('W-SUCCESS');
                call()
            },
            function(call) {
                console.log('W-ERROR-START');
                w_error('w_error_title','w_errow_body');
                console.log('W-ERROR-SUCCESS');
                call()
            },
            function(call) {
                console.log('W-GET-TEST-ITEM-START');
                let id= 0;
                let data_type = 'dt_blank';
                let test_item = get_test_item(id,data_type);
                console.log(test_item);
                console.log('W-GET-TEST-ITEM-SUCCERSS');
                call()
            },
            function(call) {
                console.log('ERROR-APPEND-START');
                let error = 'error1';
                let error2 = 'error2';
                let _error_append = null;
                _error_append = error_append(_error_append,error);
                _error_append = error_append(_error_append,error2);
                console.log(_error_append);
                console.log('ERROR-APPEND-SUCCERSS');
                call()
            },



            function(call) {
                // never happens, because "second thing"
                // passed an error to the done() callback
            }
        ], function(err) {
            console.log(err.message) // "another thing"
        })

     });
});


