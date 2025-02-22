/*
Copyright 2019 BiZ9 Framework
Author: biz9framework@gmail.com (BiZ9 Framework LLC)
License GNU General Public License v3.0
Description: BiZ9 Framework: Test
*/

const series = require('async-series');
const moment = require('moment');
const { w,w_error,get_test_item,error_append,get_id,get_guid,get_title_url,get_date_time_str,get_date_str, get_date_time_pretty} = require('.');

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
                console.log('GET-DATE-TIME-PRETTY-START');
                let date_time = new moment().toISOString();
                console.log(get_date_time_pretty(date_time));
                console.log('GET-DATE-TIME-PRETTY-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-DATE-TIME-STR-START');
                let date_time = new moment().toISOString();
                console.log(get_date_time_str(date_time));
                console.log('GET-DATE-TIME-STR-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-DATE-STR-START');
                let date = new moment().toISOString();
                console.log(get_date_str(date));
                console.log('GET-DATE-STR-SUCCESS');
                call()
            },
            function(call) {
                console.log('GET-TITLE-URL-START');
                let title = 'my cool title';
                console.log(get_title_url(title));
                console.log('GET-TITLE-URL-SUCCESS');
                //call()
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


