import PocketBase from 'pocketbase';

export const BASE_URL = 'http://127.0.0.1:8090';
export const BASE_URI = `${BASE_URL}/api`;
export const BASE_FILES = `${BASE_URI}/files/lgq4p461gwy6f1f`;

export const pb = new PocketBase(BASE_URL);

