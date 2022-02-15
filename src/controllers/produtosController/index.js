const rp = require('request-promise')
const cheerio = require('cheerio')




async function fetchProdutos(req, res) {
    const options = {
        uri: 'https://docato.com.br/produto/destaques',
        transform: function (body) {
            return cheerio.load(body)
        }
    }
    const title = [] //irá receber apenas os titulos
    const descricao = [] //irá receber apenas as descrições
    const dados = [] // irá juntar titulo com descrição
    try {
        const dataTitle = await rp(options)
        dataTitle('.container-fluid').find('.bg-produto').find('.container').find('.row').find('.h5').each((i, item) => {

            title.push(dataTitle(item).text().trim())

        }); //recebendo titulos
        const dataDesc = await rp(options)
        dataDesc('.container-fluid').find('.bg-produto').find('.container').find('.row').find('.h6').each((i, item) => {

            descricao.push(dataDesc(item).text().trim())

        }) //recebendo descrições

        for (item in title) {
            dados.push({ 'title': title[item], 'descricao': descricao[item] })
        } //juntando titulo e descrição
        res.json(dados)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = fetchProdutos
