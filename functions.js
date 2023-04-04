const getCursorPosition = (element) => {
    let selection = document.getSelection();
    let range = new Range();
    range.setStart(element, 0);
    range.setEnd(selection.anchorNode, selection.anchorOffset);
    return range.toString().length;
};

const setCursorPosition = (element, position) => {
    let child = element.firstChild;
    while (position > 0) {
        let length = child.textContent.length;
        if (position > length) {
            position -= length;
            child = child.nextSibling;
        } else {
            if (child.nodeType == 3) return document.getSelection().collapse(child, position);
            child = child.firstChild;
        }
    }
};

const genDynHTML = (text, compareText) => {
    let letterArray = [];
    let error = false;

    for (let i = 0; i < compareText.length; i++) {
        if (text[i] && text[i] === compareText[i]) {
            letterArray.push({
                letter: text[i] || '',
                value: `<span class="correct">${text[i] || ''}</span>`
            });
        } else {
            letterArray.push({
                letter: text[i] || '',
                value: `<span class="notCorrect">${text[i] || ''}</span>`
            });
            error = true;
        }
    }

    let newHTML = '';
    let newValue = '';

    letterArray.map((item) => ((newHTML += item.value), (newValue += item.letter)));

    return {
        newHTML,
        newValue,
        newLength: letterArray.length,
        error
    };
};
