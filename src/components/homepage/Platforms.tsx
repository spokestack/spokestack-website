import React from 'react'
import Section from './Section'

export default function Platforms() {
  return (
    <Section
      id="platforms"
      image={{ url: '/homepage/platforms.svg', maxWidth: '501px', left: true }}
      header="Develop across platforms using one API"
      text={`Managing voice interfaces across iOS, Android, and web
      can be complicated, time consuming, and expensive.
      With Spokestack, spend more time helping customers
      and less time managing platforms.`}
    />
  )
}
