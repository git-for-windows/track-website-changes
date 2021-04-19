fs = require('fs')

const subst = (text, regex, replacement, url) => {
  const match = text.match(regex)
  if (!match) throw new Error(`no match for ${regex}`)

console.log(`matched ${regex}, replacement: ${replacement}`)
  return replacement ? eval(`\`${replacement}\``) : match[1]
}

module.exports = async (path, url, title_match, title_replacement, body_match, body_replacement) => {
  const contents = (await fs.promises.readFile(path)).toString()

  const title = subst(contents, title_match, title_replacement, url)
  const body = `${
    body_match ? `${subst(contents, body_match, body_replacement, url)}\n\n` : ''
  }For more details, see ${url}`

  return { title, body }
}