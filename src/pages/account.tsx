import Billing from '../components/Billing'
import PrivateRoute from '../components/PrivateRoute'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Router } from '@reach/router'
import SEO from '../components/SEO'
import Settings from '../components/Settings'
import { navigate } from 'gatsby'
import { useEffect } from 'react'

const raccount = /^\/account\/?$/

export default function Account({ location }: RouteComponentProps) {
  useEffect(() => {
    if (raccount.test(location.pathname)) {
      navigate('/account/settings')
    }
  }, [])
  return (
    <>
      <SEO
        title="Account"
        description="Your Spokestack account settings and billing"
        keywords={['spokestack', 'account', 'voice', 'artificial intelligence']}
      />
      <Router>
        <PrivateRoute path="/account/settings" component={Settings} />
        <PrivateRoute path="/account/billing" component={Billing} />
      </Router>
    </>
  )
}
