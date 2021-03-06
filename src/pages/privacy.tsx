import { PageRendererProps, graphql } from 'gatsby'

import { DEFAULT_WIDTH } from '../styles/theme'
import Layout from '../components/Layout'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/react'

interface Props extends PageRendererProps {
  data: Query
}

export default function Privacy({ data }: Props) {
  const email = data!.site!.siteMetadata!.contact!.email!
  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <div css={styles.container}>
        <h1>Privacy Policy</h1>
        <p>Last updated May 28, 2020</p>
        <p>
          Thank you for choosing to be part of our community at Pylon ai, inc. ,
          doing business as Spokestack (“Spokestack”, “we”, “us”, or “our”). We
          are committed to protecting your personal information and your right
          to privacy. If you have any questions or concerns about our policy, or
          our practices with regards to your personal information, please
          contact us at <a href={`mailto:${email}`}>{email}</a>.
        </p>
        <p>
          When you visit our website{' '}
          <a href="https://www.spokestack.io/">https://www.spokestack.io</a>,
          mobile application, Facebook application, and use our services, you
          trust us with your personal information. We take your privacy very
          seriously. In this privacy policy, we seek to explain to you in the
          clearest way possible what information we collect, how we use it and
          what rights you have in relation to it. We hope you take some time to
          read through it carefully, as it is important. If there are any terms
          in this privacy policy that you do not agree with, please discontinue
          use of our Sites or Apps and our services.
        </p>
        <p>
          This privacy policy applies to all information collected through our
          website (such as{' '}
          <a href="https://www.spokestack.io/">https://www.spokestack.io</a>),
          mobile application, Facebook application, (&ldquo;Apps&rdquo;), and/or
          any related services, sales, marketing or events (we refer to them
          collectively in this privacy policy as the &ldquo;Services&rdquo;).
        </p>
        <p>
          Please read this privacy policy carefully as it will help you make
          informed decisions about sharing your personal information with us.
        </p>
        <h3>TABLE OF CONTENTS</h3>
        <p>
          <a href="/privacy#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a>
        </p>
        <p>
          <a href="/privacy#infouse">2. HOW DO WE USE YOUR INFORMATION?</a>
        </p>
        <p>
          <a href="/privacy#infoshare">
            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </a>
        </p>
        <p>
          <a href="/privacy#inforetain">
            4. HOW LONG DO WE KEEP YOUR INFORMATION?
          </a>
        </p>
        <p>
          <a href="/privacy#infosafe">
            5. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </a>
        </p>
        <p>
          <a href="/privacy#infominors">
            6. DO WE COLLECT INFORMATION FROM MINORS?
          </a>
        </p>
        <p>
          <a href="/privacy#privacyrights">7. WHAT ARE YOUR PRIVACY RIGHTS?</a>
        </p>
        <p>
          <a href="/privacy#DNT">8. CONTROLS FOR DO-NOT-TRACK FEATURES</a>
        </p>
        <p>
          <a href="/privacy#caresidents">
            9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </a>
        </p>
        <p>
          <a href="/privacy#policyupdates">
            10. DO WE MAKE UPDATES TO THIS POLICY?
          </a>
        </p>
        <p>
          <a href="/privacy#contact">
            11. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
          </a>
        </p>
        <h4 id="infocollect">1. WHAT INFORMATION DO WE COLLECT?</h4>
        <p>Personal information you disclose to us</p>
        <p>
          <em>In Short:</em>{' '}
          <em>We collect personal information that you provide to us.</em>
        </p>
        <p>
          We collect personal information that you voluntarily provide to us
          when registering at the Services or Apps, expressing an interest in
          obtaining information about us or our products and services, when
          participating in activities on the Services or Apps or otherwise
          contacting us.
        </p>
        <p>
          The personal information that we collect depends on the context of
          your interactions with us and the Services or Apps, the choices you
          make and the products and features you use. The personal information
          we collect can include the following:
        </p>
        <p>
          Publicly Available Personal Information. We collect first name, maiden
          name, last name, and nickname; phone numbers; email addresses;
          business email; business phone number; and other similar data.
        </p>
        <p>
          Payment Data. We collect data necessary to process your payment if you
          make purchases, such as your payment instrument number (such as a
          credit card number), and the security code associated with your
          payment instrument. All payment data is stored by Stripe. You may find
          their privacy policy link(s) here:{' '}
          <a href="https://stripe.com/privacy">https://stripe.com/privacy</a>.
        </p>
        <p>
          All personal information that you provide to us must be true, complete
          and accurate, and you must notify us of any changes to such personal
          information.
        </p>
        <p>Information collected through our Apps</p>
        <p>
          <em>In Short: </em>{' '}
          <em>
            We may collect information regarding your mobile device, push
            notifications, and Facebook permissions when you use our apps.
          </em>
        </p>
        <p>
          If you use our Apps, we may also collect the following information:
        </p>
        <p>
          <em>Mobile Device Access.</em> We may request access or permission to
          certain features from your mobile device, including your mobile
          device&rsquo;s bluetooth, camera, microphone, speech recognition, and
          other features. If you wish to change our access or permissions, you
          may do so in your device&rsquo;s settings.
        </p>
        <p>
          <em>Mobile Device Data.</em> We may automatically collect device
          information (such as your mobile device ID, model and manufacturer),
          operating system, version information and IP address.
        </p>
        <p>
          <em>Push Notifications.</em> We may request to send you push
          notifications regarding your account or the mobile application. If you
          wish to opt-out from receiving these types of communications, you may
          turn them off in your device&rsquo;s settings.
        </p>
        <p>
          <em>Facebook Permissions.</em> We by default access your{' '}
          <a href="https://www.facebook.com/about/privacy/">Facebook</a> basic
          account information, including your name, email, gender, birthday,
          current city, and profile picture URL, as well as other information
          that you choose to make public. We may also request access to other
          permissions related to your account, such as friends, checkins, and
          likes, and you may choose to grant or deny us access to each
          individual permission. For more information regarding Facebook
          permissions, refer to the{' '}
          <a href="https://developers.facebook.com/docs/facebook-login/permissions">
            Facebook Permissions Reference
          </a>{' '}
          page.
        </p>
        <h4 id="infouse">2. HOW DO WE USE YOUR INFORMATION?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            We process your information for purposes based on legitimate
            business interests, the fulfillment of our contract with you,
            compliance with our legal obligations, and/or your consent.
          </em>
        </p>
        <p>
          We use personal information collected via our Services or Apps for a
          variety of business purposes described below. We process your personal
          information for these purposes in reliance on our legitimate business
          interests, in order to enter into or perform a contract with you, with
          your consent, and/or for compliance with our legal obligations. We
          indicate the specific processing grounds we rely on next to each
          purpose listed below.
        </p>
        <p>We use the information we collect or receive:</p>
        <ul>
          <li>
            To facilitate account creation and logon process. If you choose to
            link your account with us to a third party account (such as your
            Google or Facebook account), we use the information you allowed us
            to collect from those third parties to facilitate account creation
            and logon process for the performance of the contract.
          </li>
          <li>
            Administer prize draws and competitions. We may use your information
            to administer prize draws and competitions when you elect to
            participate in competitions.
          </li>
          <li>
            Request Feedback. We may use your information to request feedback
            and to contact you about your use of our Services or Apps.
          </li>
          <li>
            To manage user accounts. We may use your information for the
            purposes of managing our account and keeping it in working order.
          </li>
        </ul>
        <h4 id="infoshare">3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations.
          </em>
        </p>
        <p>We may process or share data based on the following legal basis:</p>
        <ul>
          <li>
            Consent: We may process your data if you have given us specific
            consent to use your personal information in a specific purpose.
          </li>

          <li>
            Legitimate Interests: We may process your data when it is reasonably
            necessary to achieve our legitimate business interests.
          </li>

          <li>
            Performance of a Contract: Where we have entered into a contract
            with you, we may process your personal information to fulfill the
            terms of our contract.
          </li>

          <li>
            Legal Obligations: We may disclose your information where we are
            legally required to do so in order to comply with applicable law,
            governmental requests, a judicial proceeding, court order, or legal
            process, such as in response to a court order or a subpoena
            (including in response to public authorities to meet national
            security or law enforcement requirements).
          </li>

          <li>
            Vital Interests: We may disclose your information where we believe
            it is necessary to investigate, prevent, or take action regarding
            potential violations of our policies, suspected fraud, situations
            involving potential threats to the safety of any person and illegal
            activities, or as evidence in litigation in which we are involved.
          </li>
        </ul>
        <p>
          More specifically, we may need to process your data or share your
          personal information in the following situations:
        </p>

        <ul>
          <li>
            Vendors, Consultants and Other Third-Party Service Providers. We may
            share your data with third party vendors, service providers,
            contractors or agents who perform services for us or on our behalf
            and require access to such information to do that work. Examples
            include: payment processing, data analysis, email delivery, hosting
            services, customer service and marketing efforts. We may allow
            selected third parties to use tracking technology on the Services or
            Apps, which will enable them to collect data about how you interact
            with the Services or Apps over time. This information may be used
            to, among other things, analyze and track data, determine the
            popularity of certain content and better understand online activity.
            Unless described in this Policy, we do not share, sell, rent or
            trade any of your information with third parties for their
            promotional purposes.
          </li>
          <li>
            Business Transfers. We may share or transfer your information in
            connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business to another company.
          </li>
          <li>
            Third-Party Advertisers. We may use third-party advertising
            companies to serve ads when you visit the Services or Apps. These
            companies may use information about your visits to our Website(s)
            and other websites that are contained in web cookies and other
            tracking technologies in order to provide advertisements about goods
            and services of interest to you.
          </li>
          <li>
            Affiliates. We may share your information with our affiliates, in
            which case we will require those affiliates to honor this privacy
            policy. Affiliates include our parent company and any subsidiaries,
            joint venture partners or other companies that we control or that
            are under common control with us.
          </li>
          <li>
            Business Partners. We may share your information with our business
            partners to offer you certain products, services or promotions.
          </li>
        </ul>

        <h4 id="inforetain">4. HOW LONG DO WE KEEP YOUR INFORMATION?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            We keep your information for as long as necessary to fulfill the
            purposes outlined in this privacy policy unless otherwise required
            by law.
          </em>
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy policy, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting or other legal requirements). No purpose in this policy
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize it, or, if
          this is not possible (for example, because your personal information
          has been stored in backup archives), then we will securely store your
          personal information and isolate it from any further processing until
          deletion is possible.
        </p>
        <h4 id="infosafe">5. HOW DO WE KEEP YOUR INFORMATION SAFE?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            We aim to protect your personal information through a system of
            organizational and technical security measures.
          </em>
        </p>
        <p>
          We have implemented appropriate technical and organizational security
          measures designed to protect the security of any personal information
          we process. However, please also remember that we cannot guarantee
          that the internet itself is 100% secure. Although we will do our best
          to protect your personal information, transmission of personal
          information to and from our Services or Apps is at your own risk. You
          should only access the services within a secure environment.
        </p>
        <h4 id="infominors">6. DO WE COLLECT INFORMATION FROM MINORS?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            We do not knowingly collect data from or market to children under 18
            years of age.
          </em>
        </p>
        <p>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services or Apps, you represent that you
          are at least 18 or that you are the parent or guardian of such a minor
          and consent to such minor dependent’s use of the Services or Apps. If
          we learn that personal information from users less than 18 years of
          age has been collected, we will deactivate the account and take
          reasonable measures to promptly delete such data from our records. If
          you become aware of any data we have collected from children under age
          18, please contact us at <a href={`mailto:${email}`}>{email}</a>.
        </p>
        <h4 id="privacyrights">7. WHAT ARE YOUR PRIVACY RIGHTS?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            You may review, change, or terminate your account at any time.
          </em>
        </p>
        <p>
          If you are resident in the European Economic Area and you believe we
          are unlawfully processing your personal information, you also have the
          right to complain to your local data protection supervisory authority.
          You can find their contact details here:{' '}
          <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
            http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
          </a>
          .
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at <a href={`mailto:${email}`}>{email}</a>.
        </p>
        <p>Account Information</p>
        <p>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </p>
        <p>Log into your account settings and update your user account.</p>
        <p>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, some information may be retained in our files to prevent
          fraud, troubleshoot problems, assist with any investigations, enforce
          our Terms of Use and/or comply with legal requirements.
        </p>
        <p>
          <em>Opting out of email marketing:</em> You can unsubscribe from our
          marketing email list at any time by clicking on the unsubscribe link
          in the emails that we send or by contacting us using the details
          provided below. You will then be removed from the marketing email list
          – however, we will still need to send you service-related emails that
          are necessary for the administration and use of your account. To
          otherwise opt-out, you may:
        </p>
        <p>Access your account settings and update preferences.</p>
        <h4 id="DNT">8. CONTROLS FOR DO-NOT-TRACK FEATURES</h4>
        <p>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (“DNT”) feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. No uniform
          technology standard for recognizing and implementing DNT signals has
          been finalized. As such, we do not currently respond to DNT browser
          signals or any other mechanism that automatically communicates your
          choice not to be tracked online. If a standard for online tracking is
          adopted that we must follow in the future, we will inform you about
          that practice in a revised version of this privacy policy.
        </p>
        <h4 id="caresidents">
          9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            Yes, if you are a resident of California, you are granted specific
            rights regarding access to your personal information.
          </em>
        </p>
        <p>
          California Civil Code Section 1798.83, also known as the “Shine The
          Light” law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
        </p>
        <p>
          If you are under 18 years of age, reside in California, and have a
          registered account with the Services or Apps, you have the right to
          request removal of unwanted data that you publicly post on the
          Services or Apps. To request removal of such data, please contact us
          using the contact information provided below, and include the email
          address associated with your account and a statement that you reside
          in California. We will make sure the data is not publicly displayed on
          the Services or Apps, but please be aware that the data may not be
          completely or comprehensively removed from our systems.
        </p>
        <h4 id="policyupdates">10. DO WE MAKE UPDATES TO THIS POLICY?</h4>
        <p>
          <em>In Short: </em>{' '}
          <em>
            Yes, we will update this policy as necessary to stay compliant with
            relevant laws.
          </em>
        </p>
        <p>
          We may update this privacy policy from time to time. The updated
          version will be indicated by an updated “Revised” date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy policy, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy policy
          frequently to be informed of how we are protecting your information.
        </p>
        <h4 id="contact">11. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h4>
        <p>
          If you have questions or comments about this policy, you may email us
          at <a href={`mailto:${email}`}>{email}</a> or by post to:
        </p>
        <p>
          Pylon ai, inc.
          <br />
          369 3rd Street
          <br />
          B575
          <br />
          San Rafael, CA 94901
          <br />
          United States
          <br />
        </p>
        <p>
          HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
        </p>
        <p>
          Based on the laws of some countries, you may have the right to request
          access to the personal information we collect from you, change that
          information, or delete it in some circumstances. To request to review,
          update, or delete your personal information, please submit a request
          form by clicking{' '}
          <a href="https://app.termly.io/notify/b980a2e8-b837-4767-a8c8-170066c777b0">
            here
          </a>
          . We will respond to your request within 30 days.
        </p>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    padding: 20px;
    max-width: ${DEFAULT_WIDTH}px;
    margin: 0 auto;
  `
}

export const pageQuery = graphql`
  query privacyQuery {
    site {
      siteMetadata {
        contact {
          email
        }
      }
    }
  }
`
