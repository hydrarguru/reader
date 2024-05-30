export function validateUUID(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid);
}

export function validateCommunityName(name: string): boolean {
    return /^[a-zA-Z_]{1,20}$/.test(name);
}