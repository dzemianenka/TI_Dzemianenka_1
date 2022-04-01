import encryptPorto from './portoEncrypt.js';
import showStatistic from './statistic.js';
import {readFile, saveFile} from './utils.js';

const form = document.querySelector('form');

const processForm = function (fileInput, keywordInput) {
    if (!('files' in fileInput && fileInput.files.length > 0)) {
        alert('File not chosen')
        return
    }

    // delete unnecessary letters
    const keyword = keywordInput.value.replace(new RegExp("\\W", 'g'), '');
    if (!(typeof keyword === 'string' && keyword.length > 0)) {
        alert('Keyword is not defined')
        return
    }
    keywordInput.value = keyword;

    readFile(fileInput.files[0]).then(content => {
        const result = encryptPorto(content, keyword)
        showStatistic(content, result);
        saveFile(result, 'encryptedText.txt')
    }).catch(error => console.log(error))
}

form.addEventListener('submit', function (ev) {
    ev.preventDefault()
    processForm(
        ev.target.querySelectorAll('input')[0],
        ev.target.querySelectorAll('input')[1]
    )
});
