var popomap2;

function getPopomap(pdata) {
    popomap2 = pdata;
}

function showCustomDetial(pt, entity) {
    var id = entity.id;
    var name = entity.name;
    var x = pt.x;
    var y = pt.y;
    var gridCode = entity.gridcode;
    var emapid = entity.mapid;
    var mapid = 2;
    var divisionCode = '610400';
    if (divisionCode != null && typeof(divisionCode) != 'undefine' && divisionCode.length == 12) { //街道办要把最后一个0去除
        divisionCode = divisionCode.substr(0, 9);
    }
    if ('administrator' == 'administrator') {
        buildingIfrShow(id, name, x, y);
    } else if (emapid == mapid) {
        buildingIfrShow(id, name, x, y);
    } else if (gridCode != '' && gridCode != null) {
        if (gridCode.indexOf(divisionCode) >= 0) {
            buildingIfrShow(id, name, x, y);
        }
    }
}

function buildingIfrShow(entityId, entityName, x, y) {
    var src = "http://61.185.20.73:58888/entityManagement_viewMapEntity.html?id=" + entityId;
    popomap2.createIframePop("viewBuildingInfo_ifr", entityName, src, 330, 200, x, y);
}
