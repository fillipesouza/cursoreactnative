class HealthInfo {
    constructor(time, temperature, coughType, bodyAche, respirationLevel, lat=null, lng=null){
        this.id = null;
        this.time = time;
        this.temperature = temperature;
        this.coughType = coughType;
        this.bodyAche = bodyAche;
        this.respirationLevel = respirationLevel; RespirationLevel.SOFT;
        this.lat = lat;
        this.lng = lng;
    }
}

export const RespirationLevel = {
    OK: 'OK',
    CRITICAL: 'CRITICAL'
};

export const CoughType = {
    SOFT: 'SOFT',
    NORMAL: 'NORMAL',
    HARD: 'DRY'
};

export default HealthInfo;