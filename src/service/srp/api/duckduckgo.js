
//http://api.duckduckgo.com/?q=x&format=json

exports.query = async (payload) => {
    const url = 'http://api.duckduckgo.com/';
    const { keyword } = payload;
    const params = {
        q: keyword,
        format: 'json'
    }

    const result = await axios.get(url, { params });
    // result.RelatedTopics //arraay
    for await (const item of result.RelatedTopics) {

    }
    result.AbstractURL

}