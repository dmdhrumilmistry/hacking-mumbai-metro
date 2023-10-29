function hashJsonData(jsonData) {
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        return hashArray
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    return hashString(JSON.stringify(jsonData));
}

function handle(str) {
    var reversedStr = '';
    for (var i = 0; i < str.length; i += 2) {
        reversedStr = str[i] + reversedStr;
        if (i + 1 < str.length) {
            reversedStr += str[i + 1];
        }
    }
    var result = '';
    for (var _i = 0; _i < reversedStr.length; _i++) {
        result += reversedStr[_i];
        if ((_i + 1) % 5 === 0 && _i < reversedStr.length - 1) {
            result += "G";
        }
    }
    return result;
}

async function generatePayload(jsonData) {
    console.log("JSON data:")
    console.log(jsonData);
    const hash = await hashJsonData(jsonData);
    const checksum = handle(hash);
    return {
        "data": btoa(JSON.stringify(jsonData)),
        "checksum": checksum,
    }
}

var jsonData = { "session_id": "code-from-whatsapp-bot-in-url", "src_stn_id": 1, "des_stn_id": 2, "unit": 1, "unit_price": 10, "total_price": 10, "product_id": "1", "pass_id": "10" } // 
console.log('JSON PAYLOAD:')
generatePayload(jsonData).then((v => { console.log(v) }))

// send request to /api/order/create