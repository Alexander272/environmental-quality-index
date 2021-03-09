import React from 'react'
import classes from './circleBar.module.scss'

type Props = {
    value: number
    type: string
}

export const CircleBar: React.FC<Props> = ({ value, type }) => {
    const resultValue: number = +(value * 60).toFixed()

    const text =
        resultValue % 10 > 1 && resultValue % 10 < 5
            ? 'балла'
            : resultValue % 10 === 1
            ? 'балл'
            : 'баллов'

    return (
        <div className={[classes.bar, classes[type]].join(' ')}>
            <svg className={classes.svg} id="animated">
                <circle className={classes.circle} r="100" cx="100" cy="100" />
                <path
                    className={classes.pathBack}
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth="9"
                    strokeDasharray="562,562"
                    d="M100 10 a 40 40 0 0 1 0 180 a 40 40 0 0 1 0 -180"
                ></path>
                <path
                    className={classes.path}
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth="9"
                    strokeDasharray={`${value * 562},562`}
                    d="M100 10 a 40 40 0 0 1 0 180 a 40 40 0 0 1 0 -180"
                >
                    {/* <animate
                                    attributeName="stroke-dasharray"
                                    from="0,502.4"
                                    to="251.2, 251.2"
                                    dur="5s"
                                /> */}
                </path>

                <text
                    className={classes.value}
                    id="count"
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dy="7"
                >
                    {resultValue}
                </text>
                <text
                    className={classes.text}
                    id="count"
                    x="100"
                    y="120"
                    textAnchor="middle"
                    dy="7"
                >
                    {text}
                </text>
            </svg>
        </div>
    )
}
