import { Badge } from "./isBadgeActive"

export function isBadgeValid(curr: Badge): boolean {
    if (curr.overlap) {

        if ((!curr.str || !curr.claim) && (!curr.overlap.str || !curr.overlap.claim)) {
            return false 
        }

        if (curr.complete.includes(curr.claim) || curr.overlap.complete.includes(curr.overlap.claim)) {
            return false
        }

        if (!curr.str || !curr.claim) {
            curr.str = curr.overlap.str
            curr.claim = curr.overlap.claim
            curr.idx = curr.overlap.idx
        }
        return true
    }

    if (!curr.str || !curr.claim) {
        return false
    }

    if (curr.complete.includes(curr.claim)) {
        return false
    }
    return true
}