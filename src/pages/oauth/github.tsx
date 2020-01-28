import React from 'react'
import { getAccessToken } from '../../utils/oauthGitHub'
import OAuth from '../../components/OAuth'
import parseQuery from '../../utils/parseQuery'

export default function GitHubOAuth() {
  async function checkAuth() {
    const query = parseQuery(window.location.search)
    const [authError] = await getAccessToken(query.code, query.state)
    if (authError) {
      return (
        authError.message ||
        'There was problem authorizing with GitHub. Please try again.'
      )
    }
  }
  return <OAuth checkAuth={checkAuth} />
}
