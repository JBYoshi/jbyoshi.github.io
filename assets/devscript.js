function checkImageSizes() {
    // The scrollbar cuts into the body width but not the media query width.
    // Temporarily hide it for these tests and then restore.
    // (Technically this means image sizes are slightly bigger than expected, but I can't really control that.)
    let oldStyle = this.document.body.style.overflowY;
    let oldScrollX = this.scrollX, oldScrollY = this.scrollY;
    try {
        this.document.body.style.overflowY = "hidden";
        for (let image of document.getElementsByTagName("img")) {
            let sizes = image.sizes;
            if (!sizes) continue;

            let value = null, fallback = null;
            for (let size of sizes.split(",").map(x => x.trim())) {
                if (size.startsWith("(")) {
                    let [_, query, thisValue] = /^(\([^\)\(]*\))(.*)/.exec(size);
                    console.log(query, "->", thisValue);
                    if (!value && window.matchMedia(query).matches) {
                        value = thisValue;
                    }
                } else if (!fallback) {
                    fallback = size;
                }
            }
            if (!value) value = fallback;
            if (!value) {
                console.error("No matching size for sizes=" + image.sizes);
                console.error(image);
                continue;
            }
            value = value.trim();

            let temp = document.createElement("div");
            document.body.appendChild(temp);
            temp.style.setProperty("position", "fixed", "important");
            temp.style.setProperty("right", "0", "important");
            temp.style.setProperty("width", value, "important");
            temp.style.setProperty("minWidth", "0", "important");
            temp.style.setProperty("display", "block", "important");
            temp.style.setProperty("maxWidth", "none", "important");
            let evaluatedWidth = temp.clientWidth;
            //temp.remove();

            let currentWidth = image.clientWidth;

            console.log(currentWidth, evaluatedWidth);
            if (Math.abs(currentWidth - evaluatedWidth) > 1) {
                console.error("Mismatch: actual width is " + currentWidth + ", but sizes has " + value + " -> " + evaluatedWidth + "px");
                image.style.border = "10px solid red";
                image.title = "CSS size mismatch";
            }
        }
    } finally {
        this.document.body.style.overflowY = oldStyle;
        this.scrollX = oldScrollX;
        this.scrollY = oldScrollY;
    }
}



if (location.pathname == "/") {
    addEventListener("load", function() {
        checkImageSizes();
        this.addEventListener("resize", checkImageSizes);
    });
}
