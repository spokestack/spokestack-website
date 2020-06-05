import { PageRendererProps, graphql } from 'gatsby'

import BlueCard from '../components/BlueCard'
import Layout from '../components/Layout'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { MIN_TEXT_WIDTH } from '../styles/theme'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import SupportCallout from '../components/SupportCallout'
import { css } from '@emotion/core'

interface Props extends PageRendererProps {
  data: Query
}

export default function Support({ data }: Props) {
  const { social, contact } = data.site.siteMetadata
  return (
    <Layout>
      <SEO
        title="Support"
        longTitle="Spokestack Support"
        description={`We're here to help. Find support through multiple channels,
          including GitHub, Twitter, Discourse, and Stack Overflow.`}
      />
      <div css={styles.container}>
        <section css={styles.content}>
          <header css={styles.header}>
            <h1>Support</h1>
            <p>
              We offer multiple support channels that best suit the topic and
              product. Choose from below the one that would best fits your
              needs.
            </p>
          </header>
          <div css={styles.methods}>
            <SupportCallout
              extraCss={styles.callout}
              imageUrl="/support/github.svg"
              name="GitHub"
              slug={social.github}
              text="Open source libaries &amp; projects"
            />
            <SupportCallout
              extraCss={styles.callout}
              imageUrl="/support/twitter.svg"
              name="Twitter"
              slug={social.twitter}
              text="Follow us for service updates, tutorials, and tips"
            />
            <SupportCallout
              extraCss={styles.callout}
              imageUrl="/support/discourse.svg"
              name="Forum"
              slug={social.forum}
              text="Questions answered by Spokestack &amp; the community"
            />
            <SupportCallout
              extraCss={styles.callout}
              imageUrl="/support/stackoverflow.png"
              name="Stack Overflow"
              slug={social.stackoverflow}
              text="Questions answered by Spokestack and the community"
            />
          </div>
        </section>
        <BlueCard
          small
          button={
            <a href={`mailto:${contact.email}`} className="btn">
              Contact us
            </a>
          }
          title="Download Spokestack Studio"
          text="Preview the capabilities of a voice userinterface powered by Spokestack."
        />
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    padding: 50px 0;
  `,
  content: css`
    padding: 0 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      max-width: ${MIN_TEXT_WIDTH};
      margin: 0 auto;
      padding: 0;
    }
  `,
  header: css`
    p {
      margin: 0;
    }
  `,
  methods: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 75px 0;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 25px;
    }
  `,
  callout: css`
    margin-bottom: 25px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-bottom: 0;
    }
  `
}

export const pageQuery = graphql`
  query supportQuery {
    site {
      siteMetadata {
        contact {
          email
        }
        social {
          forum
          github
          stackoverflow
          twitter
        }
      }
    }
  }
`
