export function getSubDomain() {
    const host = window.location.hostname
    const parts = host.split('.')
    return parts[0]
}
