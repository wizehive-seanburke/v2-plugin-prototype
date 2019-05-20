const getHeight = () => {
    const document = window.document;
    const bodyTop = Math.max(document.body.offsetTop, 0);
    const documentTop = Math.max(document.documentElement.offsetTop, 0);
    const bodyScroll = document.body.scrollHeight + bodyTop;
    const bodyOffset = document.body.offsetHeight + bodyTop;
    const documentScroll = document.documentElement.scrollHeight + documentTop;
    const documentOffset = document.documentElement.offsetHeight + documentTop;
    return Math.max(bodyScroll, bodyOffset, documentScroll, documentOffset);
};

const getWidth = () => {
    const document = window.document;
    const bodyLeft = Math.max(document.body.offsetLeft, 0);
    const documentLeft = Math.max(document.documentElement.offsetLeft, 0);
    const bodyScroll = document.body.scrollWidth + bodyLeft;
    const bodyOffset = document.body.offsetWidth + bodyLeft;
    const documentScroll = document.documentElement.scrollWidth + documentLeft;
    const documentOffset = document.documentElement.offsetWidth + documentLeft;
    return Math.max(bodyScroll, bodyOffset, documentScroll, documentOffset);
}

class ZnSize {
    constructor(client) {
        this.client = client;
        this.timer = null;
    }
    setSize(dimensions) {
        console.log('In setSize');
        if (typeof dimensions === 'undefined') {
            dimensions = {};
        }
        if (!dimensions.height) {
            dimensions.height = getHeight() + 'px';
        }
        if (!dimensions.width) {
            dimensions.width =  getWidth() + 'px';
        }
        console.log(dimensions);
        this.client.call('resize', {dimensions}, null, Infinity);
    }
    autoSize(timeout) {
        console.log('In autosize');
        typeof timeout === 'number' || typeof timeout === 'undefined' || timeout
            ? this.timer = setInterval(() => {
                this.setSize()
            }, timeout)
            : clearTimeout(this.timer);
    }

}

export default ZnSize;
