import { MIN_TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

interface Props {
  avatar: React.ReactNode
  name: string
  title: string
}

export default function TeamMember({ avatar, name, title }: Props) {
  return (
    <div css={styles.teamMember}>
      {avatar}
      <h3>{name}</h3>
      <p>{title}</p>
    </div>
  )
}

const styles = {
  teamMember: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    max-width: 185px;
    margin: 0 auto ${rhythm(1)};
    height: 330px;

    h3 {
      margin-top: ${rhythm(1)};
    }
    p {
      margin: 0;
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      margin-bottom: ${rhythm(2)};
    }
  `
}
