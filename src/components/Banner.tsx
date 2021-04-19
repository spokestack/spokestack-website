import * as theme from '../styles/theme'

import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

interface Props {
  children: React.ReactNode
  to: string
}

export default function Banner({ children, to }: Props) {
  return (
    <Link css={styles.banner} to={to}>
      <img
        css={[styles.bannerImage, styles.bannerImageLeft]}
        src="/banner.svg"
      />
      {children}
      <img
        css={[styles.bannerImage, styles.bannerImageRight]}
        src="/banner.svg"
      />
    </Link>
  )
}

const styles = {
  banner: css`
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    background-color: ${theme.header};
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    font-size: 13px;
    padding-bottom: 1px;
    z-index: 99999;

    &,
    &:visited,
    &:hover,
    &:active {
      color: ${theme.textDarkBg};
    }

    &:hover {
      background-color: ${theme.headerColor.darken(0.1).hex()};
    }
    &:active {
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.7);
    }

    p {
      margin: 0;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      font-size: 16px;
    }
  `,
  bannerImage: css`
    width: 437px;
    height: 40px;
    position: absolute;
    margin: 0;
    line-height: 0;
    display: none;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: block;
    }
  `,
  bannerImageLeft: css`
    left: 0;
  `,
  bannerImageRight: css`
    right: 0;
    transform: rotateY(180deg);
  `
}
