"use client"

import { useState } from "react"
import { AiOutlineDownCircle } from "react-icons/ai"
import { BsArrowDownCircle, BsArrowLeftCircle, BsArrowRightCircle, BsArrowUpCircle } from 'react-icons/bs'

interface Props {
    setSelected: any,
    setDir?: any, 
    title: string, 
    width: string, 
    dir?: string
}

export default function ClaimOption({ setSelected, setDir, title, width, dir } : Props) {
    const [hover, setHover] = useState(false)

    return (
        <>
            {!dir &&
            <div className={`flex justify-end ${width}`}>
                <AiOutlineDownCircle
                onClick={() => {
                    setSelected(title)
                    setDir("")    
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                fill={hover ? "#2563eb" : "#f8fafc"}
                size={23}
                />
            </div>
            }
            {dir &&
            <div>
                {dir === "top" ?
                    <BsArrowUpCircle
                        onClick={() => {
                            setSelected(title)
                            setDir(dir)    
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        fill={hover ? "#2563eb" : "#f8fafc"}
                        size={20}
                    />
                : dir === "right" ?
                    <BsArrowRightCircle
                        onClick={() => {
                            setSelected(title)
                            setDir(dir)    
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        fill={hover ? "#2563eb" : "#f8fafc"}
                        size={20}
                    />
                : dir === "down" ?
                    <BsArrowDownCircle
                        onClick={() => {
                            setSelected(title)
                            setDir(dir)    
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        fill={hover ? "#2563eb" : "#f8fafc"}
                        size={20}
                    />
                : dir === "left" &&
                    <BsArrowLeftCircle
                        onClick={() => {
                            setSelected(title)
                            setDir(dir)    
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        fill={hover ? "#2563eb" : "#f8fafc"}
                        size={20}
                    />
                }
            </div>}
        </>
        
    )
}

