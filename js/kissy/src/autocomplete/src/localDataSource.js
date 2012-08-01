/**
 * @fileOverview Local dataSource for Autocomplete
 * @author yiminghe@gmail.com
 */
KISSY.add("autocomplete/localDataSource", function (S) {

    /**
     * Local dataSource for autoComplete
     * @memberOf AutoComplete
     * @class
     * @param {Object} cfg config
     * @param {Array} cfg.data array of static data for autoComplete
     * @param {Object} cfg.dataSourceCfg dataSource config
     * @param {Function} cfg.dataSourceCfg.parse parse data
     */
    function LocalDataSource(cfg) {
        LocalDataSource.superclass.constructor.apply(this, arguments);
    }

    function parser(inputVal, data) {
        var ret = [],
            count = 0;
        if (!inputVal) {
            return data;
        }
        S.each(data, function (d) {
            if (d.indexOf(inputVal) != -1) {
                ret.push(d);
            }
            count++;
        });

        return ret;
    }

    LocalDataSource.ATTRS = {
        data:{
            value:[]
        },
        dataSourceCfg:{
            value:{}
        }
    };

    S.extend(LocalDataSource, S.Base, {
        /**
         * Datasource interface. How to get data for autoComplete
         * @function
         * @name AutoComplete.LocalDataSource#fetchData
         * @param {String} inputVal current active input's value
         * @param {Function} callback callback to notify autoComplete when data is ready
         * @param {Object} context callback's execution context
         */
        fetchData:function (inputVal, callback, context) {
            var dataSourceCfg = this.get("dataSourceCfg"),
                parse = dataSourceCfg.parse || parser,
                data = this.get("data");
            data = parse(inputVal, data);
            callback.call(context, data);
        }
    });

    return LocalDataSource;
});