// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const {
  FeathersError
} = require('@feathersjs/errors');

class AlreadySubmitted extends FeathersError {
  constructor(message, data) {
    super(message, 'already-submitted', 409, 'AlreadySubmitted', data);
  }
}

module.exports = (options = {}) => {
  return async context => {

    let duplicate_check = await context.service.find({
      query: {
        phone: context.data.phone
      }
    });

    if (duplicate_check.data.length > 0) {
      throw new AlreadySubmitted("You have already submitted your request");
    } else {
      return context;
    }
  };
};
