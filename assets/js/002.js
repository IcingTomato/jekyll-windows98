function numbers() {
    // 只选择代码块，忽略内联代码
    var fields = document.querySelectorAll("pre > code");
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var num = 0;
        var select = field.innerText;
        var select_f = select.split(/\n/);
        var tab = document.createElement("table");

        // IF YOU USE MARKDOWN AND YOU HAVE BEEN GETTING ONE ADDITIONAL LINE IN YOUR TAG CODE
        // UNCOMMENT THE SECTION BELOW
        
        /* MARKDOWN SECTION /**/

        select_f.splice(-1, 1);

        /* END OF SECTION*/

        field.innerHTML = "";
        field.appendChild(tab);
        for (var j = 0; j < select_f.length; j++) {
            var line = select_f[j];
            var row = document.createElement("tr");
            var col = document.createElement("th");
            var colc = document.createElement("th");
            col.innerText = num + 1;
            colc.innerText = line;
            row.appendChild(col);
            row.appendChild(colc);
            tab.appendChild(row);
            num = num + 1;

            // STYLE SECTION - If you want, change it below

            col.style.textAlign = "right";
            colc.style.textAlign = "left";
            tab.style.border = "0";
            col.style.border = "0";
            colc.style.border = "0";
            col.style.padding = "3px";
            colc.style.padding = "3px";
            col.style.borderRight = "2px solid #777777";

            // END OF SECTION
        }
    }
}

window.onload = function() {
    numbers();
};