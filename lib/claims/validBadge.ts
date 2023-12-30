export function isBadgeValid(str: string, claim: string, complete: string[]): boolean {
    if (!str || !claim) {
        return false
    }
    if (complete.includes(claim)) {
        return false
    }
    return true
}