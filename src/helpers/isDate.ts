import moment from 'moment';

const isDate = (value: number): boolean => {
  if (!value) {
    return false;
  } else {
    const date = moment(value);
    if (date.isValid()) {
      return true;
    } else {
      return false;
    }
  }
}

export default isDate;