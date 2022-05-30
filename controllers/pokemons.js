const superagent = require('superagent');
require('superagent-proxy')(superagent)
const cheerio = require('cheerio')

module.exports = {
    getPokemonsByArea(req,response) {
        let area = req.query.area
        let pokemonList = []
        superagent.get('https://wiki.52poke.com/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89').set('Content-Type', 'text/html; charset=utf-8').set('Referrer', 'https://wiki.52poke.com').end((err, res) => {
            const $ = cheerio.load(res.text)     
            const el = $(`.s-${area} tbody`).children('tr')
            el.each((index, el) => {
                if (index > 1) {
                    let no = '', name = '', type = [], href = '', className = ''
                    const $el = $(el)
                    const $poketd = $(el).children('td')
                    no = $el.children('td').text().match(/#(\d+)/)?.[0] || ''
                    const $pokeInfo = $poketd.children('a')
                    className = $poketd.children('a').children('span').attr('class') || ''
                    $pokeInfo.each((index, el) => {
                        switch (index) {
                            case 0: name = $(el).attr('title') || ''; href = $(el).attr('href') || "#"
                            case 1: break;
                            case 2: type.push($(el).attr('title')); break
                            case 3: type.push($(el).attr('title')); break;
                            default: break;
                        }
                    })
                    let pokemon = {
                        no: no,
                        name: name,
                        className: className,
                        href: href,
                        type: type
                    }
                    pokemonList.push(pokemon)
                }
                // console.log(pokemonList)
            })
            response.json({
                code:200,
                data:pokemonList
            })
        })  
    }
}