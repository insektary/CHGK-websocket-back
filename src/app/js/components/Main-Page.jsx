import React, {Component} from 'react';
import http from 'http';
import WebSocketServer from 'websocket';
import fs from 'fs';
import path from 'path';
import {contentTypeDetector} from '../utils/content-type-detector';
import {Button} from './button/Button';
import {EmptyLine} from './EmptyLine/EmptyLine';

export class MainPage extends Component {
    constructor() {
        super();

        this.server = http.createServer((request, response) => {
            const requestUrl = request.url;
            const extname = path.extname(requestUrl);
            const contentType = contentTypeDetector(extname);
            const filePath = requestUrl === '/' ? 'build/index.html' : `build${requestUrl}`;

            fs.readFile(filePath, (error, content) => {
                if (error) {
                    if (error.code == 'ENOENT') {
                        fs.readFile('./404.html', (error, content) => {
                            response.writeHead(200, {'Content-Type': contentType});
                            response.end(content, 'utf-8');
                        });
                    }
                    else {
                        response.writeHead(500);
                        response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                        response.end(); 
                    }
                }
                else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                }
            });
        });

        this.wsServer = new WebSocketServer.server({
            httpServer: this.server
        });
    }

    componentDidMount() {
        this.server.listen(80);

        this.wsServer.on('request', (request) => {
            const connection = request.accept(null, request.origin);
        
            connection.on('message', (message) => {
                console.log(message);
            });
        
            connection.on('close', (connection) => {
                console.log('close');
            });
        });
    }

    render() {
        return (
            <div>
                <p>react app</p>
                <div>
                    <Button title="Маленькая кнопка" />
                </div>
                <EmptyLine />
                <div>
                    <Button title="Большая кнопка" isBig />
                </div>
                <EmptyLine />
                <div>
                    <Button title="Неактивная кнопка" isBig disabled />
                </div>
            </div>
        )
    }
}
