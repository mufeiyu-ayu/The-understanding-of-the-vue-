const originArrMethods = Array.prototype,
      newArrMethods = Object.create(originArrMethods);

const ARR_METHODS = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
];

ARR_METHODS.map((method) => {
  newArrMethods[method] = function (...args) {
    const result = originArrMethods[methods].apply(this, args),
          ob = this.__ob__;

    let newArr;

    switch (method) {
      case 'push':
      case 'unshift':
        newArr = args;
        break;
      case 'splice':
        newArr = args.slice(2);
        break;
      default:
        break;
    }

    if (newArr) ob.observeArr(newArr);

    return result;
  }
})

export {
  newArrMethods
}