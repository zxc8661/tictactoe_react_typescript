import './style.css';
import React from 'react';



export default function Bottom({children}:{children:React.ReactNode}){
    return (
        <div className = "bottom">
            {children}
        </div>
    )
}