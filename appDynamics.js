(function(config) {
    window['adrum-start-time'] = new Date().getTime();
    var appKey = '';
    if (window.location.href.indexOf('app.adeo.no') > -1) {
        appKey = 'EUM-AAB-AYD';
    } else if (window.location.href.indexOf('app-q1.adeo.no') > -1) {
        appKey = 'EUM-AAB-AYC';
    }
    config.appKey = appKey;
    config.adrumExtUrlHttp = 'http://jsagent.adeo.no';
    config.adrumExtUrlHttps = 'https://jsagent.adeo.no';
    config.beaconUrlHttp = 'http://eumgw.adeo.no';
    config.beaconUrlHttps = 'https://eumgw.adeo.no';
    config.xd = { enable: false };
    config.spa = {
        spa2: true
    };
})(window['adrum-config'] || (window['adrum-config'] = {}));

if ('https:' === document.location.protocol) {
    document.write(
        unescape('%3Cscript') +
            " src='https://jsagent.adeo.no/adrum/adrum.js' " +
            " type='text/javascript' charset='UTF-8'" +
            unescape('%3E%3C/script%3E')
    );
} else {
    document.write(
        unescape('%3Cscript') +
            " src='http://jsagent.adeo.no/adrum/adrum.js' " +
            " type='text/javascript' charset='UTF-8'" +
            unescape('%3E%3C/script%3E')
    );
}
