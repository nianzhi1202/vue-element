export class Marker {
    constructor({id, position, size, infoWindow, label, icon, wtBaiduMap, onClick, open, rightClick}) {
        this.id = id
        this.position = position
        this.size = size || {width: 32, height: 32}
        this.infoWindow = infoWindow
        this.onClick = onClick
        this.icon = icon || 'https://api.map.baidu.com/images/marker_red_sprite.png'
        this.label = label
        this.wtBaiduMap = wtBaiduMap
        this.rightClick = rightClick

        // eslint-disable-next-line no-unused-vars
        this.click = (e) => {
            this._click(e)
        }

        if (open === true) {
            if (typeof this.infoWindow === 'object') {
                this.infoWindow.open()
            }
        }
    }

    getIcon() {
        return {
            url: this.icon,
            size: this.size
        }
    }

    _click(e) {
        if (typeof this.infoWindow === 'object') {
            this.infoWindow.open()
        }
        typeof this.onClick === 'function' ? this.onClick(e, this) : ''
    }
}
