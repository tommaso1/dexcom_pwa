import type { DexcomDataRecord } from "./dexcom_data_record";


const sharedHeaders = {
    "User-Agent": "share2nightscout-bridge/0.2.8",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const server = 'shareous1.dexcom.com';

async function doPost(url: string, body: any, headers: any) {
    try {

        const response = await fetch(
            url,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers
            }
        ).then((response) => response.json());

        return response;
    } catch (e: any) {
        return e.toString();
    }
}

async function fetchDexcomAccountID(accountName: string, password: string) {
    const url = `https://${server}/ShareWebServices/Services/General/AuthenticatePublisherAccount`;
    return doPost(url, {
        'password': password,
        'applicationId': "d89443d2-327c-4a6f-89e5-496bbb0317db",
        'accountName': accountName,
    }, sharedHeaders);
}

export async function loginToDexcomCloud(accountName: string, password: string, accountId?: string) {
    accountId = accountId ?? await fetchDexcomAccountID(accountName, password);
    const url = `https://${server}/ShareWebServices/Services/General/LoginPublisherAccountById`;
    const body = {
        'password': password,
        'applicationId': "d89443d2-327c-4a6f-89e5-496bbb0317db",
        'accountId': accountId,
    };
    return doPost(url, body, sharedHeaders);
}

export async function fetchDataFromDexcom(parsessionIDams: string): Promise<DexcomDataRecord[] | string> {
    const url = `https://${server}/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionID=${sessionID}&minutes=1440&maxCount=${recordsToFetch}`;
    const body = {

    }
    return await doPost(url, body, sharedHeaders)
}

