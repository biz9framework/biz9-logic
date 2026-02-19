const series = require('async-series');
const {Data_Logic,Value_Type,Table} = require('./index');
const {Log,Num,Str,Obj} = require("/home/think1/www/doqbox/biz9-framework/biz9-utility/source");
const {Scriptz}= require('biz9-scriptz');
class Project_Table{
    static PRODUCT='product_biz';
}
//9_connect
describe("connect", () => {
    it("_connect", () => {
        series([
            function(call) {
                console.log('CONNECT-BASE-START');
                let data = Data_Logic.get(Project_Table.PRODUCT,0,{data:{cool:'apple',bean:'butter'}});
                let copy_data = Data_Logic.copy(Project_Table.PRODUCT,data);
                Log.w('ccc',copy_data);



                // -- POST-START --//
                //Log.w('11_parent',parent);

            }
        ], function(err) {
            console.log(err.message) // "another thing"
        })
    });
});
