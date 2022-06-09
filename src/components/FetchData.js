//Fetch function to be reused

export async function FetchData(url, method, body) {

    try {
        let response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",

            }
        })

        if (response.status === 404) {
            throw new Error("Not found")
        }

        return await response.json()

    } catch (err) {
        throw err
    }
}