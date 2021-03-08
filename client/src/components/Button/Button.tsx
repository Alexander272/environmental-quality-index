import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import classes from './button.module.scss'

type Props = {
    text: string
    type: string
    icon: IconProp | null
    onClick: any
}

export const Button = ({ text, type, icon = null, onClick }: Props) => {
    return (
        <div onClick={onClick} className={[classes[type], classes.btn].join(' ')}>
            <p>
                {icon && <FontAwesomeIcon className={classes.icon} icon={icon} />}
                {text}
            </p>
        </div>
    )
}
