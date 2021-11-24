import React from 'react'

export default function NavItem(props) {
    return (
      <>
        <button
          datatitle={props.tip}
          className="standardBtn iconBtn"
          onClick={props.onClick}
        >
          {props.icon}
        </button>
      </>
    )
  }
