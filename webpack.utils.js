/**
 * @param {number | string} port
 * @param {string[]} entryJsFiles
 * @returns {string}
 */
module.exports.formatHowToUseDevPluginURLs = (pluginURLs) => {
  console.log(`
--------------------------------

Set the Plugin URL under development to Visual M2M Data Visualizer.
Please set the following URL in Local Plugin URL Settings of Function Menu.

${pluginURLs.map((pluginURL) => {
  return `- ${pluginURL}\n`
})}
--------------------------------
  `)
}
