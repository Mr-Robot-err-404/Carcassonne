interface Style {
    [key: string]: string
    fontSize: string
    text: string
}

export const claimMap: {[key: string]: Style} = {
    road: {
        fontSize: '209', 
        text: "R"
    },
    city: {
        fontSize: '209', 
        text: "C"
    }, 
    monastery: {
        fontSize: '180', 
        text: "M"
    }, 
    empty: {
        fontSize: "", 
        text: ""
    }
} 