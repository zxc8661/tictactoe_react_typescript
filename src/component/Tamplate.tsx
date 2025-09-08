import React from 'react'
import './style.css'




export default function Tamplate({children}:{children:React.ReactNode}){
    return (
        <div className = "basicTemplate">
            {children}
        </div>
    )
}