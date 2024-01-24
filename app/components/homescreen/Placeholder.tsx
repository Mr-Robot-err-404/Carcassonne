'use client'

import { RxRotateCounterClockwise } from 'react-icons/rx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';

export default function Placeholder() {
    const [rotate, setRotate] = useState(0)
    const [rotateStyle, setRotateStyle] = useState("rotate-0")
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "example"
    })

    useEffect(() => {
        if (rotate === 270) {
            setRotateStyle("-rotate-90")
            return 
        }
        setRotateStyle(`rotate-${rotate}`)
    }, [rotate])
    
    const style = {
        transform: CSS.Translate.toString(transform),
    } 
    const rotateClockwise = () => setRotate((rotate + 90) % 360)
    const rotateAntiClockwise = () => setRotate((rotate + 270) % 360)

    return (
        <div className="w-60 stack-h flex justify-center items-center rounded-r-lg border-2 border-slate-600  bg-slate-400 relative">
            <Image
                className="select-none rounded-r-lg"
                alt=""
                src="/wood-textures/wood.jpg"
                quality={100}
                width={240}
                height={128}
                style={{
                    objectFit: 'contain',
                }}
                priority={true}
            />
            <div className='absolute mx-auto left-0 right-0 z-10 w-20 h-20 bg-light-brown mb-3'>
                <div className={`flex items-center justify-center bg-light-brown w-24 h-24 rounded-lg select-none`}>
                    <div
                        style={style}
                        ref={setNodeRef}
                        {...listeners} {...attributes}
                        className={`w-20 h-20 rounded-md`}>
                        <img
                            className={`select-none rounded-sm ${rotateStyle}`}
                            src={"/cities/Adobe Scan 12 Sept 2023 (35)-1.png"}
                            alt="example"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute ml-40">
                <div className='flex flex-col space-y-2'>
                    <div className="flex justify-center items-center scale-x-[-1] hover:bg-slate-400 rounded-full cursor-pointer w-10 h-10">
                        <RxRotateCounterClockwise onClick={rotateClockwise} className="ml-1" size={23} style={{ color: 'white' }}/>
                    </div>
                    <div className="flex justify-center items-center hover:bg-slate-400 rounded-full cursor-pointer w-10 h-10">
                        <RxRotateCounterClockwise onClick={rotateAntiClockwise} className="ml-1" size={23} style={{ color: 'white' }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}