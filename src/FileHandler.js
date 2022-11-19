export default class FileHandler {
    constructor(file) {
        this.file = file
        this.name = file.name
        this.size = file.size
        this.type = file.type
    }

    isSizeLessThan2MB() {
        return this.size / 1024 / 1024 < 2
    }

    isTypeEqualToPngOrJpg() {
        return this.type === 'image/jpeg' || this.type === 'image/png'
    }

    isTypeEqualToTxt() {
        return this.type === 'text/plain'
    }

    getBase64URL() {
        const reader = new FileReader()
        reader.readAsDataURL(this.file)
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = ev => {
                reject(ev)
            }
        })
    }

    getStringFromBlob() {
        const reader = new FileReader()
        reader.readAsText(this.file)
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = ev => {
                reject(ev)
            }
        })
    }

    getBlobFromString(string) {
        return new Blob([string], {type: 'text/plain'})
    }

}