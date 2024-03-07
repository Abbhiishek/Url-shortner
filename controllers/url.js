const Url = require('../models/url');
const shortid = require('shortid');


async function handleGenerateUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ message: 'url is required' })
    }
    const code = shortid()
    const shortUrl = `${process.env.APP_URL}/r/${code}`

    const data = await Url.create({
        shortcode: code,
        shortUrl,
        originalUrl: body.url,
        visits: []
    })

    const urls = await Url.find();
    return res.render("home", {
        shortUrl, urls
    })
}

async function handleGetStats(req, res) {
    const { shortid } = req.params
    const result = await Url.findOne({
        shortcode: shortid,
    })

    if (!result) {
        return res.status(404).json({ message: 'Not found' })
    }

    return res.status(200).json({
        totalvisits: result.visits.length,
    })
}

module.exports = {
    handleGenerateUrl,
    handleGetStats
}