import './index.css';
import orderFormController from './orderForm';
import groupFormController from './groupForm';
import logController from './log';

const printToLog = logController(document.querySelector('textarea[name=log]'));

orderFormController(document.querySelector('form[name=order]'), (err, text) => printToLog(text));
groupFormController(document.querySelector('form[name=group]'), (err, text) => printToLog(text));

