import React from 'react'
import classes from './lineBar.module.scss'

type Props = {
    value: number
    width: number
    type: string
    left: number
    right: number
}

export const LineBar: React.FC<Props> = ({ value, width, right, left, type }) => {
    return (
        <div className={[classes.resultLine, classes[type]].join(' ')}>
            <div className={classes.result}>
                {/* style={{ left: width + '%' }} */}
                <p className={classes.resultTitle}>{value}</p>
                <p className={classes.resultBalls}>баллов</p>
            </div>
            <p className={classes.borders}>
                <span>{left}</span>
                <span>{right}</span>
            </p>
            <div className={classes.lineContainer}>
                <div style={{ width: width + '%' }} className={classes.line}></div>
            </div>
        </div>
    )
}
