export function idCardValidator(rule, value, callback) {
    console.log(rule)
    console.log(value)

    if (!value) {
        callback(new Error('设置证件类型，证件号码不能为空'))
    }
    if (value) {
        let isPassport = (/^[a-zA-Z0-9]{3,21}$/ || /^(P\d{7})|(G\d{8})$/).test(value)
        if (!isPassport) {
            callback(new Error('证件号码错误'))
        }
        callback()
    }
    callback()
}
