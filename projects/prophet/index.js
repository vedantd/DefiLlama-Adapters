/*
 * Prophet is a decentralized prediction market on the Obyte ledger.
 *
 * @see https://prophet.ooo/
 */
const {
    fetchBaseAABalances,
    fetchOswapExchangeRates,
    fetchOswapAssets,
    summingBaseAABalancesToTvl,
} = require('../helper/obyte')

async function totalTvl(timestamp) {
    const [assetMetadata, exchangeRates, ...baseAABalances] = await Promise.all([
        fetchOswapAssets(),
        fetchOswapExchangeRates(),
        fetchBaseAABalances(timestamp, "AXG7G57VBLAHF3WRN5WMQ53KQEQDRONC")
    ])

    return {
        tether: baseAABalances.reduce(summingBaseAABalancesToTvl(assetMetadata, exchangeRates), 0)
    }
}

module.exports = {
    timetravel: false,
    doublecounted: false,
    misrepresentedTokens: true,
    methodology:
        "The TVL is the USD value of the assets locked into the autonomous agents that extend the Prophet protocol.",
    obyte: {
        tvl: totalTvl
    }
}
