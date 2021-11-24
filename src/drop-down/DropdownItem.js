import React from 'react'

export default function DropdownItem(props) {
    return (
      <a
        className="dropdownItem"
        href={props.link}
        onClick={props.click}>
        <span className="dropdownLeftIcon">{props.leftIcon}</span>
        {props.children}
        <span className="dropdownRightIcon">{props.rightIcon}</span>
      </a>
    )
  }