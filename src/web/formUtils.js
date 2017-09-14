export function disableAddOptions(addOptionsBlock, disabled = true) {
    addOptionsBlock.style.display = disabled ? 'none': 'block';
    const controls = addOptionsBlock.querySelectorAll('input, select');

    controls.forEach((el) => {
        if (disabled) {
            el.setAttribute('disabled', 'disabled');
        } else {
            el.removeAttribute('disabled');
        }
    });
}

export function toggleAdditionalParamsForFormat (form, formatEl) {
    const additionalCSV = form.querySelector('.additional-for-csv');
    const additionalSQL = form.querySelector('.additional-for-sql');

    switch (formatEl.value) {
        case 'csv':
            disableAddOptions(additionalCSV, false);
            disableAddOptions(additionalSQL);
            break;
        case 'sql':
            disableAddOptions(additionalCSV);
            disableAddOptions(additionalSQL, false);
            break;
        default:
            disableAddOptions(additionalCSV);
            disableAddOptions(additionalSQL);
    }
}

export function noop () {}
