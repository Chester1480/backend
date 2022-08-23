const spotify = require('../../service/srp/api/spotify/spotify');
const fluent = require('fluent-json-schema');

module.exports = async function async(fastify, options) { 

    //#region 範例 https://www.fastify.io/docs/latest/Guides/Fluent-Schema/

        // const S = require('fluent-json-schema')

        // // You can have an object like this, or query a DB to get the values
        // const MY_KEYS = {
        //     KEY1: 'ONE',
        //     KEY2: 'TWO'
        // }

        // const bodyJsonSchema = S.object()

        // .prop('someKey', S.string())
        // .prop('someOtherKey', S.number())
        // .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())
        // .prop('nullableKey', S.mixed([S.TYPES.NUMBER, S.TYPES.NULL]))
        // .prop('multipleTypesKey', S.mixed([S.TYPES.BOOLEAN, S.TYPES.NUMBER]))
        // .prop('multipleRestrictedTypesKey', S.oneOf([S.string().maxLength(5), S.number().minimum(10)]))
        // .prop('enumKey', S.enum(Object.values(MY_KEYS)))
        // .prop('notTypeKey', S.not(S.array()))

        // const queryStringJsonSchema = S.object()
        // .prop('name', S.string())
        // .prop('excitement', S.integer())

        // const paramsJsonSchema = S.object()
        // .prop('par1', S.string())
        // .prop('par2', S.integer())

        // const headersJsonSchema = S.object()
        // .prop('x-foo', S.string().required())
      
    //#endregion
    
    const typeEnum = {
        album:"album", 
        artist:"artist", 
        playlist:"playlist", 
        track:"track", 
        show:"show", 
        episode:"episode"
    }
    const markets = [
        "AD",
        "AE",
        "AG",
        "AL",
        "AM",
        "AO",
        "AR",
        "AT",
        "AU",
        "AZ",
        "BA",
        "BB",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BN",
        "BO",
        "BR",
        "BS",
        "BT",
        "BW",
        "BY",
        "BZ",
        "CA",
        "CD",
        "CG",
        "CH",
        "CI",
        "CL",
        "CM",
        "CO",
        "CR",
        "CV",
        "CW",
        "CY",
        "CZ",
        "DE",
        "DJ",
        "DK",
        "DM",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ES",
        "FI",
        "FJ",
        "FM",
        "FR",
        "GA",
        "GB",
        "GD",
        "GE",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GR",
        "GT",
        "GW",
        "GY",
        "HK",
        "HN",
        "HR",
        "HT",
        "HU",
        "ID",
        "IE",
        "IL",
        "IN",
        "IQ",
        "IS",
        "IT",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KR",
        "KW",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MG",
        "MH",
        "MK",
        "ML",
        "MN",
        "MO",
        "MR",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NE",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PG",
        "PH",
        "PK",
        "PL",
        "PS",
        "PT",
        "PW",
        "PY",
        "QA",
        "RO",
        "RS",
        "RW",
        "SA",
        "SB",
        "SC",
        "SE",
        "SG",
        "SI",
        "SK",
        "SL",
        "SM",
        "SN",
        "SR",
        "ST",
        "SV",
        "SZ",
        "TD",
        "TG",
        "TH",
        "TJ",
        "TL",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TW",
        "TZ",
        "UA",
        "UG",
        "US",
        "UY",
        "UZ",
        "VC",
        "VE",
        "VN",
        "VU",
        "WS",
        "XK",
        "ZA",
        "ZM",
        "ZW"
    ]
                     
    let searchSchema = {
        query: fluent.object()
                .prop('q', fluent.string().maxLength(30).required())
                .prop('type', fluent.enum(Object.values(typeEnum)).required())
                .prop('limit', fluent.number().required())
                .prop('offset', fluent.number().required())
    }

    fastify.get('/search',{ schema:searchSchema }, async (request, reply) => { 
        const { q , type , limit,  offset } = request.query;
        const parameters = {
            q , type , limit,  offset
        }
        const result = await spotify.search(parameters);
        return result;
    })

    fastify.post('/user',{ schema:searchSchema }, async (request, reply) => { 
        const { q , type , limit,  offset } = request.body;
        const parameters = {
            q , type , limit,  offset
        }
        const result = await spotify.search(parameters);
        return result;
    })

}