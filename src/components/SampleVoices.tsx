import * as theme from '../utils/theme'

import React, { PureComponent } from 'react'
import Select, { Option } from './Select'

import Button from './Button'
import Card from './Card'
import { MIN_TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import Textarea from './Textarea'
import { Voice } from '../types'
import { adjustFontSizeTo } from '../utils/typography'
import { css } from '@emotion/core'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import synthesize from '../utils/synthesize'

const defaultStrings = {
  ipa: 'Hello, welcome to {{spoʊkstæk}}. What would you like to say?',
  md:
    'Hello, welcome to (spokestack)[ipa:"spoʊkstæk"]. What would you like to say?'
}

interface Props {
  allowDownload?: boolean
  voices: Voice[]
}

interface State {
  disabled: boolean
  errorText: string
  selected: Option
  speechMarkdown: boolean
  submitting: boolean
  text: string
}

export default class SampleVoices extends PureComponent<Props, State> {
  private audio: HTMLAudioElement
  private options: Option[]

  constructor(props: Props) {
    super(props)
    this.options = props.voices.map((voice) => ({
      value: voice.model,
      title: voice.label
    }))
    this.state = {
      disabled: false,
      errorText: null,
      selected: this.options[0],
      speechMarkdown: false,
      submitting: false,
      text: defaultStrings.ipa
    }
  }

  componentDidMount() {
    this.getAudio()
  }

  resetState = () => {
    this.setState({ disabled: false, submitting: false })
  }

  loadAudio(url: string) {
    this.audio = new Audio(url)
    this.audio.addEventListener('canplaythrough', this.resetState)
    this.audio.load()
  }

  getAudio = async () => {
    const { selected, speechMarkdown, text } = this.state
    if (!text) {
      return
    }
    this.setState({
      submitting: true,
      errorText: null
    })
    const [synthError, response] = await synthesize(text, {
      voice: selected.value,
      isMarkdown: speechMarkdown
    })
    if (!synthError && response && response.url) {
      this.loadAudio(response.url)
    } else {
      this.setState({
        disabled: false,
        submitting: false,
        errorText:
          (synthError && synthError.message) ||
          'There was a problem synthesizing the text. Please try again.'
      })
    }
  }

  getAudioDebounced = debounce(this.getAudio, 1000)

  play = () => {
    const { disabled, submitting } = this.state
    if (this.audio && !disabled && !submitting) {
      this.audio.currentTime = 0
      this.audio.play()
    }
  }

  render() {
    const { allowDownload, voices } = this.props
    const {
      disabled,
      errorText,
      selected,
      speechMarkdown,
      submitting,
      text
    } = this.state
    const selectedVoice = find(voices, { model: selected.value })

    return (
      <Card title="Sample a Custom Voice">
        <p css={styles.lightText}>
          Enter your text below. We support{' '}
          <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">
            IPA
          </a>{' '}
          input enclosed in {`{{ double braces }}`}, or a subset of{' '}
          <a href="https://www.speechmarkdown.org/">Speech Markdown</a>{' '}
          including{' '}
          <a href="https://www.speechmarkdown.org/syntax/break/">breaks</a>,{' '}
          <a href="https://www.speechmarkdown.org/syntax/characters/">
            characters
          </a>
          , <a href="https://www.speechmarkdown.org/syntax/ipa/">IPA</a>, and{' '}
          <a href="https://www.speechmarkdown.org/syntax/number/">numbers</a>.
        </p>
        <div css={styles.content}>
          <div css={styles.controls}>
            <Select
              id="sample-voices"
              disabled={disabled || submitting}
              selected={selected}
              extraCss={styles.select}
              selectCss={styles.selectElem}
              iconWrapCss={styles.selectIconWrap}
              options={this.options}
              onChange={(value) => {
                const option = find(this.options, { value })
                if (option) {
                  this.setState({ selected: option }, this.getAudio)
                }
              }}
            />
            <div css={styles.speechMarkdown}>
              <input
                css={styles.speechMarkdownCheck}
                type="checkbox"
                id="speech-markdown"
                onChange={(e) => {
                  const checked = e.target.checked
                  if (checked && text === defaultStrings.ipa) {
                    this.setState({ text: defaultStrings.md })
                  } else if (!checked && text === defaultStrings.md) {
                    this.setState({ text: defaultStrings.ipa })
                  }
                  this.setState({ speechMarkdown: checked })
                }}
              />
              <label
                css={styles.speechMarkdownLabel}
                htmlFor="speech-markdown"
              />
              <label css={styles.speechMarkdownText} htmlFor="speech-markdown">
                Speech Markdown:&nbsp;
                <strong css={styles.speechMarkdownStatus}>
                  {speechMarkdown ? 'ON' : 'OFF'}
                </strong>
              </label>
            </div>
          </div>
          <Textarea
            id="sample-voice-textarea"
            extraCss={styles.textarea}
            label={errorText || selectedVoice.description}
            labelCss={errorText ? styles.labelError : null}
            loading={submitting}
            value={text}
            onChange={(value) => {
              this.setState(
                { disabled: true, text: value },
                this.getAudioDebounced
              )
            }}
          />
          <div css={styles.buttons}>
            {allowDownload &&
            !disabled &&
            !submitting &&
            !!(this.audio && this.audio.src) ? (
              <a
                className="btn btn-transparent"
                download="download"
                href={this.audio.src}>
                <SVGIcon
                  className="icon"
                  icon="#download"
                  extraCss={styles.downloadIcon}
                />
                Download
              </a>
            ) : (
              <div />
            )}
            <Button
              large
              disabled={disabled || submitting}
              extraCss={styles.playButton}
              onClick={this.play}>
              <SVGIcon
                className="icon"
                icon="#play-circle"
                extraCss={styles.playIcon}
              />
              {submitting ? 'Synthesizing...' : 'Hear it'}
            </Button>
          </div>
        </div>
      </Card>
    )
  }
}

const styles = {
  lightText: css`
    ${adjustFontSizeTo('16px')};
    color: ${theme.textLight};
    text-align: center;
    margin-bottom: 20px;
  `,
  content: css`
    display: flex;
    flex-direction: column;
  `,
  controls: css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.textDarkBg};
    border-radius: 7px 7px 0 0;
    border: 1px solid ${theme.mainBorder};
    border-bottom: none;

    ${MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      align-items: center;
    }
  `,
  select: css`
    width: 100%;
    height: 40px;

    label {
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
    .icon {
      fill: ${theme.text};
    }
    p {
      font-size: ${adjustFontSizeTo('16px').fontSize};
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      width: 250px;
      border-right: 1px solid ${theme.mainBorder};

      label {
        border-bottom: none;
      }
    }
  `,
  selectElem: css`
    height: 40px;
  `,
  selectIconWrap: css`
    background: none;
    border-radius: 0;
    border: 0;
  `,
  speechMarkdown: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;

    label {
      cursor: pointer;
    }
  `,
  speechMarkdownCheck: css`
    display: none;

    &:checked + label {
      background-color: ${theme.primaryColor.fade(0.8).toString()};
    }
  `,
  speechMarkdownLabel: css`
    display: block;
    width: 30px;
    height: 30px;
    background: url(/speech-markdown.png) no-repeat 5px 6px;
    background-size: 20px 20px;
    padding: 5px;
    margin-left: 15px;
    border-radius: 2px;
  `,
  speechMarkdownText: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${adjustFontSizeTo('16px').fontSize};
    margin-left: 10px;
    user-select: none;
  `,
  speechMarkdownStatus: css`
    color: ${theme.primary};
  `,
  buttons: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    ${MIN_TABLET_MEDIA_QUERY} {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-self: flex-end;
      grid-gap: 0;
    }
  `,
  playButton: css`
    ${MIN_TABLET_MEDIA_QUERY} {
      margin-left: 20px;
    }
  `,
  playIcon: css`
    width: 18px;
    height: 18px;
    margin-right: 5px;
  `,
  downloadIcon: css`
    width: 24px;
    height: 24px;
    margin-right: 5px;
  `,
  textarea: css`
    margin-bottom: 20px;
    textarea {
      border-radius: 0;
    }
  `,
  labelError: css`
    color: ${theme.textError};
  `,
  loading: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryColor.fade(0.2).toString()};
    /* color: white; */
    z-index: 101;

    p {
      margin: 0 0 0 10px;
    }
  `
}
