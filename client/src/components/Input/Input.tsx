import React from 'react'
import classes from './input.module.scss'

type Props = {
    placeholder: string
    type: string
    value: string
    name: string
    onChange: any
    className?: any
}

export const Input: React.FC<Props> = ({
    placeholder,
    type,
    value,
    onChange,
    name,
    className = null,
}) => {
    return (
        <div className={classes.field}>
            <input
                className={[classes.input, className ? classes[className] : null].join(' ')}
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                required
            />
            <label htmlFor={name} className={classes.label}>
                {placeholder}
            </label>
        </div>
    )
}
