
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

var SearchDate = {
    getCurrentDate: function() {
        return new Date().format("yyyy-MM-dd");
    },
    getLastWeekDate: function() {
        var d = new Date();
        d.setDate(d.getDate() - 7);

        return d.format("yyyy-MM-dd");
    },
    getLastMonthDate: function() {
        var d = new Date();
        d.setDate(d.getDate() - 30);

        return d.format("yyyy-MM-dd");
    },
    getLastThreeMonthDate: function () {
        var d = new Date();
        d.setDate(d.getDate() - 90);

        return d.format("yyyy-MM-dd");
    },
    getLastSixMonthDate: function () {
        var d = new Date();
        d.setDate(d.getDate() - 180);

        return d.format("yyyy-MM-dd");
    },
    getLastYearMonthDate: function () {
        var d = new Date();
        d.setDate(d.getDate() - 365);

        return d.format("yyyy-MM-dd");
    }
};



