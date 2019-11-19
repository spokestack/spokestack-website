import { adjustFontSizeTo, rhythm } from './typography'

import Color from 'color'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { css } from '@emotion/core'

const primaryColor = Color('#2f5bea')
const secondaryColor = Color('#61fae9')

export default css`
  html {
    --main-background: #f6f9fc;
    --primary-color: ${primaryColor.hex()};
    --secondary-color: ${secondaryColor.hex()};
    --text-color: #323e48;
    --header-color: #2c363f;
    --footer-background: var(--header-color);
    --text-color-dark-bg: #f6f9fc;
    --main-border-color: #e6e9e9;
    --button-background: var(--secondary-color);
    --button-background-hover: #06c6b0;
    --transition-easing: cubic-bezier(0.77, 0.41, 0.2, 0.84);

    --link-color: var(--primary-color);
    --link-color-visited: ${primaryColor.lighten(0.1).hex()};
    --link-color-hover: ${primaryColor.darken(0.2).hex()};
    --link-color-active: ${primaryColor.darken(0.4).hex()};

    --code-background: #cce4ff;

    height: 100%;
    min-width: 300px;
    background-color: var(--main-background);
  }
  section {
    padding: ${rhythm(1.3)} 20px;
  }
  .gatsby-resp-image-link {
    background-image: none;
  }
  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a {
    text-decoration: none;
  }
  pre[class*='language-'] {
    margin: 0 0 ${rhythm(1)};
  }
  code {
    background-color: var(--code-background);
    padding: ${rhythm(0.1)} ${rhythm(0.2)};
  }
  h3 code {
    font-size: ${adjustFontSizeTo('25px').fontSize};
    line-height: 1.4;
  }
  ${MIN_DEFAULT_MEDIA_QUERY} {
    h1 {
      font-size: ${adjustFontSizeTo('45px').fontSize};
      line-height: ${adjustFontSizeTo('45px').lineHeight};
    }
    h2 {
      font-size: ${adjustFontSizeTo('30px').fontSize};
      line-height: ${adjustFontSizeTo('30px').lineHeight};
    }
    h3 {
      font-size: ${adjustFontSizeTo('25px').fontSize};
      line-height: 1.4;
    }
  }
`
