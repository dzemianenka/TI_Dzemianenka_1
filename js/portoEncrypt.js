const caseInversionOffset = 32;

const encryptSymbol = function (charCode, offsetCharCode) {

    const charPos = charCode - 97;
    const offset = Math.floor((offsetCharCode - 97) / 2);
    let targetCharCode;

    if (charPos < 13) {
        targetCharCode = charCode - offset + (offset > charPos ? 26 : 13);
    } else {
        targetCharCode = charCode + offset - (charPos + offset < 26 ? 13 : 26);
    }

    return targetCharCode;
}

const encryptPorto = function (text, keyword) {

    const textLength = text.length
    const keywordLength = keyword.length
    let encryptedText = '';
    let keywordIndex = 0;

    keyword = keyword.toLowerCase();

    for (let i = 0; i < textLength; i++) {
        const char = text.charAt(i);
        const originalCharCode = char.charCodeAt(0);
        const charCode = char.toLowerCase().charCodeAt(0);

        if (charCode > 96 && charCode < 123) {
            let encryptedSymbolCharCode = encryptSymbol(charCode, keyword.charCodeAt(keywordIndex % keywordLength));
            if (originalCharCode !== charCode) {
                encryptedSymbolCharCode = encryptedSymbolCharCode - caseInversionOffset;
            }
            encryptedText += String.fromCharCode(encryptedSymbolCharCode);
            keywordIndex++;
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

export default encryptPorto;
