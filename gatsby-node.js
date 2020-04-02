const createLocations = require(`./gatsby/createLocations`)
const createRegions = require(`./gatsby/createRegions`)

exports.createPages = async ({ actions, graphql }) => {
  await createLocations({ actions, graphql })
  await createRegions({ actions, graphql })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}