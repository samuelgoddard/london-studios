const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsLocationRegion {
          edges {
            node {
              slug
            }
          }
        }
      }   
    `).then(result => {
      result.data.allDatoCmsLocationRegion.edges.map(edge => {
        createPage({
          path: `locations/${edge.node.slug}`,
          component: path.resolve(`./src/templates/region.js`),
          context: { slug: edge.node.slug },
        })
      })      
      resolve()
    })
  })
}
