import { toggleAdditionalParamsForFormat, noop } from './formUtils';

export default function (form, onComplete = noop) {
    const formatEl = form.querySelector('select[name=format]');

    toggleAdditionalParamsForFormat(form, formatEl);

    formatEl.addEventListener('change', () => { toggleAdditionalParamsForFormat(form, formatEl); });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/api/order', { method: 'post', body: formData })
            .then(res => res.text())
            .then((text) => {
                onComplete(null, text);
            });
    });
};
