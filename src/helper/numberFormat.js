const numberFormat = {
  distance: (number) => {
    if (Number(number)) {
      return Number(number).toFixed(1);
    }

    return null;
  },
};

export default numberFormat;
