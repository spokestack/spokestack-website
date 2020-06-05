import * as theme from '../../styles/theme'

import React, { PureComponent } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import { adjustFontSizeTo } from '../../styles/typography'

interface Props {
  yearly: boolean
  onChange: (yearly: boolean) => void
  extraCss?: SerializedStyles
}

interface State {
  moving: boolean
  x: number
}

export default class Switch extends PureComponent<Props, State> {
  private dragged: boolean
  private prevX: number
  private startX: number
  private knob = React.createRef<HTMLDivElement>()

  state: State = {
    moving: false,
    x: this.props.yearly ? 0 : 81
  }

  componentDidMount() {
    if (this.knob.current) {
      this.knob.current.addEventListener('mousedown', this.preventBubble)
      this.knob.current.addEventListener('touchstart', this.preventBubble)
    }
  }

  componentWillUnmount() {
    if (this.knob.current) {
      this.knob.current.removeEventListener('mousedown', this.preventBubble)
      this.knob.current.removeEventListener('touchstart', this.preventBubble)
    }
    this.removeListeners()
  }

  startMove = (e: React.PointerEvent) => {
    const { x } = this.state
    e.preventDefault()
    e.stopPropagation()
    this.prevX = x
    this.startX = e.clientX
    this.dragged = false
    this.setState({ moving: true })
    this.addListeners()
  }

  move = (e: PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nextX = this.nextX(e.clientX)
    this.dragged = this.dragged || Math.abs(nextX - this.prevX) > 5
    this.setState({ x: nextX })
  }

  stopMove = (e: PointerEvent) => {
    const { yearly } = this.props
    this.removeListeners()
    e.preventDefault()
    this.setState({
      moving: false
    })
    if (this.dragged) {
      const nextX = this.nextX(e.clientX)
      this.updateYearly(nextX < 40)
    } else {
      this.updateYearly(!yearly)
    }
  }

  updateYearly = (newYearly: boolean) => {
    this.setState({
      x: newYearly ? 0 : 81
    })
    this.props.onChange(newYearly)
  }

  nextX(clientX: number) {
    return this.constrainX(clientX - this.startX + this.prevX)
  }

  constrainX(x: number) {
    return Math.max(0, Math.min(81, x))
  }

  addListeners() {
    document.addEventListener('pointermove', this.move)
    document.addEventListener('pointercancel', this.stopMove)
    document.addEventListener('pointerup', this.stopMove)
  }

  removeListeners() {
    document.removeEventListener('pointermove', this.move)
    document.removeEventListener('pointercancel', this.stopMove)
    document.removeEventListener('pointerup', this.stopMove)
  }

  preventBubble(e: React.MouseEvent | React.TouchEvent | Event) {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const { yearly, extraCss } = this.props
    const { moving, x } = this.state
    return (
      <button
        css={[styles.button, extraCss]}
        onClick={() => this.updateYearly(!yearly)}>
        <div css={styles.track}>
          <div className="switch-text" css={styles.text}>
            Bill Yearly
          </div>
          <div className="switch-text" css={styles.text}>
            Bill Monthly
          </div>
        </div>
        <div
          ref={this.knob}
          css={styles.knob}
          className={moving ? 'moving' : ''}
          onPointerDown={this.startMove}
          onClick={this.preventBubble}
          style={{
            transform: moving
              ? `translateX(${x}px)`
              : yearly
              ? 'none'
              : 'translateX(81px)'
          }}>
          <div
            className="switch-text"
            css={styles.text}
            style={{ opacity: moving ? (40.5 - x) / 40.5 : yearly ? 1 : 0 }}>
            Bill Yearly
          </div>
          <div
            className="switch-text"
            css={styles.text}
            style={{ opacity: moving ? (x - 40.5) / 40.5 : yearly ? 0 : 1 }}>
            Bill Monthly
          </div>
        </div>
      </button>
    )
  }
}

const styles = {
  button: css`
    position: relative;
    appearance: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 166px;
    flex-shrink: 0;
  `,
  track: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 17px;
    border-radius: 22px;
    background-color: ${theme.mainBorder};

    .switch-text {
      opacity: 0.5;
      padding-top: 1px;
    }
  `,
  knob: css`
    position: relative;
    width: 81px;
    height: 31px;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 22px;
    background-color: white;

    &:not(.moving) {
      transition: transform 0.1s ${theme.transitionEasing};

      .switch-text {
        transition: opacity 0.1s ${theme.transitionEasing};
      }
    }

    .switch-text {
      font-weight: 700;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `,
  text: css`
    color: ${theme.header};
    font-size: ${adjustFontSizeTo('11px').fontSize};
  `
}
