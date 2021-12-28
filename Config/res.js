'use strict'

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'count': values.length,
        'values': values
    }

    res.json(data);
    res.end();
}