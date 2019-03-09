class Outline {
    constructor() {
        this.depth = 0;
        this.counters = [0];
    }

    startSection() {
        if (this.depth == this.counters.length) this.counters.push(0);
        this.counters[this.depth]++;
        this.depth++;
    }

    currentHeader(header) {
        let line = this.counters[0];
        for (let i = 1; i < this.depth; i++) {
            line += '.' + this.counters[i];
        }
        console.log(line + ': ' + header);
    }

    endSection() {
        this.depth--;
        if (this.counters.length > this.depth + 1) this.counters.pop();
    }
}

function getH(element) {
    let n = element.nodeName.toLowerCase();
    if (n == 'h1') return 1;
    if (n == 'h2') return 2;
    if (n == 'h3') return 3;
    if (n == 'h4') return 4;
    if (n == 'h5') return 5;
    if (n == 'h6') return 6;
    return null;
}

function isHeadingContent(element) {
    return !!getH(element);
}

function isSectioningContent(element) {
    let n = element.nodeName.toLowerCase();
    return n == 'article' || n == 'aside' || n == 'nav' || n == 'section';
}

function isSectioningRoot(element) {
    let n = element.nodeName.toLowerCase();
    return n == 'blockquote' || n == 'body' || n == 'details' || n == 'dialog' || n == 'fieldset' || n == 'figure' || n == 'td';
}

function getOutline(useHtml5Elements) {
    let outline = new Outline();
    function recurseContainer(container) {
        outline.startSection();
        let header = undefined;
        function assertHeader() {
            if (header === undefined) {
                header = null;
                outline.currentHeader('No header for ' + container.nodeName);
            }
        }
        let headingLevels = [];
        function recurseContent(element) {
            if (element.hidden) return; // TODO check if this is the right property
            if (isSectioningContent(element) && useHtml5Elements) {
                assertHeader();
                recurseContainer(element);
            } else if (isSectioningRoot(element) && useHtml5Elements) {
                // This outline is *isolated* from the outside.
                // W3C says ignore it. I'll use it anyways just to test.
                assertHeader();
                recurseContainer(element);
            } else if (isHeadingContent(element)) {
                if (header === undefined) {
                    header = element;
                } else {
                    while (headingLevels.length > 1 && headingLevels[headingLevels.length - 1] <= getH(element)) {
                        headingLevels.pop();
                        outline.endSection();
                    }
                    outline.startSection();
                }
                outline.currentHeader(element.innerText);
                headingLevels.push(getH(element));
            } else {
                for (let child of element.childNodes) {
                    recurseContent(child);
                }
            }
        }
        for (let child of container.childNodes) {
            recurseContent(child);
        }
        assertHeader();
        while (headingLevels.length > 1) {
            headingLevels.pop();
            outline.endSection();
        }
        outline.endSection();
    }
    recurseContainer(document.body);
}

function getOutlines() {
    console.log('Basic outline');
    getOutline(false);
    console.log('HTML5 outline');
    getOutline(true);
}

if (document.getElementById('sidebar-main')) {
    getOutlines();
} else {
    console.log('Window is in state ' + window.readyState);
    window.onload = getOutlines;
}