/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEB_SERVICES_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
