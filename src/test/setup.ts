import '@testing-library/jest-dom'

// jsdom に未実装のブラウザAPIをモック
Element.prototype.scrollIntoView = () => {}
