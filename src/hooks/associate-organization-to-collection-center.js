// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    if (typeof context.params.query.include != "undefined") {
      const organization = context.app.services.organizations.Model;
      context.params.sequelize = {
        raw: false,
        include: [{
          model: organization
        }]
      };
    }
    // Update the query to not include `include`
    //context.params.query = query;
    delete context.params.query.include;

    return context;
  };
};
