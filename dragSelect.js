(function() {
    var dragSelect = function(target) {
        this.target = target;
        this.startX = 0, startY = 0;
        this.retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";
        //this.moveSelect(target);
    };

    var $ = function(id) {
        return document.getElementById(id);
    };

    var wId = "w";//当鼠标移动时，临时的div
    var flag = false;
    var index = (+new Date());

    dragSelect.prototype.moveSelect = function() {
        this.onmousedown();
        this.onmouseup();
        this.onmousemove();
    }

    dragSelect.prototype.onmousedown = function (){
        $(this.target).onmousedown = function(e) {
            flag = true;
            try {
                var evt = window.event || e;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                startX = evt.clientX + scrollLeft;
                startY = evt.clientY + scrollTop;
                this.index++;
                var div = document.createElement("div");
                div.id = wId + index;
                div.className = "div";
                div.style.marginLeft = startX + "px";
                div.style.marginTop = startY + "px";
                document.body.appendChild(div);
            } catch(e) {
                console.log(e);
            }
        }
    };

    dragSelect.prototype.onmouseup = function (){
        $(this.target).onmouseup = function() {
            try {
                document.body.removeChild($(wId + index));
                var div = document.createElement("div");
                div.className = "retc";
                div.style.marginLeft = retcLeft;
                div.style.marginTop = retcTop;
                div.style.width = retcWidth;
                div.style.height = retcHeight;
                document.body.appendChild(div);
            } catch(e) {
                console.log(e);
            }
            flag = false;
        }
    };

    dragSelect.prototype.onmousemove = function (){
        $(this.target).onmousemove = function(e) {
            if (flag) {
                try {
                    var evt = window.event || e;
                    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                    retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft: startX) + "px";
                    retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop: startY) + "px";
                    retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
                    retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
                    $(wId + index).style.marginLeft = retcLeft;
                    $(wId + index).style.marginTop = retcTop;
                    $(wId + index).style.width = retcWidth;
                    $(wId + index).style.height = retcHeight;
                } catch(e) {
                    console.log(e);
                }
            }
        }
    };

    window.dragSelect = dragSelect;
})();