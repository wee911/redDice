/**
 * Created by Administrator on 2016/8/1.
 */
import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev'
import webpackHotMiddleware from 'webpack-hot-middleware'
import users from './routes/users'
import bodyParser from 'body-parser'
let app = express()
app.use(bodyParser.json())
app.use('/api/users',users)

const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler,{
    hot:true,
    publicPath:webpackConfig.output.publicPath,
    noInfo:true
}))
app.use(webpackHotMiddleware(compiler))

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(3000, ()=>console.log('Running on localhost:3000'))