const initStatisticStorage = function () {
    const storage = {};

    for (let i = 97; i < 123; i++) {
        storage[i] = 0;
    }
    return storage;
}

const getStatistic = function (text) {
    const storage = initStatisticStorage();

    for (let charCode in storage) {
        const matched = text.match(new RegExp(String.fromCharCode(charCode), 'gi'));
        storage[charCode] = matched === null ? 0 : matched.length;
    }
    return storage;
}

const getInnerRow = function (absCount, relativeCount, width) {
    const row = document.createElement('div');
    row.classList.add('row-inner');
    row.style.width = width + '%';
    row.innerText = absCount + ' раз / ' + (relativeCount * 100).toFixed(2) + '%';
    return row;
}

const showStatistic = function (sourceText, encryptedText) {

    // Counting the letters with the highest income
    const sourceStatistic = getStatistic(sourceText);
    const encryptedStatistic = getStatistic(encryptedText);
    let maxCount = 0;

    // Show the result table
    const tmpTbody = document.createElement('tbody');

    for (let charCode in sourceStatistic) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');

        td1.innerText = String.fromCharCode(charCode);
        td2.innerText = sourceStatistic[charCode];
        td3.innerText = (sourceStatistic[charCode] / sourceText.length * 100).toFixed(2) + '%';
        td4.innerText = encryptedStatistic[charCode];
        td5.innerText = (encryptedStatistic[charCode] / encryptedText.length * 100).toFixed(2) + '%';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tmpTbody.appendChild(tr);

        maxCount = Math.max(maxCount, sourceStatistic[charCode], encryptedStatistic[charCode])
    }

    const statisticTable = document.getElementById('statistic').querySelector('table');
    const statisticTbody = statisticTable.querySelector('tbody');

    if (statisticTbody !== null) {
        statisticTbody.remove();
    }

    statisticTable.appendChild(tmpTbody);

    document.getElementById('statistic').style.display = 'block';

    // Show graphs
    const chartsContainer = document.getElementById('charts');
    const tmpCharts = document.createElement('div');

    for (let charCode in sourceStatistic) {
        const row = document.createElement('div');
        const relativeWeightInSourceText = (sourceStatistic[charCode] / maxCount * 100).toFixed(2);
        const relativeWeightInEncryptedText = (encryptedStatistic[charCode] / maxCount * 100).toFixed(2);
        row.classList.add('row');

        const label = document.createElement('div');
        label.innerText = String.fromCharCode(charCode) + ':';
        label.classList.add('row-label')
        row.appendChild(label);

        row.appendChild(getInnerRow(
            sourceStatistic[charCode],
            sourceStatistic[charCode] / sourceText.length,
            relativeWeightInSourceText
        ));

        row.appendChild(getInnerRow(
            encryptedStatistic[charCode],
            encryptedStatistic[charCode] / encryptedText.length,
            relativeWeightInEncryptedText
        ));

        tmpCharts.appendChild(row);
    }

    chartsContainer.innerHTML = '';
    chartsContainer.appendChild(tmpCharts);
}

export default showStatistic;
