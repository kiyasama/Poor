/*-------------------------- +
  获取id, class, tagName
 +-------------------------- */
var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass;
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem);
	}
};
var dragMinWidth = 250;
var dragMinHeight = 124;
/*-------------------------- +
  拖拽函数
 +-------------------------- */
function drag(oDrag, childDiv, handle, initalWidth, initalHeight) {
	var disX = dixY = 0;
	var oMin = get.byClass("min", childDiv)[0];
	var oMax = get.byClass("max", childDiv)[0];
	var oRevert = get.byClass("revert", childDiv)[0];
	var oClose = get.byClass("close", childDiv)[0];

	/*dragMinWidth = oDrag.offsetWidth;
	dragMinHeight = oDrag.offsetHeight;*/

	dragMinWidth = initalWidth;
	dragMinHeight = initalHeight;

	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function(event) {
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;

		document.onmousemove = function(event) {
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			//			var maxL = document.documentElement.clientWidth + document.documentElement.scrollLeft - oDrag.offsetWidth;
			//			var maxT = document.documentElement.clientHeight + document.documentElement.scrollTop - oDrag.offsetHeight;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

			iL >= maxL && (iL = maxL - 5);
			iT >= maxT && (iT = maxT - 7);
			//			iT >= maxT && (iT = maxT + document.body.scrollTop - 7);
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);

			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";

			return false
		};

		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};
	//最大化按钮
	oMax.onclick = function() {
		oDrag.style.top = oDrag.style.left = 0;
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		childDiv.style.width = document.documentElement.clientWidth - 2 + "px";
		childDiv.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//还原按钮
	oRevert.onclick = function() {
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		childDiv.style.width = dragMinWidth + "px";
		childDiv.style.height = dragMinHeight + "px";

		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
		//		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + document.body.scrollTop + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//最小化按钮
	/*oMin.onclick = oClose.onclick = function ()
	{
		oDrag.style.display = "none";
		var oA = document.createElement("a");
		oA.className = "open";
		oA.href = "javascript:;";
		oA.title = "还原";
		document.body.appendChild(oA);
		oA.onclick = function ()
		{
			oDrag.style.display = "block";
			document.body.removeChild(this);
			this.onclick = null;
		};
	};*/
	//阻止冒泡
	/*oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true
	};*/
	oMax.onmousedown = oRevert.onmousedown = function(event) {
		this.onfocus = function() {
			this.blur()
		};
		(event || window.event).cancelBubble = true
	};
}
/*-------------------------- +
  改变大小函数
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
	handle.onmousedown = function(event) {
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;

		document.onmousemove = function(event) {
			var event = event || window.event;

			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
			var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;

			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");

			iW < dragMinWidth && (iW = dragMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");

			iH < dragMinHeight && (iH = dragMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");

			if ((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;

			return false;
		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};
