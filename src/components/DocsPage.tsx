import { MarkdownRemark, Query } from '../utils/graphql'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { StickyLink } from '../types'
import StickyNavLayout from '../components/StickyNavLayout'
import order from '../../content/docs/nav.json'
import sortBy from 'lodash/sortBy'

interface Props {
  post: MarkdownRemark
  selectFirst?: boolean
}

function orderLinks(links: StickyLink[]) {
  return sortBy(links, (link) => {
    return order.indexOf(link.title)
  })
}

export default function DocsPage({ post, selectFirst }: Props) {
  const links: StickyLink[] = []
  const data = useStaticQuery<Query>(docsPageQuery)
  const posts = data.allMarkdownRemark.edges
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      section: node.fields.folder,
      title: node.frontmatter.title
    })
  })
  const orderedLinks = orderLinks(links)
  if (selectFirst) {
    orderedLinks[0].forceSelect = true
  }
  return (
    <Layout>
      <SEO
        title="Docs"
        description="Documentation for the Spokestack API"
        keywords={['spokestack', 'documentation', 'voice', 'artificial intelligence']}
      />
      <StickyNavLayout links={orderedLinks}>
        {selectFirst ? (
          <h1>
            <a href={post.fields.slug}>{post.frontmatter.title}</a>
          </h1>
        ) : (
          <h1>{post.frontmatter.title}</h1>
        )}
        <p>
          <a href={post.fields.githubLink} rel="noopener noreferrer" target="_blank">
            Edit on GitHub
          </a>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StickyNavLayout>
    </Layout>
  )
}

export const docsPageQuery = graphql`
  query docsPageQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/docs/" }, frontmatter: { draft: { ne: true } } }
      limit: 10
    ) {
      edges {
        node {
          fields {
            slug
            folder
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
          }
        }
      }
    }
  }
`
