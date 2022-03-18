import date from './date';
import promise from './promise';
import { fileDate } from './singles';

global.Date = date;
global.Promise = promise;
global.fileDate = fileDate;

export { fileDate, promise, date };