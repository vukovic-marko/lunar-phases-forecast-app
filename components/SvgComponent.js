import React from 'react';

import Svg, { G, Circle, Path } from "react-native-svg"

export const FirstQuarter = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G
        strokeMiterlimit={10}
        strokeWidth={props.strokeWidth}
        stroke={props.lineColor}
      >
        <Circle
          fill={props.litColor}
          r={38.5}
          cy={50}
          cx={50}
        />
        <Path
          fill={props.darkColor}
          d="M11.5 50c0 21.3 17.2 38.5 38.5 38.5v-77c-21.3 0-38.5 17.2-38.5 38.5z"
        />
      </G>
    </Svg>
  )
}

export const FullMoon = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G>
        <Circle
          strokeMiterlimit={10}
          strokeLinejoin="round"
          strokeWidth={props.strokeWidth}
          stroke="#1a1a1a"
          fill="#efe450"
          r={38.5}
          cy={50}
          cx={50}
        />
      </G>
    </Svg>
  )
}

export const LastQuarter = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G
        strokeMiterlimit={10}
        strokeWidth={props.strokeWidth}
        stroke="#000"
      >
        <Circle
          fill="#455252"
          r={38.5}
          cy={50}
          cx={50}
        />
        <Path
          fill="#efe450"
          d="M11.5 50c0 21.3 17.2 38.5 38.5 38.5v-77c-21.3 0-38.5 17.2-38.5 38.5z"
        />
      </G>
    </Svg>
  )
}

export const NewMoon = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G>
        <Circle
          strokeMiterlimit={10}
          strokeLinejoin="round"
          strokeWidth={props.strokeWidth}
          stroke="#000"
          fill="#455252"
          r={38.5}
          cy={50}
          cx={50}
        />
      </G>
    </Svg>
  )
}

export const WaningCrescent = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G
        strokeMiterlimit={10}
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        stroke="#000"
      >
        <Circle
          fill="#455252"
          r={38.5}
          cy={50}
          cx={50.4}

        />
        <Path
          fill="#efe450"
          d="M30.5 50c0-18 12.3-33.1 29-37.3-3-.8-6.2-1.2-9.5-1.2-21.3 0-38.5 17.2-38.5 38.5S28.7 88.5 50 88.5c3.3 0 6.5-.4 9.5-1.2-16.7-4.2-29-19.3-29-37.3z"
        />
      </G>
    </Svg>
  )
}

export const WaningGibbous = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G
        strokeMiterlimit={10}
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        stroke="#000"
      >
        <Circle
          fill="#455252"
          r={38.5}
          cy={50}
          cx={50}
        />
        <Path
          fill="#efe450"
          d="M69.5 50c0 18-12.3 33.1-29 37.3.7.2 1.4.3 2.1.5-17.7-3.4-31.1-19-31.1-37.8 0-18.7 13.4-34.3 31.1-37.8-.7.1-1.4.3-2.1.5 16.7 4.2 29 19.3 29 37.3z"
        />
      </G>
    </Svg>
  )
}

export const WaxingCrescent = (props) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G
        strokeMiterlimit={10}
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        stroke="#000"
      >
        <Circle
          fill="#efe450"
          r={38.5}
          cy={50}
          cx={50}
        />
        <Path
          fill="#455252"
          d="M69.5 50c0 18-12.3 33.1-29 37.3.7.2 1.4.3 2.1.5-17.7-3.4-31.1-19-31.1-37.8 0-18.7 13.4-34.3 31.1-37.8-.7.1-1.4.3-2.1.5 16.7 4.2 29 19.3 29 37.3z"
        />
      </G>
    </Svg>
  )
}

export const WaxingGibbous = (props) => {
  return (
    <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <G
        strokeMiterlimit={10}
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        stroke="#000"
      >
        <Circle fill="#efe450"
          r={38.5}
          cy={50}
          cx={50}
        />
        <Path fill="#455252"
          d="M30.5 50c0-18 12.3-33.1 29-37.3-3-.8-6.2-1.2-9.5-1.2-21.3 0-38.5 17.2-38.5 38.5S28.7 88.5 50 88.5c3.3 0 6.5-.4 9.5-1.2-16.7-4.2-29-19.3-29-37.3z"
        />
      </G>
    </Svg>
  )
}

FirstQuarter.defaultProps = FullMoon.defaultProps = 
  LastQuarter.defaultProps = NewMoon.defaultProps = 
  WaningCrescent.defaultProps = WaningGibbous.defaultProps =
  WaxingCrescent.defaultProps = WaxingGibbous.defaultProps = {
    width: '75',
    height: '75',
    strokeWidth: 6,
    litColor: '#efe450',
    darkColor: '#455252',
    lineColor: '#000'
  }