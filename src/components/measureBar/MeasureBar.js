export default class MeasureBar {

    static signsPerMinute(typedSigns, checkInterval) {
        return Math.ceil(typedSigns * (60 / checkInterval))
    }

    static accuracy(typedSigns, mistakes) {
        return Math.floor(100 - mistakes / typedSigns * 100)
    }
}