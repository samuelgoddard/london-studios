const createLocations = require(`./gatsby/createLocations`)

exports.createPages = async ({ actions, graphql }) => {
  await createLocations({ actions, graphql })
}
