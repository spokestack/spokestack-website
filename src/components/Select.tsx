import React, { SelectHTMLAttributes, useState } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import find from 'lodash/find'
import iconArrowDown from '../icons/arrow-down.svg'
import { primaryColor } from '../utils/globalStyles'

export interface Option {
  value: string
  title: string
}

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  id: string
  // Don't need to set options if children is set
  options?: Option[]
  extraCss?: SerializedStyles
  selectCss?: SerializedStyles
  labelCss?: SerializedStyles
  iconCss?: SerializedStyles
  iconWrapCss?: SerializedStyles
  selected: Option
  onChange: (selected: Option) => void
}

export default function Select({
  children,
  options,
  extraCss,
  labelCss,
  iconCss,
  iconWrapCss,
  selectCss,
  id,
  disabled,
  selected,
  onChange,
  ...props
}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div
      css={[styles.container, extraCss]}
      className={`${open ? 'select-open' : ''}${disabled ? ' disabled' : ''}`}>
      <label
        htmlFor={id}
        css={[styles.label, labelCss]}
        onClick={() => {
          setOpen(!disabled && !open)
        }}>
        <p>{selected.title}</p>
        <div css={[styles.iconWrap, iconWrapCss]}>
          <SVGIcon
            className="icon"
            icon={iconArrowDown.id}
            extraCss={css`
              ${styles.icon}
              ${iconCss}
            `}
          />
        </div>
      </label>
      <select
        css={[styles.select, selectCss]}
        id={id}
        disabled={disabled}
        value={selected.value}
        onChange={(event) => {
          onChange(find(options, { value: event.target.value }))
        }}
        {...props}>
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))
          : children}
      </select>
      {options && (
        <div css={styles.dropdown} className="dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              css={styles.dropdownOption}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: css`
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 100;

    &.select-open {
      label {
        outline: var(--primary-color) auto 1px;
      }
      .icon {
        transform: rotateZ(180deg);
      }
      .dropdown {
        transform: translateY(0) scaleY(1);
        opacity: 1;
      }
    }
    &.disabled {
      opacity: 0.5;

      label {
        cursor: default;
      }
    }
  `,
  label: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid var(--main-border-color);
    border-radius: 25px;
    cursor: pointer;
    z-index: 99;

    p {
      width: 100%;
      overflow: hidden;
      color: var(--header-color);
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 20px;
    }
  `,
  iconWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    flex-shrink: 0;
    border-left: 1px solid var(--main-border-color);
    background-color: var(--text-color-dark-bg);
    border-radius: 0 25px 25px 0;
  `,
  icon: css`
    fill: var(--primary-color);
    width: 25px;
    height: 25px;
    transition: transform 0.1s var(--transition-easing);
  `,
  select: css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    appearance: none;
    background: transparent;
    border: none;
    color: transparent;
    border-radius: 25px;
    z-index: 100;

    optgroup,
    option {
      width: 100%;
      color: var(--text-color);
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  dropdown: css`
    position: absolute;
    top: 100%;
    width: 100%;
    max-height: 185px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid var(--main-border-color);
    transition: transform 0.2s var(--transition-easing), opacity 0.2s var(--transition-easing);
    transform: translateY(-50%) scaleY(0);
    opacity: 0;
  `,
  dropdownOption: css`
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: ${primaryColor.fade(0.9).string()};
    }
  `
}
