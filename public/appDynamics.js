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
