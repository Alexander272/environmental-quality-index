import React from 'react'
import { Link } from 'react-router-dom'
import classes from './list.module.scss'

type Props = {
    links: {
        link: string
        title: string
    }[]
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void
}

export const LinkList: React.FC<Props> = ({ links, onClick }) => {
    return (
        <ol className={classes.list}>
            {links.map(link => (
                <li
                    onClick={onClick}
                    key={link.link}
                    data-link={link.link}
                    className={classes.listItem}
                >
                    <Link to={link.link} className={classes.listLink}>
                        {link.title}
                    </Link>
                </li>
            ))}
        </ol>
    )
}
