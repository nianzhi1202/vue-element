export class Label {
    constructor({ position, text, style, wtBaiduMap }) {
        this.position = position
        this.style = style || { }

        let defaultStyle = {
            padding: '3px 5px',
            border: '1px solid #0f96db',
            borderRadius: '3px',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '22px',
            transform: 'translate(-50%)'
        }
        this.style = Object.assign(defaultStyle, this.style)
        this.text = text
        this.wtBaiduMap = wtBaiduMap
    }
}
