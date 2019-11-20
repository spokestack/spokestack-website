import { Global, SerializedStyles, css } from '@emotion/core'

import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
  extraCss?: SerializedStyles
}

export default function Card({ title, children, extraCss }: Props) {
  return (
    <div css={[styles.card, extraCss]} className="card">
      <Global
        styles={css`
          .card ul {
            margin-bottom: 0;
          }
          .card li:last-child {
            margin-bottom: 0;
          }
          .card li p {
            margin: 0;
          }
        `}
      />
      <h3 css={styles.cardHeader}>{title}</h3>
      <div css={styles.content}>{children}</div>
    </div>
  )
}

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid var(--secondary-color);
    border-radius: 7px;
    overflow: hidden;
  `,
  cardHeader: css`
    background-color: var(--secondary-color);
    color: var(--primary-color);
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin: 0;
  `,
  content: css`
    padding: 20px;
  `
}
