/*
    new Response(body, {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': 'application/json',
        };
    })

    body - Blob, File, ArrayBuffer, TypedArray, DataView,
    FormData, String, ReadableStream, or URLSearchParams
*/


document.addEventListener('DOMContentLoaded', () => {
    // create an object, convert to JSON and create a file in a Response
    // createJSONResponse();
});


async function createJSONResponse() {
    const myObj = { 
        id: 123,
        name: 'John Doe',
     };
     let json = JSON.stringify(myObj);
     let file = new File([json], 'mydata.json', {type: 'application/json'});
     console.log(file);
     const response = new Response(file, {
        status: 200,
        statusText: 'OK',
        headers: {
            'content-type': String(file.type),
            'content-length': file.size,
        },
    });

    console.log(response);
    const copy = response.clone();
    console.log(copy);
    let contents = await copy.blob();
}
