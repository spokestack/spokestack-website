import * as theme from '../styles/theme'

import {
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import SVGIcon from '../components/SVGIcon'
import { createLink as createGitHubLink } from '../utils/oauthGitHub'
import { createLink as createGoogleLink } from '../utils/oauthGoogle'
import { css } from '@emotion/core'
import { rhythm } from '../styles/typography'

interface Props {
  header: string
  isCreate?: boolean
}

export default function Login({ header, isCreate }: Props) {
  const [gitHubLink, setGitHubLink] = useState<string>(null)
  const [googleLink, setGoogleLink] = useState<string>(null)
  useEffect(() => {
    setGitHubLink(createGitHubLink)
    setGoogleLink(createGoogleLink)
  }, [])
  return (
    <Layout>
      <div css={styles.container}>
        <h4 css={styles.header}>{header}</h4>
        <div css={styles.content}>
          <div css={styles.links}>
            <a href={gitHubLink} className="btn btn-large" css={styles.button}>
              <div css={styles.iconWrap}>
                <SVGIcon icon="#github" css={styles.linkIcon} />
              </div>
              {isCreate ? 'Sign up' : 'Sign in'} using GitHub
            </a>
            <a href={googleLink} className="btn btn-large" css={styles.button}>
              <div css={styles.iconWrap}>
                <SVGIcon icon="#google" css={styles.linkIcon} />
              </div>
              {isCreate ? 'Sign up' : 'Sign in'} using Google
            </a>
          </div>
          <ul css={styles.list}>
            <li>
              <SVGIcon icon="#checkmark" css={styles.iconCheckmark} />
              You pick the wakeword
            </li>
            <li>
              <SVGIcon icon="#checkmark" css={styles.iconCheckmark} />A one-stop
              shop for automatic speech recognition
            </li>
            <li>
              <SVGIcon icon="#checkmark" css={styles.iconCheckmark} />A natural
              language understanding engine that keeps your data and customer
              conversations in your app
            </li>
            <li>
              <SVGIcon icon="#checkmark" css={styles.iconCheckmark} />
              Create a custom voice for your brand
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    padding: ${rhythm(1)};
    max-width: ${DEFAULT_WIDTH};
    margin: 0 auto;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: ${rhythm(2)};
    }
  `,
  header: css`
    text-align: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      text-align: left;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row-reverse;
    }
  `,
  links: css`
    margin-bottom: ${rhythm(2)};
  `,
  button: css`
    padding-left: 0 !important;
    padding-right: 20px !important;
    margin-bottom: 20px;
  `,
  iconWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    flex-shrink: 0;
    margin-right: 15px;
    background-color: white;
    border-radius: 25px 0 0 25px;
    border-right: 1px solid ${theme.primary};
  `,
  linkIcon: css`
    fill: ${theme.primary};
    width: 25px;
    height: 25px;
  `,
  list: css`
    width: 100%;
    list-style: none;
    margin: 0;

    li {
      display: flex;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-right: ${rhythm(1)};
    }
  `,
  iconCheckmark: css`
    width: 27px;
    height: 27px;
    margin-right: 10px;
    flex-shrink: 0;
  `
}
