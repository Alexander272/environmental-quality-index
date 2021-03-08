import React, { ReactElement } from 'react'
import { Navbar } from '../components/Navbar/Navbar'

type Props = {
    children: ReactElement[] | ReactElement
}

export const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="container">
            <Navbar />
            <div className="main-container">{children}</div>
        </div>
    )
}
