import React from 'react'

export default function FlexCanvas({ sensor_type, flex_reading }) {
  return (
    <div>{sensor_type} Reading: {flex_reading}</div>
  )
}
