interface Props {
    [key: string]: string
    bg: string
    position: string
}

export const styleMap: {[key: string]: Props} = {
    player: {
        bg: "rgb(12,96,235)", 
        position: "-top-3 -left-3"
    }, 
    ai: {
        bg: "rgb(239, 68, 68)", 
        position: "-top-3 left-10"
    }
}