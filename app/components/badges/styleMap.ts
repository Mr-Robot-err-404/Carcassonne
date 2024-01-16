interface Props {
    [key: string]: string
    bg: string
    position: string
}

export const styleMap: {[key: string]: Props} = {
    player: {
        bg: "rgb(12,96,235)", 
        position: "absolute -top-3 -left-3"
    }, 
    ai: {
        bg: "rgb(239, 68, 68)", 
        position: "absolute -top-3 left-10"
    },  
    hero: {
        bg: "rgb(12,96,235)", 
        position: "absolute top-0"
    }, 
    enemy: {
        bg: "rgb(239, 68, 68)", 
        position: "absolute top-0"
    }, 
}