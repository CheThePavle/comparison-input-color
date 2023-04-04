const inputDiv = document.getElementById('inputDiv');
const valueToCompare  = 'test';

inputDiv.addEventListener(
    'input',
    function (e) {
        const text = e.target.innerText;
        if (text.trim() === '') {
            // setNewValue('');
            // getValue('');
            // setErrorCompare(true);
            return (e.target.innerHTML = '');
        }

        if (text.length > valueToCompare.length) {
            const pos = getCursorPosition(inputDiv);
            const { newHTML, newValue, newLength, error } = genDynHTML(
                text.substr(0, valueToCompare.length),
                valueToCompare
            );
            e.target.innerHTML = newHTML;
            // getValue(newValue);
            // setErrorCompare(error);
            return setCursorPosition(inputDiv, pos > newLength ? newLength : pos);
        }

        const pos = getCursorPosition(inputDiv);
        const { newHTML, newValue, newLength, error } = genDynHTML(text, valueToCompare);
        e.target.innerHTML = newHTML;

        // getValue(newValue);
        setCursorPosition(inputDiv, pos === newLength ? newLength : pos);

        // setNewValue(newValue);
        // setErrorCompare(error);
    },
    false
);
