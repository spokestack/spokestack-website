const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const isProd = process.env.NODE_ENV === 'production'
const rdocs = /\/docs\//
const rspokestackWebsite = /.*?spokestack-website\//

function createPages(createPage, posts, template) {
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: template,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        blog: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC },
          filter: { fileAbsolutePath: { regex: "/blog/" }${
            isProd ? ',frontmatter: { draft: { ne: true } }' : ''
          } },
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        docs: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC },
          filter: { fileAbsolutePath: { regex: "/docs/" }${
            isProd ? ',frontmatter: { draft: { ne: true } }' : ''
          } },
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages
    createPages(createPage, result.data.blog.edges, path.resolve('./src/templates/blog-post.tsx'))
    // Create docs pages
    createPages(createPage, result.data.docs.edges, path.resolve('./src/templates/docs-page.tsx'))

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode, trailingSlash: false })
    const isDocsPage = rdocs.test(node.fileAbsolutePath)
    const folder = path.basename(path.dirname(node.fileAbsolutePath))
    createNodeField({
      name: 'slug',
      node,
      value: `/${isDocsPage ? 'docs' : 'blog'}${value}`
    })
    createNodeField({
      name: 'folder',
      node,
      value: folder !== 'docs' && folder !== 'blog' ? folder : null
    })
    if (isDocsPage) {
      const path = node.fileAbsolutePath.replace(rspokestackWebsite, '')
      createNodeField({
        name: 'githubLink',
        node,
        value: `https://github.com/spokestack/spokestack-website/tree/develop/${path}`
      })
    }
  }
}
