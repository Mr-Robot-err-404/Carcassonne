import { Claim, Meeple } from "../interfaces";

export function isClaimPossible(claims: Claim) {
    const strs = ["city", "road", "monastery"]
    
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i]
        if (!(str in claims)) {
            continue
        }

        const int = claims[str] as number
        if (int > 0) {
            return true
        }
    }
    return false
}