// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (typeof context.params.query.include != "undefined") {

      if (context.params.query.include == "organizations") {
        const sequelize = context.app.get('sequelizeClient');

        let query = `SELECT collection_points.id, collection_points.name, organizations.name AS organization_name, organizations.contact_phone
        FROM collection_points
        INNER JOIN organizations
        ON collection_points.organization_id = organizations.id`;

        let answer = await sequelize.query(query);
        context.result = answer[0];
        return context;
      }

    } else {
      return context;
    }
  };
};
