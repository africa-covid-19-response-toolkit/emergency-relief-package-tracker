// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (typeof context.params.internal === 'boolean') {
      return context;
    } else {
      if (context.method == "get") {
        context.result.pin_code = "";
      } else {
        context.result.data.forEach(element => {
          element.pin_code = "";
        });
        return context;
      }
    }
  };
};
