export interface Environment {
    apiKey: string,
    production: boolean,
    fbDbUrl: string
}

export interface FireBaseAuthResponse {
    idToken: string
    expiresIn: string
}

export interface FbCreateResponse {
    name: string
}