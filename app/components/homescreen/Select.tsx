import { IoIosRadioButtonOff } from 'react-icons/io'
import { IoIosRadioButtonOn } from "react-icons/io"

interface Map {
    first: {
        text: string 
        title: string
    }, 
    second: {
        text: string
        title: string
    }, 
    style: string
}

interface Props {
    map: Map
    type: string
    options: {
        [key: string]: string
        opponent: string
        map: string
    }
    handleOption: (option: string, str: string) => void 
}   

export function Select({ map, type, options, handleOption }: Props) {
    return (
        <>
            <div className={`flex h-12 w-full items-center justify-center ${map.style}`}>
                <h2 className="text-lg ml-4 text-white">Select {type}</h2>
            </div>
            <div className="flex flex-col items-center md:flex-row md:justify-between w-full px-5 space-y-5 md:space-y-0">
                <div onClick={() => handleOption(type, "1")} className="flex h-auto w-56 flex-col rounded-md border-2 border-slate-400 hover:border-blue-500">
                    <div className="flex h-6 w-full items-center justify-center relative">
                        <div className='absolute top-1 left-2'>
                            {options[type] !== "1" &&
                                <IoIosRadioButtonOff size={20} />
                            }
                            {options[type] === "1" &&
                                <IoIosRadioButtonOn size={20} />
                            }
                        </div>
                        <h2 className="text-md text-white">{map.first.title}</h2>
                    </div>
                        <div className="h-full w-full">
                            <p className="px-2 pb-2 py-1 text-md text-white">
                                {map.first.text} 
                            </p>
                        </div>
                </div>
                <div onClick={() => handleOption(type, "2")} className="flex h-auto w-60 flex-col rounded-md border-2 border-slate-400 hover:border-blue-500">
                    <div className="flex h-6 w-full items-center justify-center relative">
                        <div className='absolute top-1 left-2'>
                            {options[type] !== "2" &&
                                <IoIosRadioButtonOff size={20}
                            />}
                            {options[type] === "2" &&
                                <IoIosRadioButtonOn size={20} />
                            }
                        </div>
                        <h2 className="text-md text-white">{map.second.title}</h2>
                    </div>
                    <div className="h-full w-full">
                        <p className="px-2 py-1 pb-2 text-md text-white">
                            {map.second.text}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}