import {ResponseDataType} from '../res.types'

export async function fetchFromDatabase(endpoint: string, method: string): Promise<ResponseDataType> {
  const res = await fetch(`http://localhost:3000/${endpoint}`, {
    method: method,
    headers: {
      "Content-type": "application/json"
    }
  });
  let responseData = await res.json() as Promise<ResponseDataType>;
  return responseData;
}




