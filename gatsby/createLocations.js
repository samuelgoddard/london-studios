const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsLocation {
          edges {
            node {
              slug
            }
          }
        }
      }   
    `).then(result => {
      result.data.allDatoCmsLocation.edges.map(edge => {
        createPage({
          path: `locations/${edge.node.slug}`,
          component: path.resolve(`./src/templates/location.js`),
          context: { slug: edge.node.slug },
        })
      })      
      resolve()
    })
  })
}
