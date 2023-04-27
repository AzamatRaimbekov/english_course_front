import React from 'react'
import s from "./html-parser.module.scss"


const HtmlParser = ({ title, desc, cuption }) => {
    return (
        <div>
            {title && <h2 className='main-title'>{title}</h2>}
            <div
                className={s.desc}
                dangerouslySetInnerHTML={{ __html: desc }}
            ></div>
            <div
                dangerouslySetInnerHTML={{ __html: cuption }}
            ></div>
        </div>
    )
}

export default HtmlParser