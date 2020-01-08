import { Account, ApiKey } from '../types'
import React, { useState } from 'react'

import AccountCard from './AccountCard'
import AccountLayout from './AccountLayout'
import AddTokenForm from './AddTokenForm'
import { RouteComponentProps } from '@reach/router'
import SVGIcon from './SVGIcon'
import Token from './Token'
import { adjustFontSizeTo } from '../utils/typography'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import iconAddCircle from '../icons/add-circle.svg'
import { useMutation } from '@apollo/react-hooks'

const ADD_TOKEN = gql`
  mutation CreateKey($accountId: ID!, $displayName: String!) {
    createKey(accountId: $accountId, displayName: $displayName, type: PRODUCTION) {
      displayName
      id
      key
    }
  }
`

const REMOVE_TOKEN = gql`
  mutation RevokeKey($accountId: ID!, $keyId: ID!) {
    revokeKey(accountId: $accountId, keyId: $keyId)
  }
`

interface Props extends RouteComponentProps {
  account: Account
}

interface CreateKeyMutation {
  createKey: ApiKey
}

interface RemoveKeyMutation {
  revokeKey: boolean
}

export default function Settings({ account, location }: Props) {
  const [tokens, setTokens] = useState(account.apiKeys || [])
  const [showForm, setShowForm] = useState(!tokens.length)
  const [addToken, { loading: addTokenLoading }] = useMutation<CreateKeyMutation>(ADD_TOKEN, {
    onCompleted: ({ createKey: token }) => {
      setTokens(tokens.concat(token))
      setShowForm(false)
    }
  })
  const [removeToken] = useMutation<RemoveKeyMutation>(REMOVE_TOKEN)
  return (
    <AccountLayout location={location} title={account.displayName}>
      <h2>Settings</h2>
      <AccountCard title="General" id="general">
        <div className="input-wrap">
          <label>Project name</label>
          <div className="input-value">{account.displayName}</div>
        </div>
        <div className="input-wrap">
          <label>Project ID</label>
          <div className="input-value">{account.id}</div>
        </div>
      </AccountCard>
      <AccountCard
        title="API Credentials"
        id="api"
        rightContent={
          !showForm && (
            <a href="#" css={styles.addLink} onClick={() => setShowForm(true)}>
              <SVGIcon icon={iconAddCircle.id} extraCss={styles.addIcon} />
              Add token
            </a>
          )
        }>
        <p>
          This is a list of the API access tokens associated with the current account. Tokens can
          only be viewed when creating them. Remove any tokens that don&lsquo;t look familiar.
        </p>
        {!tokens.length && <p>You currently have no API keys. Generate one below.</p>}
        <div css={styles.tokens}>
          {showForm && (
            <AddTokenForm
              submitting={addTokenLoading}
              onSubmit={() => {
                addToken({
                  variables: {
                    accountId: account.id,
                    displayName: account.displayName
                  }
                })
              }}
            />
          )}
          {tokens.map((token) => (
            <Token
              key={`token-${token.id}`}
              token={token}
              onDelete={() => {
                removeToken({
                  variables: {
                    accountId: account.id,
                    keyId: token.id
                  }
                })
                setTokens(tokens.filter((t) => t.id !== token.id))
              }}
            />
          ))}
        </div>
      </AccountCard>
    </AccountLayout>
  )
}

const styles = {
  addLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${adjustFontSizeTo('16px')};
    text-decoration: none;

    &:hover svg {
      fill: var(--link-color-hover);
    }
    &:active svg {
      fill: var(--link-color-active);
    }
  `,
  addIcon: css`
    fill: var(--primary-color);
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
  `,
  tokens: css`
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
  `
}
