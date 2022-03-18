import date from './modules/Date';
import promise from './modules/Promise';
import { fileDate } from './modules/singles';

global.Date = date;
global.Promise = promise;
global.fileDate = fileDate;

export { fileDate, promise, date };